import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import chosen from './chosen';
import delivery from './delivery';



const addressReducer = combineReducers({
  item,
  list,
  chosen,
  delivery
});

export default addressReducer;
