import {ENTERPRISE_SHOP_CLEAR,ENTERPRISE_SHOP_REQUEST, ENTERPRISE_SHOP_SUCCESS, ENTERPRISE_SHOP_FAILURE} from '../../../actions/enterprise/shop';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    data:null,
}, action) {
    switch (action.type) {
        case ENTERPRISE_SHOP_CLEAR:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:false,
                data:null,
            })
            break;
        case ENTERPRISE_SHOP_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ENTERPRISE_SHOP_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_SHOP_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:false,
                ...action.payload
            })
            break;




        default:
            return state
    }
}
