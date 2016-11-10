import {AVAILABLE_GOODS_DELETE_FAILURE,AVAILABLE_GOODS_DELETE_SUCCESS,AVAILABLE_GOODS_LIST_REQUEST} from '../../actions/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
}, action) {
    switch (action.type) {
        case AVAILABLE_GOODS_DELETE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case AVAILABLE_GOODS_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case AVAILABLE_GOODS_DELETE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                ... action.payload
            })
            break;
        default:
            return state
    }
}
