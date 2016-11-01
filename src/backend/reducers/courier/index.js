import { combineReducers } from 'redux';
import item from './item';
import list from './list';



const courierReducer = combineReducers({
  item,
  list
});

export default courierReducer;
