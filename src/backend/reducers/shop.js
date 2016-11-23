import {SHOP_REQUEST, SHOP_SUCCESS, SHOP_FAILURE,SHOP_UPDATE_FAILURE,SHOP_UPDATE_REQUEST,SHOP_UPDATE_SUCCESS} from '../actions/shop';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {
        case SHOP_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case SHOP_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
                data:null,
            })
            break;
        case SHOP_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:false,
                ...action.payload
            })
            break;

        case SHOP_UPDATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                remoteMsg:action.payload.remoteMsg,
            })
            break;
        case SHOP_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
                remoteMsg:null
            })
            break;
        case SHOP_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                remoteMsg:null
            })
            break;

        default:
            return state
    }
}
