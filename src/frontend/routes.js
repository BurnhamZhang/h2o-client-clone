/**
 * Created by zhangbohan on 16/10/21.
 */
import Tab from './components/Tab';
import Login from './components/Login';
import Geo from './components/Geo';
import Address from './components/Address';
import AddressControl from './components/AddressControl';
import Main from './components/Main';
import User from './components/User';
import Cart from './components/Cart';
import Map from './components/Map';
import Confirm from './components/Confirm';
import ConfirmIndex from './components/ConfirmIndex';
import ConfirmType from './components/ConfirmType';
import ConfirmRemark from './components/ConfirmRemark';
import ConfirmAddress from './components/ConfirmAddress';
import AddressItem from './components/AddressItem';
import Pay from './components/Pay';
import OrderList from './components/OrderList';
import OrderItem from './components/OrderItem';
import Retreat from './components/Retreat';
import RetreatRecord from './components/RetreatRecord';





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


    function requireShop(nextState, replace) {

        const state = store.getState();
        if (!state.shop.id) {
            replace({
                pathname: '/geo',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }

    return {
        childRoutes: [
            {
                path: '/login',
                component: Login
            },
            {
                path: '/geo',
                onEnter: requireAuth,
                component: Geo
            },
            {
                path: '/pay/:id',
                onEnter: requireAuth,
                component: Pay
            },
            {
                path: '/address',
                onEnter: requireAuth,
                component: AddressControl
            },
            {
                path: '/retreat',
                onEnter: requireAuth,
                component: Retreat
            },
            {
                path: '/retreat/record',
                onEnter: requireAuth,
                component: RetreatRecord
            },
            {
                path: '/order',
                onEnter: requireAuth,
                component: OrderList
            },
            {
                path: '/order/:id',
                onEnter: requireAuth,
                component: OrderItem
            },
            {
                path: '/confirm',
                component: Confirm,
                onEnter: requireAuth,
                indexRoute:{
                    component:ConfirmIndex
                },
                childRoutes: [
                    {
                        path: 'type',
                        component: ConfirmType,
                    },
                    {
                        path: 'remark',
                        component: ConfirmRemark,
                    },
                    {
                        path: 'address',
                        component: ConfirmAddress,
                    },
                ]
            },
            {
                path: '/address/:id',
                component: Address ,
                onEnter: requireAuth,
                indexRoute:{
                    component:AddressItem
                },
                childRoutes: [
                    {
                        path: 'map',
                        component: Map,
                    },
                ]
            },
            {
                path: '/',
                component: Tab,
                indexRoute: { onEnter: (nextState, replace) => replace('/main') },
                onEnter: requireAuth,
                childRoutes: [
                    {
                        path: 'main',
                        component: Main,
                    },
                    {
                        path: 'cart',
                        component: Cart
                    },
                    {
                        path: 'user',
                        component: User
                    },
                    {
                        path: '*',
                        component: Main
                    }
                ]
            }
        ]
    }
}
