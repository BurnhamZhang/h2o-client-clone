import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (preloadedState) => {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
        )
    );

    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    )

    return store
}

export default configureStore
