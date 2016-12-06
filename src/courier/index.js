import 'babel-polyfill';
import 'antd-mobile/dist/antd-mobile.min.css';
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
import * as storage from './common/storage';


const preloadedState = window.__PRELOADED_STATE__ ||{};

preloadedState.user = {
    isFetching: false,
    didInvalidate: false,
    data: storage.get('COURIER_USER')||{},
};
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
