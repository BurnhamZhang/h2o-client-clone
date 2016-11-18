import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import cancel from './cancel';



const orderReducer = combineReducers({
  item,
  list,
  cancel,
});

export default orderReducer;
