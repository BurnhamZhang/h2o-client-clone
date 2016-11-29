import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import shop from './shop';
import geo from './geo';
import address from './address/index';
import goods from './goods/index';
import cart from './cart';
import cache from './cache';
import order from './order/index';
import delivery from './delivery/index';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  shop,
  geo,
  address,
  goods,
  cart,
  cache,
  order,
  delivery
});

export default rootReducer;
