import {ORDER_LIST_CLEAR,ORDER_ASSIGN_FAILURE, ORDER_ASSIGN_REQUEST, ORDER_ASSIGN_SUCCESS} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate:false,
    pagination:{
    }
}, action) {
    switch (action.type) {
        case ORDER_LIST_CLEAR:
            return {
                isFetching: false,
                didInvalidate: false,
                didUpdate: false,
                pagination: {}
            }
        case ORDER_ASSIGN_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ORDER_ASSIGN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ORDER_ASSIGN_SUCCESS:
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
