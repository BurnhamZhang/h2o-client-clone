import { createStore, applyMiddleware,compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistState} from 'redux-devtools';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const configureStore = (preloadedState,DevTools) => {
  const loggerMiddleware = createLogger()
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
    rootReducer,
    preloadedState,
      enhancer
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
