import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import DevTools from './DevTools';
import {Router} from 'react-router';

const Root = ({store, history, routes}) => (
    <Provider store={store}>
        <div className="full-height">
            <Router history={history} routes={routes}/>
            <DevTools />
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
}

export default Root
