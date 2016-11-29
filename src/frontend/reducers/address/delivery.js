/**
 * Created by zhangbohan on 16/11/24.
 */
import { ADDRESS_DELIVERY_FAILURE,ADDRESS_DELIVERY_REQUEST,ADDRESS_DELIVERY_SUCCESS } from '../../actions/address';

export default function (state = {
}, action) {
    switch (action.type) {

        case ADDRESS_DELIVERY_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ADDRESS_DELIVERY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ADDRESS_DELIVERY_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
            })
            break;

        default:
            return state
    }
}
