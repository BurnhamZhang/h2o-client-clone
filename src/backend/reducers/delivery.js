import {DELIVERY_LIST_FAILURE,DELIVERY_LIST_REQUEST,DELIVERY_LIST_SUCCESS} from '../actions/delivery';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    pagination:{
    }
}, action) {
    switch (action.type) {
        case DELIVERY_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case DELIVERY_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case DELIVERY_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                ... action.payload
            })
            break;
        default:
            return state
    }
}
