import fetch from '../common/fetch';


export const BUCKET_STATISTICAL_REQUEST = 'BUCKET_STATISTICAL_REQUEST';
export const BUCKET_STATISTICAL_SUCCESS = 'BUCKET_STATISTICAL_SUCCESS';
export const BUCKET_STATISTICAL_FAILURE = 'BUCKET_STATISTICAL_FAILURE';

export const BUCKET_LIST_REQUEST = 'BUCKET_LIST_REQUEST';
export const BUCKET_LIST_SUCCESS = 'BUCKET_LIST_SUCCESS';
export const BUCKET_LIST_FAILURE = 'BUCKET_LIST_FAILURE';




export const BUCKET_UPDATE_REQUEST = 'BUCKET_UPDATE_REQUEST';
export const BUCKET_UPDATE_SUCCESS = 'BUCKET_UPDATE_SUCCESS';
export const BUCKET_UPDATE_FAILURE = 'BUCKET_UPDATE_FAILURE';



//空桶记录列表



function bucket_list_failure(payload) {
    return {
        type: BUCKET_LIST_FAILURE,
        payload
    };
}

function bucket_list_request(payload) {
    return {
        type: BUCKET_LIST_REQUEST,
        payload
    };
}

function bucket_list_success(json) {
    return {
        type: BUCKET_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchBucketList(data) {
    return dispatch => {
        dispatch(bucket_list_request(data));
        return fetch('/api/bucket', {
            data
        })
            .then((json) => {
                dispatch(bucket_list_success(json));
            }).catch(error => {
                dispatch(bucket_list_failure(error))
            });
    };
}


function shouldFetchBucketList(state) {
    const {list} = state.bucket;
    if (list.isFetching) {
        return false;
    }
    return true;
}


export function fetchBucketListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchBucketList(getState())) {
            return dispatch(fetchBucketList(data));
        }
    };
}

//调整空桶数量


function bucket_update_failure(payload) {
    return {
        type: BUCKET_UPDATE_FAILURE,
        payload
    };
}

function bucket_update_request(payload) {
    return {
        type: BUCKET_UPDATE_REQUEST,
        payload
    };
}

function bucket_update_success(json) {
    return {
        type: BUCKET_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function updateBucketById(id ,data) {
    return (dispatch, getState) => {
        dispatch(bucket_update_request(id));
        return fetch('/api/shop/bucket/' + id,{
            method:'PUT',
            data:data
        })
            .then((json) => {
                dispatch(bucket_update_success(json));
            }).catch(error => {
                dispatch(bucket_update_failure(error))
            });
    };
}


//空桶统计信息



function bucket_statistical_failure(payload) {
    return {
        type: BUCKET_STATISTICAL_FAILURE,
        payload
    };
}

function bucket_statistical_request(payload) {
    return {
        type: BUCKET_STATISTICAL_REQUEST,
        payload
    };
}

function bucket_statistical_success(json) {
    return {
        type: BUCKET_STATISTICAL_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchBucketStatistical(data) {
    return dispatch => {
        dispatch(bucket_statistical_request(data));
        return fetch('/api/bucket/statistical', {
            data
        })
            .then((json) => {
                dispatch(bucket_statistical_success(json));
            }).catch(error => {
                dispatch(bucket_statistical_failure(error))
            });
    };
}


function shouldFetchBucketStatistical(state) {
    const {statistical} = state.bucket;
    if (statistical.isFetching) {
        return false;
    }
    return true;
}


export function fetchBucketStatisticalIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchBucketStatistical(getState())) {
            return dispatch(fetchBucketStatistical(data));
        }
    };
}