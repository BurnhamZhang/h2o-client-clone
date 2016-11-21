/**
 * Created by zhangbohan on 16/10/21.
 */
import Tab from './components/Tab';
import App from './components/App';
import Main from './components/Main';
import User from './components/User';
import Cart from './components/Cart';







const routes =  (loginType) => {
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
        // const state = store.getState();
        // console.warn('requireAuth>>>>>>>',state.user.data.account)
        // if (!state.user.data.account) {
        //     replace({
        //         pathname: '/login',
        //         state: {nextPathname: nextState.location.pathname}
        //     })
        // }
    }

    return {
        childRoutes: [
            {
                path: '/',
                component: Tab,
                indexRoute: { onEnter: (nextState, replace) => replace('/main') },
                childRoutes: [
                    {
                        path: 'main',
                        component: Main
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
            },
            {
                path: 'router',
                component: Main
            }
        ]
    }
}
