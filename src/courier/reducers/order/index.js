import { combineReducers } from 'redux';
import list from './list';




const orderReducer = combineReducers({
  list,
});

export default orderReducer;
