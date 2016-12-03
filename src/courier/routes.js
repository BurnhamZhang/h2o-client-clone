/**
 * Created by zhangbohan on 16/10/21.
 */
import Tab from './components/Tab';
import Login from './components/Login';
import Pending from './components/Pending';
import Done from './components/Done';
import Processing from './components/Processing';






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
                component: Login
            },
            {
                path: '/',
                component: Tab,
                indexRoute: { onEnter: (nextState, replace) => replace('/pending') },
                onEnter: requireAuth,
                childRoutes: [
                    {
                        path: 'pending',
                        component: Pending,
                    },
                    {
                        path: 'processing',
                        component: Processing
                    },
                    {
                        path: 'done',
                        component: Done
                    }
                ]
            }
        ]
    }
}
