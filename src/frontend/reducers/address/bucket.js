/**
 * Created by zhangbohan on 16/11/24.
 */
import { ADDRESS_BUCKET_FAILURE,ADDRESS_BUCKET_REQUEST,ADDRESS_BUCKET_SUCCESS } from '../../actions/address';

export default function (state = {
}, action) {
    switch (action.type) {

        case ADDRESS_BUCKET_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ADDRESS_BUCKET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ADDRESS_BUCKET_SUCCESS:
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
