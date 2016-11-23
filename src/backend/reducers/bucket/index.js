import { combineReducers } from 'redux';
import item from './item';
import list from './list';
import statistical from './statistical';



const deliveryReducer = combineReducers({
  item,
  statistical,
  list,
});

export default deliveryReducer;
