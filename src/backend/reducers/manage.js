import {MANAGE_ORDER_REQUEST,MANAGE_ORDER_FAILURE,MANAGE_ORDER_SUCCESS } from '../actions/manage';

export default function (state = {
  isFetching: false,
  didInvalidate: false,
  didUpdate: false,
  data:null
}, action) {
  switch (action.type) {
    case MANAGE_ORDER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        didUpdate:false,
        ...action.payload
      })
      break;
    case MANAGE_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        didUpdate:false,
      })
      break;
    case MANAGE_ORDER_SUCCESS:
      delete action.payload.data;
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        didUpdate:true,
        ... action.payload
      })
      break;
    default:
      return state
  }
}
