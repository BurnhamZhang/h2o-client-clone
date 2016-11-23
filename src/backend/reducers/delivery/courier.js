import {DELIVERY_UPDATE_COURIER_FAILURE,DELIVERY_UPDATE_COURIER_REQUEST,DELIVERY_UPDATE_COURIER_SUCCESS} from '../../actions/delivery';

export default function (state = {
  isFetching: false,
  didInvalidate: true,
}, action) {
  switch (action.type) {
    case DELIVERY_UPDATE_COURIER_FAILURE:
      delete action.payload.data;
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        didUpdate:false,
        ...action.payload
      })
      break;
    case DELIVERY_UPDATE_COURIER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        didUpdate:false,
      })
      break;
    case DELIVERY_UPDATE_COURIER_SUCCESS:
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
