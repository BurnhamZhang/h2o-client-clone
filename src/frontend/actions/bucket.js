/**
 * Created by zhangbohan on 16/12/1.
 */
import fetch from '../common/fetch';
export const BUCK_RECORD_REQUEST = 'BUCK_RECORD_REQUEST';
export const BUCK_RECORD_SUCCESS = 'BUCK_RECORD_SUCCESS';
export const BUCK_RECORD_FAILURE = 'BUCK_RECORD_FAILURE';



//获取用户的空桶数据
function bucket_record_failure(payload) {
    return {
        type: BUCK_RECORD_FAILURE,
        payload
    };
}

function bucket_record_request(payload) {
    return {
        type: BUCK_RECORD_REQUEST,
        payload
    };
}

function bucket_record_success(json) {
    return {
        type: BUCK_RECORD_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function getBucketRecord(data) {
    return (dispatch, getState) => {
        dispatch(bucket_record_request());
        return fetch('/api/bucket/user',{
            data
        })
            .then((json) => {
                dispatch(bucket_record_success(json));
            }).catch(error => {
                dispatch(bucket_record_failure(error))
            });
    };
}