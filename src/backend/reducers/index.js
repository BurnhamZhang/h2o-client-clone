import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './example';
import user from './user';
import order from './order';
import goods from './goods';
import goodslist from './goodsList';



const rootReducer = combineReducers({
  routing: routerReducer,
  example,
  user,
  goods,
  goodslist,
  order
});

export default rootReducer;
