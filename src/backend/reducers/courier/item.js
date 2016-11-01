import {COURIER_REQUEST, COURIER_SUCCESS, COURIER_FAILURE} from '../../actions/courier';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    payload:null,
}, action) {
    switch (action.type) {
        case COURIER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case COURIER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case COURIER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                payload:action.payload
            })
            break;
        default:
            return state
    }
}
