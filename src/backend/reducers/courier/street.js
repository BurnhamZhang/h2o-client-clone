import {STREET_REQUEST, STREET_SUCCESS, STREET_FAILURE} from '../../actions/street';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null
}, action) {
    switch (action.type) {
        case STREET_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case STREET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case STREET_SUCCESS:
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
