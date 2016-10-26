import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './example';
import user from './user';
import order from './order';
const rootReducer = combineReducers({
  routing: routerReducer,
  example,
  user,
  order
});

export default rootReducer;
