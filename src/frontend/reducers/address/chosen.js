import { ADDRESS_CHOOSE } from '../../actions/address';

export default function (state = {
}, action) {
    switch (action.type) {
        case ADDRESS_CHOOSE:
            return Object.assign({}, state, {
                ...action.payload
            })
            break;
        default:
            return state
    }
}
