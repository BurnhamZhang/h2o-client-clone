import {
    DELIVERY_LIST_CLEAR,
    DELIVERY_LIST_FAILURE,
    DELIVERY_LIST_REQUEST,
    DELIVERY_LIST_SUCCESS
} from '../../actions/delivery';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    didUpdate: false,
    data: null,
    pagination: {}
}, action) {
    switch (action.type) {
        case DELIVERY_LIST_CLEAR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: false,
                data: null,
                pagination: {}
            })
            break;
        case DELIVERY_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false,
                ...action.payload
            })
            break;
        case DELIVERY_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false,
                data: null,
            })
            break;
        case DELIVERY_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: true,
                ...action.payload
            })
            break;
        default:
            return state
    }
}
