import {
    COURIER_CLEAR,
    COURIER_REQUEST,
    COURIER_SUCCESS,
    COURIER_FAILURE
} from '../../actions/courier';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate: false,
    data: null,
    status: 0,
}, action) {
    switch (action.type) {
        case COURIER_CLEAR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: false,
            })
            break;
        case COURIER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false,
                ...action.payload
            })
            break;
        case COURIER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false,
            })
            break;
        case COURIER_SUCCESS:
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
