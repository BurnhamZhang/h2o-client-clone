import {GOODS_REQUEST, GOODS_SUCCESS, GOODS_FAILURE,GOODS_UPDATE_REQUEST ,GOODS_UPDATE_SUCCESS,GOODS_UPDATE_FAILURE,GOODS_CREATE_SUCCESS,GOODS_CREATE_REQUEST,GOODS_CREATE_FAILURE,GOODS_DELETE_FAILURE,GOODS_DELETE_REQUEST,GOODS_DELETE_SUCCESS} from '../../actions/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {
        case GOODS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false,
                ...action.payload
            })
            break;
        case GOODS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false,
                data:null,
            })
            break;
        case GOODS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: false,
                ...action.payload
            })
            break;

        case GOODS_UPDATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case GOODS_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case GOODS_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
                data:null,
            })
            break;


        case GOODS_CREATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case GOODS_CREATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case GOODS_CREATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
                data:null,
            })
            break;



        case GOODS_DELETE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case GOODS_DELETE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case GOODS_DELETE_SUCCESS:
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
