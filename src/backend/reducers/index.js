import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './example';
import user from './user';
import goods from './goods/index';
import courier from './courier';
import order from './order/index';
import enterprise from './enterprise/index';
import shop from './shop';
import region from './region';



const rootReducer = combineReducers({
  routing: routerReducer,
  example,
  user,
  goods,
  order,
  shop,
  enterprise,
  courier,
  region
});

export default rootReducer;
