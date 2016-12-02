import {ORDER_BUCKET_FAILURE, ORDER_BUCKET_REQUEST, ORDER_BUCKET_SUCCESS} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate: false,
}, action) {
    switch (action.type) {
        case ORDER_BUCKET_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false,
                ...action.payload
            })
            break;
        case ORDER_BUCKET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false,
                data:null,
            })
            break;
        case ORDER_BUCKET_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: true,
                ...action.payload
            })
            break;
        default:
            return state
    }
}
