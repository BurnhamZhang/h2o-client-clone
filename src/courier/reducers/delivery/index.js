import { combineReducers } from 'redux';
import list from './list';
import item from './item';



const addressReducer = combineReducers({
  list,
  item,
});

export default addressReducer;
