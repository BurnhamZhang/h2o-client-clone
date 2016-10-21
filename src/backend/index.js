import './common/lib';
import 'babel-polyfill';

// redux-devtools
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// react
import React from 'react';
import {render} from 'react-dom';
// router
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store/configureStore';
import getRoutes from './routes';
const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
    </DockMonitor>
);
// top entry



const preloadedState = window.__PRELOADED_STATE__;


const store = configureStore(preloadedState,DevTools);


const history = syncHistoryWithStore(hashHistory, store)

const routes = getRoutes(store);

render(
    <Provider store={store}>
        <div className="full-height">
            <Router history={history} routes={routes}/>
            <DevTools />
        </div>
    </Provider>
    , document.getElementById('react-content')
);
