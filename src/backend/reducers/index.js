import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './example';
import user from './user';
const rootReducer = combineReducers({
  routing: routerReducer,
  example,
  user
});

export default rootReducer;
