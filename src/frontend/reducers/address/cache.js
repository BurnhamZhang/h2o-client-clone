/**
 * Created by zhangbohan on 16/11/24.
 */
import { ADDRESS_SET_CACHE,ADDRESS_UNSET_CACHE } from '../../actions/address';

export default function (state = {
}, action) {
    switch (action.type) {
        case ADDRESS_SET_CACHE:
            return Object.assign({}, state, {
                ...action.payload,
            })
            break;
        case ADDRESS_UNSET_CACHE:
            return null;
            break;
        default:
            return state
    }
}
