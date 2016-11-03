import { combineReducers } from 'redux';
import item from './item';
import list from './list';



const orderReducer = combineReducers({
  item,
  list,
});

export default orderReducer;
