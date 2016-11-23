import { BUCKET_UPDATE_FAILURE,BUCKET_UPDATE_REQUEST,BUCKET_UPDATE_SUCCESS} from '../../actions/bucket';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:null,
}, action) {
    switch (action.type) {


        case BUCKET_UPDATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                remoteMsg:action.payload.remoteMsg
            })
            break;
        case BUCKET_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case BUCKET_UPDATE_SUCCESS:
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
