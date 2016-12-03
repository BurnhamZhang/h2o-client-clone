import {
    ENTERPRISE_GOODS_CLEAR,
    ENTERPRISE_GOODS_REQUEST,
    ENTERPRISE_GOODS_SUCCESS,
    ENTERPRISE_GOODS_FAILURE
} from '../../../actions/enterprise/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    data: null,
}, action) {
    switch (action.type) {

        case ENTERPRISE_GOODS_CLEAR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: false,
                data: null,
            })
            break;
        case ENTERPRISE_GOODS_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false,
                ...action.payload
            })
            break;
        case ENTERPRISE_GOODS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false,
            })
            break;
        case ENTERPRISE_GOODS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: false,
                ...action.payload
            })
            break;

        default:
            return state
    }
}
