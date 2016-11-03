import { combineReducers } from 'redux';
import goods from './goods/index';
import shop from './shop/index';



const enterpriseReducer = combineReducers({
  goods,
  shop
});

export default enterpriseReducer;
