/**
 * Created by zhangbohan on 16/11/17.
 */
import {CANDIDATE_COURIER_LIST_REQUEST, CANDIDATE_COURIER_LIST_SUCCESS, CANDIDATE_COURIER_LIST_FAILURE} from '../../actions/courier';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    pagination:{
    },
    data:null
}, action) {
    switch (action.type) {
        case CANDIDATE_COURIER_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case CANDIDATE_COURIER_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case CANDIDATE_COURIER_LIST_SUCCESS:
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
