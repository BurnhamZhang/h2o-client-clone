import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import street from './street';



const courierReducer = combineReducers({
  item,
  list,
  street
});

export default courierReducer;