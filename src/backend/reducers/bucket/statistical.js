import {BUCKET_STATISTICAL_FAILURE,BUCKET_STATISTICAL_REQUEST,BUCKET_STATISTICAL_SUCCESS} from '../../actions/bucket';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    pagination:{
    },
    data:{
        activeNum:0,
        addressNum:0,
        bigBucketNum:0,
        bigMoneyNum:0,
        littleBucketNum:0,
        littleMoneyNum:0
    }
}, action) {
    switch (action.type) {
        case BUCKET_STATISTICAL_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case BUCKET_STATISTICAL_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case BUCKET_STATISTICAL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                ... action.payload
            })
            break;
        default:
            return state
    }
}
