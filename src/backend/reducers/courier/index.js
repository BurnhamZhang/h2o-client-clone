import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import region from './region';



const courierReducer = combineReducers({
  item,
  list,
  region
});

export default courierReducer;
