import {ENTERPRISE_GOODS_REQUEST, ENTERPRISE_GOODS_SUCCESS, ENTERPRISE_GOODS_FAILURE} from '../../../actions/enterprise/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {
        case ENTERPRISE_GOODS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case ENTERPRISE_GOODS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case ENTERPRISE_GOODS_SUCCESS:
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
