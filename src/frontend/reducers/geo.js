import { GEO_FETCH_FAILURE,GEO_FETCH_REQUEST,GEO_FETCH_SUCCESS } from '../actions/geo';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
}, action) {
    switch (action.type) {
        case GEO_FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetching:true,
                didInvalidate: false,
            })
            break;
        case GEO_FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: false,
                ...action.payload
            })
            break;
        case GEO_FETCH_FAILURE:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: true,
            })
            break;
        default:
            return state
    }
}
