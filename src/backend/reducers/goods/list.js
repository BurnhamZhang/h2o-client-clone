import {GOODS_LIST_REQUEST, GOODS_LIST_SUCCESS, GOODS_LIST_FAILURE} from '../../actions/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    pagination:{
    }
}, action) {
    switch (action.type) {
        case GOODS_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case GOODS_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case GOODS_LIST_SUCCESS:
            console.warn(action)
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
