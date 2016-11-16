import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    pagination:{
    }
}, action) {
    switch (action.type) {
        case ORDER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case ORDER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case ORDER_SUCCESS:
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
