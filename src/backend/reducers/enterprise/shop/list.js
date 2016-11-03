import {ENTERPRISE_SHOP_LIST_REQUEST, ENTERPRISE_SHOP_LIST_SUCCESS, ENTERPRISE_SHOP_LIST_FAILURE} from '../../../actions/enterprise/shop';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    pagination:{
    }
}, action) {
    switch (action.type) {
        case ENTERPRISE_SHOP_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case ENTERPRISE_SHOP_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case ENTERPRISE_SHOP_LIST_SUCCESS:
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
