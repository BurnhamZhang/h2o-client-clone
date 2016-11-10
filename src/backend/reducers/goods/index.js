import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import available from './available';



const orderReducer = combineReducers({
  item,
  list,
  available,
});

export default orderReducer;
