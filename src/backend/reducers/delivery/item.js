import { DELIVERY_UPDATE_REQUEST ,DELIVERY_UPDATE_SUCCESS,DELIVERY_UPDATE_FAILURE,DELIVERY_CREATE_SUCCESS,DELIVERY_CREATE_REQUEST,DELIVERY_CREATE_FAILURE} from '../../actions/delivery';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {


        case DELIVERY_UPDATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                remoteMsg:action.payload.remoteMsg
            })
            break;
        case DELIVERY_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case DELIVERY_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
                data:null,
            })
            break;


        case DELIVERY_CREATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                remoteMsg:action.payload.remoteMsg
            })
            break;
        case DELIVERY_CREATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case DELIVERY_CREATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
                data:null,
            })
            break;


        default:
            return state
    }
}
