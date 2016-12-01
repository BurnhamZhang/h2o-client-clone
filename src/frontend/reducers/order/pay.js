import {ORDER_PAY_FAILURE, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate:false,
}, action) {
    switch (action.type) {
        case ORDER_PAY_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ORDER_PAY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ORDER_PAY_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;
        default:
            return state
    }
}
