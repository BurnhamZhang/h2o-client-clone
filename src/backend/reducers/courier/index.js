import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import change from './change';
import region from './region';
import candidate from './candidate';



const courierReducer = combineReducers({
  item,
  list,
  change,
  region,
  candidate
});

export default courierReducer;
