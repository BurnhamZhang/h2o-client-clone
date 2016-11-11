import {COURIER_REQUEST, COURIER_SUCCESS, COURIER_FAILURE,COURIER_UPDATE_REQUEST ,COURIER_UPDATE_SUCCESS,COURIER_UPDATE_FAILURE,COURIER_CREATE_SUCCESS,COURIER_CREATE_REQUEST,COURIER_CREATE_FAILURE,COURIER_DELETE_FAILURE,COURIER_DELETE_REQUEST,COURIER_DELETE_SUCCESS} from '../../actions/courier';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {
        case COURIER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case COURIER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case COURIER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                ...action.payload
            })
            break;

        case COURIER_UPDATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                remoteMsg:action.payload.remoteMsg
            })
            break;
        case COURIER_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case COURIER_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
                data:null,
            })
            break;


        case COURIER_CREATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                remoteMsg:action.payload.remoteMsg
            })
            break;
        case COURIER_CREATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case COURIER_CREATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
                data:null,
            })
            break;



        case COURIER_DELETE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                remoteMsg:action.payload.remoteMsg
            })
            break;
        case COURIER_DELETE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case COURIER_DELETE_SUCCESS:
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
