import 'babel-polyfill';
import './assets/base.scss';
// react
import React from 'react';
import {render} from 'react-dom';
// router
import { hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import Root from './container/Root';
// top entry


const preloadedState = window.__PRELOADED_STATE__ ||{};


const store = configureStore(preloadedState);


const history = syncHistoryWithStore(hashHistory, store)

const routes = getRoutes(store);

render(
    <Root store={store} history={history} routes={routes}/>
    , document.getElementById('react-content')
);


export function getStore() {
    return store
}
