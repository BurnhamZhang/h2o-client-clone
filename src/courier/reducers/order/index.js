import { combineReducers } from 'redux';
import list from './list';
import delivery from './delivery';




const orderReducer = combineReducers({
  list,
  delivery,
});

export default orderReducer;
