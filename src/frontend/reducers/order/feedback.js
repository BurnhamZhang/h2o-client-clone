import {ORDER_FEEDBACK_FAILURE, ORDER_FEEDBACK_REQUEST, ORDER_FEEDBACK_SUCCESS,ORDER_COMPLETE_FAILURE,ORDER_COMPLETE_REQUEST,ORDER_COMPLETE_SUCCESS} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate:false,
}, action) {
    switch (action.type) {
        case ORDER_FEEDBACK_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ORDER_FEEDBACK_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ORDER_FEEDBACK_SUCCESS:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;
        case ORDER_COMPLETE_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ORDER_COMPLETE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ORDER_COMPLETE_SUCCESS:
            delete action.payload.data;
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
