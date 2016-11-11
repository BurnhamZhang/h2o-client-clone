import {SHOP_REGION_FAILURE, SHOP_REGION_REQUEST, SHOP_REGION_SUCCESS} from '../../actions/region';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null
}, action) {
    switch (action.type) {
        case SHOP_REGION_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case SHOP_REGION_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case SHOP_REGION_SUCCESS:
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
