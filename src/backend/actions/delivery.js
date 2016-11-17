/**
 * Created by zhangbohan on 16/11/17.
 */

import fetch from '../common/fetch';


export const DELIVERY_CREATE_REQUEST = 'DELIVERY_CREATE_REQUEST';
export const DELIVERY_CREATE_SUCCESS = 'DELIVERY_CREATE_SUCCESS';
export const DELIVERY_CREATE_FAILURE = 'DELIVERY_CREATE_FAILURE';


export const DELIVERY_LIST_REQUEST = 'DELIVERY_LIST_REQUEST';
export const DELIVERY_LIST_SUCCESS = 'DELIVERY_LIST_SUCCESS';
export const DELIVERY_LIST_FAILURE = 'DELIVERY_LIST_FAILURE';


//查询配送订单列表

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

function fetchDeliveryList(data) {
    return dispatch => {
        dispatch(delivery_list_request(data));
        return fetch('/api/delivery', {
            data
        })
            .then((json) => {
                dispatch(delivery_list_success(json));
            }).catch(error => {
                dispatch(delivery_list_failure(error))
            });
    };
}


function shouldFetchDeliveryList(state) {
    if (state.delivery.isFetching) {
        return false;
    }
    return true;
}


export function fetchDeliveryListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchDeliveryList(getState())) {
            return dispatch(fetchDeliveryList(data));
        }
    };
}


//新建配送单

function delivery_create_failure(payload) {
    return {
        type: DELIVERY_CREATE_FAILURE,
        payload
    };
}

function delivery_create_request(payload) {
    return {
        type: DELIVERY_CREATE_REQUEST,
        payload
    };
}

function delivery_create_success(json) {
    return {
        type: DELIVERY_CREATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function createDelivery(payload) {
    return (dispatch, getState) => {
        dispatch(delivery_create_request());
        return fetch('/api/delivery',{
            method:'POST',
            data:payload
        })
            .then((json) => {
                dispatch(delivery_create_success(json));
            }).catch(error => {
                dispatch(delivery_create_failure(error))
            });
    };
}