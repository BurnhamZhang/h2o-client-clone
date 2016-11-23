/**
 * Created by zhangbohan on 16/11/2.
 */
import fetch from '../common/fetch';

export const SHOP_REQUEST = 'SHOP_REQUEST';
export const SHOP_SUCCESS = 'SHOP_SUCCESS';
export const SHOP_FAILURE = 'SHOP_FAILURE';



export const SHOP_UPDATE_REQUEST = 'SHOP_UPDATE_REQUEST';
export const SHOP_UPDATE_SUCCESS = 'SHOP_UPDATE_SUCCESS';
export const SHOP_UPDATE_FAILURE = 'SHOP_UPDATE_FAILURE';


function shop_failure(payload) {
    return {
        type: SHOP_FAILURE,
        payload
    };
}

function shop_request(payload) {
    return {
        type: SHOP_REQUEST,
        payload
    };
}

function shop_success(json) {
    return {
        type: SHOP_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchShop(data) {
    return dispatch => {
        dispatch(shop_request(data));
        return fetch('/api/shop')
            .then((json) => {
                dispatch(shop_success(json));
            }).catch(error => {
                dispatch(shop_failure(error))
            });
    };
}


export function fetchShopIfNeeded() {
    return (dispatch, getState) => {
        const {shop} = getState();
        if (shouldFetchData(shop)) {
            return dispatch(fetchShop());
        }
    };
}


function shouldFetchData(shop) {
    if (shop.isFetching) {
        return false;
    }
    return true;
}



function shop_update_failure(payload) {
    return {
        type: SHOP_UPDATE_FAILURE,
        payload
    };
}

function shop_update_request(payload) {
    return {
        type: SHOP_UPDATE_REQUEST,
        payload
    };
}

function shop_update_success(json) {
    return {
        type: SHOP_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function updateShop(data) {
    return dispatch => {
        dispatch(shop_update_request(data));
        return fetch('/api/shop',{
            method:'PUT',
            data:data
        })
            .then((json) => {
                dispatch(shop_update_success(json));
            }).catch(error => {
                dispatch(shop_update_failure(error))
            });
    };
}


export function updateShopIfNeeded(data) {
    return (dispatch, getState) => {
        const {shop} = getState();
        if (shouldUpdateData(shop)) {
            return dispatch(updateShop(data));
        }
    };
}

function shouldUpdateData(shop) {
    if (shop.isFetching) {
        return false;
    }
    return true;
}

