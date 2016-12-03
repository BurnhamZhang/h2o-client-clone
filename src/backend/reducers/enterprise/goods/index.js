import { combineReducers } from 'redux';
import item from './item';
import change from './change';
import list from './list';



const orderReducer = combineReducers({
  item,
  list,
  change,
});

export default orderReducer;
