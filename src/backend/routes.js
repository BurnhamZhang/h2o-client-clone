/**
 * Created by zhangbohan on 16/10/21.
 */
import App from './component/App';
import Manage from './component/Manage';
import Order from './component/Order';
import Deliver from './component/Deliver';
import Achievement from './component/Achievement';
import Goods from './component/Goods';
import Store from './component/Store';
import Records from './component/Records';
import Login from './component/Login';





export default (store) =>{
    function requireAuth(nextState, replace) {
        console.log('requireAuth')
        const state  = store.getState();
        if (!state.user.payload || !state.user.payload.name) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
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
                onEnter:requireAuth,
                indexRoute: {onEnter: (nextState, replace) => replace('/manage')},
                childRoutes: [
                    {
                        path: 'manage',
                        component: Manage
                    },
                    {
                        path: 'order',
                        component: Order
                    },
                    {
                        path: 'deliver',
                        component: Deliver
                    },
                    {
                        path: 'achievement',
                        component: Achievement
                    },
                    {
                        path: 'goods',
                        component: Goods
                    },
                    {
                        path: 'store',
                        component: Store
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
            }
        ]
    };
}
