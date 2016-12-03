
import {ORDER_LIST_CLEAR,ORDER_DELIVERY_FAILURE,ORDER_DELIVERY_REQUEST, ORDER_DELIVERY_SUCCESS} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate:false,
    data:null
}, action) {
    switch (action.type) {
        case ORDER_LIST_CLEAR:
            return {
                isFetching: false,
                didInvalidate: false,
                didUpdate:false,
                data:null
            }
        case ORDER_DELIVERY_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ORDER_DELIVERY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ORDER_DELIVERY_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;

        default:
            return state
    }
}
