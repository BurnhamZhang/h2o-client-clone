import { combineReducers } from 'redux';
import create from './create';
import list from './list';
import item from './item';
import feedback from './feedback';
import pay from './pay';
import bucket from './bucket';



const orderReducer = combineReducers({
  create,
  bucket,
  item,
  feedback,
  list,
  pay
});

export default orderReducer;
