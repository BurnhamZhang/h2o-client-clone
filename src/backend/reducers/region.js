import {REGION_REQUEST, REGION_SUCCESS, REGION_FAILURE} from '../actions/region';

export default function (state = {

}, action) {
    switch (action.type) {
        case REGION_FAILURE:
            return Object.assign({}, state, {
            })
            break;
        case REGION_REQUEST:
            return Object.assign({}, state, {
            })
            break;
        case REGION_SUCCESS:
            return Object.assign({}, state, {
                [action.id]:action.payload
            })
            break;
        default:
            return state
    }
}
