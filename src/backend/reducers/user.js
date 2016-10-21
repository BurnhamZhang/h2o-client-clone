import {REQUEST_USER, RECEIVE_USER, INVALIDATE_USER} from '../actions/user';

export default function user(state = {
    isFetching: false,
    didInvalidate: true
}, action) {
    switch (action.type) {
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
                payload: action.payload
            })
            break;
        default:
            return state
    }
}
