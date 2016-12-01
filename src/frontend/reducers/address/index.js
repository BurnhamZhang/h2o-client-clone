import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import chosen from './chosen';
import delivery from './delivery';
import bucket from './bucket';



const addressReducer = combineReducers({
  item,
  list,
  chosen,
  delivery,
  bucket
});

export default addressReducer;
