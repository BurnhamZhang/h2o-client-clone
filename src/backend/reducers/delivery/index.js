import { combineReducers } from 'redux';
import item from './item';
import list from './list';



const deliveryReducer = combineReducers({
  item,
  list,
});

export default deliveryReducer;
