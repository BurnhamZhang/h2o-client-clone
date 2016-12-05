import {REQUEST_USER, RECEIVE_USER, INVALIDATE_USER,AUTH_TIMEOUT,AUTH_LOGOUT} from '../actions/user';
export default function user(state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate:false,
    data:{
    }
}, action) {
    switch (action.type) {
        case AUTH_TIMEOUT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                payload:{}
            })
        case INVALIDATE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case REQUEST_USER:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
                remoteMsg:null
            })
            break;
        case RECEIVE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;
        case AUTH_LOGOUT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                remoteMsg:null,
                data:{}
            })
        default:
            return state
    }
}
