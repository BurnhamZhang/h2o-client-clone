import { combineReducers } from 'redux';
import item from './item';
import list from './list';



const shopReducer = combineReducers({
  item,
  list,
});

export default shopReducer;
