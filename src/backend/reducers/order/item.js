import {ORDERS_REQUEST, ORDERS_SUCCESS, ORDERS_FAILURE} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    pagination:{
    }
}, action) {
    switch (action.type) {
        case ORDERS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case ORDERS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case ORDERS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                ...action.payload
            })
            break;
        default:
            return state
    }
}
