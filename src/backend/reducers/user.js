import {REQUEST_USER, RECEIVE_USER, INVALIDATE_USER,AUTH_TIMEOUT} from '../actions/user';

export default function user(state = {
    isFetching: false,
    didInvalidate: true,
    data:{
    }
}, action) {
    switch (action.type) {
        case AUTH_TIMEOUT:
            return Object.assign({}, state, {
                payload:{}
            })
        case INVALIDATE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case REQUEST_USER:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case RECEIVE_USER:
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
