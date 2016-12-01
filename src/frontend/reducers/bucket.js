import {BUCK_RECORD_FAILURE,BUCK_RECORD_REQUEST,BUCK_RECORD_SUCCESS} from '../actions/bucket';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate:false,
}, action) {
    switch (action.type) {
        case BUCK_RECORD_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case BUCK_RECORD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case BUCK_RECORD_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;
        default:
            return state
    }
}
