import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import manage from './manage';
import user from './user';
import goods from './goods/index';
import courier from './courier';
import order from './order/index';
import enterprise from './enterprise/index';
import shop from './shop';
import region from './region';
import delivery from './delivery/index';
import bucket from './bucket/index';



const rootReducer = combineReducers({
  routing: routerReducer,
  manage,
  delivery,
  user,
  goods,
  order,
  shop,
  enterprise,
  courier,
  region,
  bucket
});

export default rootReducer;
