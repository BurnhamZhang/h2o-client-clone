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
import Enterprise from './component/enterprise'


const enterprize = [
    {
        path: 'shop',
        component: Enterprise.ShopList
    },
    {
        path: 'shop/:id',
        component: Enterprise.ShopItem
    },
    {
        path: 'achievement',
        component: Enterprise.Achievement
    },
    {
        path: 'goods',
        component: Enterprise.GoodsList
    },
    {
        path: 'goods/:id',
        component: Enterprise.GoodsItem
    },
    {
        path: '*',
        onEnter: (nextState, replace) => replace('/shop')
    }
]

const shop = [
    {
        path: 'manage',
        component: Manage
    },
    {
        path: 'order',
        component: OrderList
    },
    {
        path: 'order/:id',
        component: OrderItem
    },
    {
        path: 'courier',
        component: CourierList
    },
    {
        path: 'courier/:id',
        component: CourierItem
    },

    {
        path: 'goods',
        component: GoodsList
    },
    {
        path: 'goods/:id',
        component: GoodsItem
    },
    {
        path: 'shop',
        component: Shop
    },
    {
        path: 'records',
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

const routes =  (loginType) => {
    if (loginType == 1) {
        return enterprize
    }
    if (loginType == 2) {
        return shop
    }
    return defaults
}

export default (store) => {
    function requireAuth(nextState, replace) {
        const state = store.getState();
        if (!state.user.payload.account) {
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
                onEnter: requireAuth,
                indexRoute: {onEnter: (nextState, replace) => replace('/manage')},
                getChildRoutes: (partialNextState, callback)=> {
                    const state = store.getState();
                    const loginType = state.user.payload.loginType;
                    callback(null,routes(loginType))
                },
            }
        ]
    };
}
