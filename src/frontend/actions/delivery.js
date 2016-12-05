/**
 * Created by zhangbohan on 16/11/17.
 */

import fetch from '../common/fetch';
export const DELIVERY_TYPE_REQUEST = 'DELIVERY_TYPE_REQUEST';
export const DELIVERY_TYPE_SUCCESS = 'DELIVERY_TYPE_SUCCESS';
export const DELIVERY_TYPE_FAILURE = 'DELIVERY_TYPE_FAILURE';





//新建配送单

function delivery_type_failure(payload) {
    return {
        type: DELIVERY_TYPE_FAILURE,
        payload
    };
}

function delivery_type_request(payload) {
    return {
        type: DELIVERY_TYPE_REQUEST,
        payload
    };
}

function delivery_type_success(json) {
    return {
        type: DELIVERY_TYPE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function getDeliveryType(shopId) {
    return (dispatch, getState) => {
        dispatch(delivery_type_request());
        return fetch(`/api/shop/delivery/${shopId}`,{
        })
            .then((json) => {
                dispatch(delivery_type_success(json));
            }).catch(error => {
                dispatch(delivery_type_failure(error))
            });
    };
}


