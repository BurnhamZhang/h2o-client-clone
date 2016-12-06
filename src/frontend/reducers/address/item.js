import {ADDRESS_REQUEST, ADDRESS_SUCCESS, ADDRESS_FAILURE,ADDRESS_UPDATE_REQUEST ,ADDRESS_UPDATE_SUCCESS,ADDRESS_UPDATE_FAILURE,ADDRESS_CREATE_SUCCESS,ADDRESS_CREATE_REQUEST,ADDRESS_CREATE_FAILURE,ADDRESS_DELETE_FAILURE,ADDRESS_DELETE_REQUEST,ADDRESS_DELETE_SUCCESS} from '../../actions/address';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {
        case ADDRESS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false,
                ...action.payload
            })
            break;
        case ADDRESS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false,
                data:null,
            })
            break;
        case ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: false,
                ...action.payload
            })
            break;

        case ADDRESS_UPDATE_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ADDRESS_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ADDRESS_UPDATE_SUCCESS:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
            })
            break;


        case ADDRESS_CREATE_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ADDRESS_CREATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ADDRESS_CREATE_SUCCESS:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
            })
            break;



        case ADDRESS_DELETE_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ADDRESS_DELETE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ADDRESS_DELETE_SUCCESS:
            delete action.payload.data;
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
