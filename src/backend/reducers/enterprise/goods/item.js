import {ENTERPRISE_GOODS_REQUEST, ENTERPRISE_GOODS_SUCCESS, ENTERPRISE_GOODS_FAILURE,ENTERPRISE_GOODS_UPDATE_REQUEST ,ENTERPRISE_GOODS_UPDATE_SUCCESS,ENTERPRISE_GOODS_UPDATE_FAILURE,ENTERPRISE_GOODS_CREATE_SUCCESS,ENTERPRISE_GOODS_CREATE_REQUEST,ENTERPRISE_GOODS_CREATE_FAILURE,ENTERPRISE_GOODS_DELETE_FAILURE,ENTERPRISE_GOODS_DELETE_REQUEST,ENTERPRISE_GOODS_DELETE_SUCCESS} from '../../../actions/enterprise/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {
        case ENTERPRISE_GOODS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_GOODS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_GOODS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:false,
                ...action.payload
            })
            break;

        case ENTERPRISE_GOODS_UPDATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_GOODS_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_GOODS_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;


        case ENTERPRISE_GOODS_CREATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_GOODS_CREATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_GOODS_CREATE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;



        case ENTERPRISE_GOODS_DELETE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_GOODS_DELETE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ENTERPRISE_GOODS_DELETE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;


        default:
            return state
    }
}
