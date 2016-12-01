import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE,ORDER_CANCEL_FAILURE,ORDER_CANCEL_REQUEST,ORDER_CANCEL_SUCCESS} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate:false,
    didFetch:false,
}, action) {
    switch (action.type) {
        case ORDER_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                didFetch:false,
                ...action.payload
            })
            break;
        case ORDER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
                didFetch:false,
            })
            break;
        case ORDER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:false,
                didFetch:true,
                ...action.payload
            })
            break;
        case ORDER_CANCEL_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                didFetch:false,
                ...action.payload
            })
            break;
        case ORDER_CANCEL_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
                didFetch:false,
            })
            break;
        case ORDER_CANCEL_SUCCESS:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                didFetch:false,
                ...action.payload
            })
            break;
        default:
            return state
    }
}
