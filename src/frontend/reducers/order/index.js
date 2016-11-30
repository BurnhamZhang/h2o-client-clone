import { combineReducers } from 'redux';
import create from './create';
import list from './list';
import item from './item';
import feedback from './feedback';



const orderReducer = combineReducers({
  create,
  item,
  feedback,
  list,
});

export default orderReducer;
