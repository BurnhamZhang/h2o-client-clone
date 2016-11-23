import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import shop from './shop';
import geo from './geo';
import address from './address/index';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  shop,
  geo,
  address
});

export default rootReducer;
