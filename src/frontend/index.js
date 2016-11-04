import 'babel-polyfill';
import './assets/base.scss';
// redux-devtools
import {createDevTools, persistState} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// react
import React from 'react';
import {render} from 'react-dom';
// router
import {Router, Route, hashHistory, browserHistory, IndexRoute, IndexRedirect} from 'react-router';
// redux
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
const loggerMiddleware = createLogger()

import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
// reducers
import reducer from './reducers';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
    </DockMonitor>
);
// top entry
import Tab from './components/Tab';
import App from './components/App';
import Main from './components/Main';
import User from './components/User';
import Cart from './components/Cart';

// Sync dispatched route actions to the history


const enhancer = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&]+)\b/
        )
    )
);

const store = createStore(
    reducer,
    enhancer
)


const history = syncHistoryWithStore(hashHistory, store)


const routes = {
    path: '/',
    component: App,
    indexRoute: { onEnter: (nextState, replace) => replace('/tab/main') },
    childRoutes: [
        {
            path: 'tab',
            component: Tab,
            indexRoute: { onEnter: (nextState, replace) => replace('/tab/main') },
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
};

render(
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes} />
            <DevTools />
        </div>
    </Provider>
    , document.getElementById('react-content')
);
