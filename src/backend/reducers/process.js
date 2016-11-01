import {PROCESS_REQUEST, PROCESS_SUCCESS, PROCESS_FAILURE} from '../actions/process';

export default function (state = {
    request: null,
    success: null,
    failure:null,
}, action) {
    switch (action.type) {
        case PROCESS_FAILURE:
            return Object.assign({}, state, {
                failure:action.payload
            })
            break;
        case PROCESS_REQUEST:
            return Object.assign({}, state, {
                request:action.payload
            })
            break;
        case PROCESS_SUCCESS:
            return Object.assign({}, state, {
                success:action.payload
            })
            break;
        default:
            return state
    }
}
