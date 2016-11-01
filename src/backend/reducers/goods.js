import {GOODS_REQUEST, GOODS_SUCCESS, GOODS_FAILURE} from '../actions/goods';

export default function goods(state = {
    isFetching: false,
    didInvalidate: true,
    payload:null,
}, action) {
    switch (action.type) {
        case GOODS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case GOODS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case GOODS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                payload:action.payload.data
            })
            break;
        default:
            return state
    }
}
