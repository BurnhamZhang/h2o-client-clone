import {SHOP_REQUEST, SHOP_SUCCESS, SHOP_FAILURE} from '../actions/shop';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {
        case SHOP_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case SHOP_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case SHOP_SUCCESS:
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
