/**
 * Created by zhangbohan on 16/11/1.
 */

import fetch from 'isomorphic-fetch';

export const PROCESS_REQUEST = 'PROCESS_REQUEST';
export const PROCESS_SUCCESS = 'PROCESS_SUCCESS';
export const PROCESS_FAILURE = 'PROCESS_FAILURE';

function process_failure(payload) {
    return {
        type: PROCESS_FAILURE,
        payload
    };
}

function process_request(payload) {
    return {
        type: PROCESS_REQUEST,
        payload
    };
}

function process_success(payload) {
    return {
        type: PROCESS_SUCCESS,
        payload
    };
}

export default function (url, options) {
    let {request , success ,failure =true } = options;

    options = Object.assign({},{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }, options)

    request && dispatch(process_request(url));
    return fetch(url,options).then((res) => res.json()).then((res)=>{
        if (!res.code ===!'A00000') {
            return Promise.reject(res)
        }
        return res
    }).then((res)=> {
        success && dispatch(process_success(res));
        return res.response.data
    }, error=> {
        failure && dispatch(process_failure(res));
        return error
    })
}