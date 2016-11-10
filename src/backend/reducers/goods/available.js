import {AVAILABLE_GOODS_LIST_FAILURE,AVAILABLE_GOODS_LIST_SUCCESS,AVAILABLE_GOODS_LIST_REQUEST} from '../../actions/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {
        case AVAILABLE_GOODS_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case AVAILABLE_GOODS_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                data:null,
            })
            break;
        case AVAILABLE_GOODS_LIST_SUCCESS:
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
