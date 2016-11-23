import { SHOP_CHOOSE } from '../actions/shop';

export default function (state = {
}, action) {
    switch (action.type) {
        case SHOP_CHOOSE:
            return Object.assign({}, state, {
                ...action.payload
            })
            break;
        default:
            return state
    }
}
