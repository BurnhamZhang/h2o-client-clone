import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import courier from './courier';



const deliveryReducer = combineReducers({
  item,
  list,
  courier
});

export default deliveryReducer;
