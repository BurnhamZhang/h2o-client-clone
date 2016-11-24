import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import chosen from './chosen';
import cache from './cache';



const addressReducer = combineReducers({
  item,
  list,
  chosen,
  cache
});

export default addressReducer;
