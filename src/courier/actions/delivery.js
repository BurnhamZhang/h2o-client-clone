/**
 * Created by zhangbohan on 16/11/17.
 */

import fetch from '../common/fetch';

export const DELIVERY_LIST_CLEAR = 'DELIVERY_LIST_CLEAR';



export function clearDeliveryList(){
    return {
        type: DELIVERY_LIST_CLEAR,
    };
}


//查询配送记录


export const DELIVERY_LIST_REQUEST = 'DELIVERY_LIST_REQUEST';
export const DELIVERY_LIST_SUCCESS = 'DELIVERY_LIST_SUCCESS';
export const DELIVERY_LIST_FAILURE = 'DELIVERY_LIST_FAILURE';


function delivery_list_failure(payload) {
    return {
        type: DELIVERY_LIST_FAILURE,
        payload
    };
}

function delivery_list_request(payload) {
    return {
        type: DELIVERY_LIST_REQUEST,
        payload
    };
}

function delivery_list_success(json) {
    return {
        type: DELIVERY_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function getDeliveryList(payload) {
    return (dispatch, getState) => {
        dispatch(delivery_list_request());
        return fetch(`/api/delivery`,{
            data:payload
        })
            .then((json) => {
                dispatch(delivery_list_success(json));
            }).catch(error => {
                dispatch(delivery_list_failure(error))
            });
    };
}


//修改配送单


export const DELIVERY_MODIFY_REQUEST = 'DELIVERY_MODIFY_REQUEST';
export const DELIVERY_MODIFY_SUCCESS = 'DELIVERY_MODIFY_SUCCESS';
export const DELIVERY_MODIFY_FAILURE = 'DELIVERY_MODIFY_FAILURE';


function delivery_modify_failure(payload) {
    return {
        type: DELIVERY_MODIFY_FAILURE,
        payload
    };
}

function delivery_modify_request(payload) {
    return {
        type: DELIVERY_MODIFY_REQUEST,
        payload
    };
}

function delivery_modify_success(json) {
    return {
        type: DELIVERY_MODIFY_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function modifyDeliveryById(deliveryNo,payload) {
    return (dispatch, getState) => {
        dispatch(delivery_modify_request());
        return fetch(`/api/delivery/${deliveryNo}`,{
            method:'PUT',
            data:payload
        })
            .then((json) => {
                dispatch(delivery_modify_success(json));
            }).catch(error => {
                dispatch(delivery_modify_failure(error))
            });
    };
}


