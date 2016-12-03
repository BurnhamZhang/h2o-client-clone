/**
 * Created by zhangbohan on 16/10/21.
 */
import App from './component/App';
import Manage from './component/Manage';
import OrderList from './component/OrderList';
import OrderItem from './component/OrderItem';
import CourierList from './component/CourierList';
import CourierItem from './component/CourierItem';
import GoodsItem from './component/GoodsItem';
import GoodsList from './component/GoodsList';
import Shop from './component/Shop';
import Records from './component/Records';
import Login from './component/Login';
import Bucket from './component/Bucket';
import BucketRecord from './component/BucketRecord';
import Enterprise from './component/enterprise'


const enterprise = [
    {
        path: 'shop',
        title: '门店账号管理',
        indexRoute: {
            component:  Enterprise.ShopList
        },
        childRoutes: [{
            path: 'create',
            title: '创建门店账号',
            component: Enterprise.ShopItem,
        },{
            path: ':id',
            title: '编辑门店账号',
            component: Enterprise.ShopItem,
        }]
    },
    {
        path: 'achievement',
        title: '业绩管理',
        component: Enterprise.Achievement
    },
    {
        path: 'goods',
        title: '商品管理',
        indexRoute: {
            component:  Enterprise.GoodsList
        },
        childRoutes: [{
            path: 'create',
            title: '创建商品',
            component: Enterprise.GoodsItem,
        },{
            path: ':id',
            title: '商品详情',
            component: Enterprise.GoodsItem,
        }]
    },
    {
        path: '*',
        onEnter: (nextState, replace) => replace('/shop')
    }
]

const shop = [
    {
        path: 'manage',
        title: '调度管理',
        component: Manage
    },
    {
        path: 'order',
        title: '订单管理',
        indexRoute: {
            component: OrderList,
        },
        childRoutes: [{
            path: ':id',
            title: '订单详情',
            component: OrderItem
        }]
    },
    {
        path: 'bucket',
        title: '空桶管理',
        indexRoute: {
            component: Bucket
        },
        childRoutes: [{
            path: 'record',
            title: '空桶记录',
            component: BucketRecord,
        }]
    },
    {
        path: 'courier',
        title: '配送员管理',
        indexRoute: {
            component: CourierList
        },
        childRoutes: [{
            path: 'create',
            title: '创建配送员',
            component: CourierItem,
        },{
            path: ':id',
            title: '配送员详情',
            component: CourierItem,
        }]
    },
    {
        path: 'goods',
        title: '商品管理',
        indexRoute: {
            component: GoodsList
        },
        childRoutes: [{
            path: 'create',
            title: '创建商品',
            component: GoodsItem,
        },{
            path: ':id',
            title: '商品详情',
            component: GoodsItem,
        }]
    },
    {
        path: 'shop',
        title: '门店管理',
        component: Shop
    },
    {
        path: 'records',
        title: '配送记录',
        component: Records
    },
    {
        path: '*',
        onEnter: (nextState, replace) => replace('/manage')
    }
]

const defaults = [
    {
        path: '*',
        onEnter: (nextState, replace) => replace('/login')
    }
]

const routes = (loginType) => {
    if (loginType == 1) {
        return enterprise
    }
    if (loginType == 2) {
        return shop
    }
    return defaults
}

export default (store) => {
    function requireAuth(nextState, replace) {
        const state = store.getState();
        console.warn('requireAuth>>>>>>>', state.user.data.account)
        if (!state.user.data.account) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }

    return {
        childRoutes: [
            {
                path: '/login',
                component: Login,
            },
            {
                path: '/',
                component: App,
                title: '首页',
                onEnter: requireAuth,
                indexRoute: {
                    onEnter: (nextState, replace) => {
                        const state = store.getState();
                        const loginType = state.user.data.loginType;
                        replace(loginType == 1 ? '/shop' : '/manage')
                    }
                },
                getChildRoutes: (partialNextState, callback)=> {
                    const state = store.getState();
                    const loginType = state.user.data.loginType;
                    console.warn('getChildRoutes>>>>>>>', loginType, routes(loginType))
                    callback(null, routes(loginType))
                },
            }
        ]
    };
}
