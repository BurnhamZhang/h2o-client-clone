import { combineReducers } from 'redux';
import create from './create';
import list from './list';



const orderReducer = combineReducers({
  create,
  list,
});

export default orderReducer;
