import { combineReducers } from 'redux';
import create from './create';
import list from './list';
import item from './item';
import feedback from './feedback';
import pay from './pay';



const orderReducer = combineReducers({
  create,
  item,
  feedback,
  list,
  pay
});

export default orderReducer;
