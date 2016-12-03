import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import order from './order/index';
import delivery from './delivery/index';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  order,
  delivery,
});

export default rootReducer;
