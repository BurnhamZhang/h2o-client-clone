import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import change from './change';



const shopReducer = combineReducers({
  item,
  list,
  change,
});

export default shopReducer;
