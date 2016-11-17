import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import region from './region';
import candidate from './candidate';



const courierReducer = combineReducers({
  item,
  list,
  region,
  candidate
});

export default courierReducer;
