import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import chosen from './chosen';



const addressReducer = combineReducers({
  item,
  list,
  chosen
});

export default addressReducer;
