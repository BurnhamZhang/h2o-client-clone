/**
 * Created by zhangbohan on 16/11/1.
 */


import fetch from '../../common/fetch';

export const ENTERPRISE_SHOP_REQUEST = 'ENTERPRISE_SHOP_REQUEST';
export const ENTERPRISE_SHOP_SUCCESS = 'ENTERPRISE_SHOP_SUCCESS';
export const ENTERPRISE_SHOP_FAILURE = 'ENTERPRISE_SHOP_FAILURE';

export const ENTERPRISE_SHOP_LIST_REQUEST = 'ENTERPRISE_SHOP_LIST_REQUEST';
export const ENTERPRISE_SHOP_LIST_SUCCESS = 'ENTERPRISE_SHOP_LIST_SUCCESS';
export const ENTERPRISE_SHOP_LIST_FAILURE = 'ENTERPRISE_SHOP_LIST_FAILURE';


export const ENTERPRISE_SHOP_CREATE_REQUEST = 'ENTERPRISE_SHOP_CREATE_REQUEST';
export const ENTERPRISE_SHOP_CREATE_SUCCESS = 'ENTERPRISE_SHOP_CREATE_SUCCESS';
export const ENTERPRISE_SHOP_CREATE_FAILURE = 'ENTERPRISE_SHOP_CREATE_FAILURE';



export const ENTERPRISE_SHOP_UPDATE_REQUEST = 'ENTERPRISE_SHOP_UPDATE_REQUEST';
export const ENTERPRISE_SHOP_UPDATE_SUCCESS = 'ENTERPRISE_SHOP_UPDATE_SUCCESS';
export const ENTERPRISE_SHOP_UPDATE_FAILURE = 'ENTERPRISE_SHOP_UPDATE_FAILURE';

export const ENTERPRISE_SHOP_DELETE_REQUEST = 'ENTERPRISE_SHOP_DELETE_REQUEST';
export const ENTERPRISE_SHOP_DELETE_SUCCESS = 'ENTERPRISE_SHOP_DELETE_SUCCESS';
export const ENTERPRISE_SHOP_DELETE_FAILURE = 'ENTERPRISE_SHOP_DELETE_FAILURE';


function shop_failure(payload) {
    return {
        type: ENTERPRISE_SHOP_FAILURE,
        payload
    };
}

function shop_request(payload) {
    return {
        type: ENTERPRISE_SHOP_REQUEST,
        payload
    };
}

function shop_success(json) {
    return {
        type: ENTERPRISE_SHOP_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchShop(data) {
    return dispatch => {
        dispatch(shop_request(data));
        return fetch('/api/shop/account/' + data)
            .then((json) => {
                dispatch(shop_success(json));
            }).catch(error => {
                dispatch(shop_failure(error))
            });
    };
}


export function fetchShopIfNeeded(id) {

    if (id == 'create') {
        return false
    }

    return (dispatch, getState) => {
        const {list, item} = getState().enterprise.shop;
        const shop = list.data && list.data.find(item => item.id == id);
        if (shop) {
            return dispatch(shop_success({data: shop}));
        }

        if (shouldFetchData(item)) {
            return dispatch(fetchShop(id));
        }
    };
}


function shouldFetchData(shop) {
    if (shop.isFetching) {
        return false;
    }
    return true;
}


function shop_list_failure(payload) {
    return {
        type: ENTERPRISE_SHOP_LIST_FAILURE,
        payload
    };
}

function shop_list_request(payload) {
    return {
        type: ENTERPRISE_SHOP_LIST_REQUEST,
        payload
    };
}

function shop_list_success(json) {
    return {
        type: ENTERPRISE_SHOP_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchShopList(data) {
    return dispatch => {
        dispatch(shop_list_request(data));
        return fetch('/api/shop/account', {
            data
        })
            .then((json) => {
                dispatch(shop_list_success(json));
            }).catch(error => {
                dispatch(shop_list_failure(error))
            });
    };
}


function shouldFetchShopList(state) {
    if (state.enterprise.shop.list.isFetching) {
        return false;
    }
    return true;
}


export function fetchShopListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchShopList(getState())) {
            return dispatch(fetchShopList(data));
        }
    };
}

function shop_update_failure(payload) {
    return {
        type: ENTERPRISE_SHOP_UPDATE_FAILURE,
        payload
    };
}

function shop_update_request(payload) {
    return {
        type: ENTERPRISE_SHOP_UPDATE_REQUEST,
        payload
    };
}

function shop_update_success(json) {
    return {
        type: ENTERPRISE_SHOP_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function updateShopById(id ,data) {
    return (dispatch, getState) => {
        dispatch(shop_update_request(id));
        return fetch('/api/shop/account/' + id,{
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


function shop_create_failure(payload) {
    return {
        type: ENTERPRISE_SHOP_CREATE_FAILURE,
        payload
    };
}

function shop_create_request(payload) {
    return {
        type: ENTERPRISE_SHOP_CREATE_REQUEST,
        payload
    };
}

function shop_create_success(json) {
    return {
        type: ENTERPRISE_SHOP_CREATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function createShop(payload) {
    return (dispatch, getState) => {
        dispatch(shop_create_request());
        return fetch('/api/shop/account',{
            method:'POST',
            data:payload
        })
            .then((json) => {
                dispatch(shop_create_success(json));
            }).catch(error => {
                dispatch(shop_create_failure(error))
            });
    };
}


function shop_delete_failure(payload) {
    return {
        type: ENTERPRISE_SHOP_DELETE_FAILURE,
        payload
    };
}

function shop_delete_request(payload) {
    return {
        type: ENTERPRISE_SHOP_DELETE_REQUEST,
        payload
    };
}

function shop_delete_success(json) {
    return {
        type: ENTERPRISE_SHOP_DELETE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function deleteShopById(id) {
    return (dispatch, getState) => {
        dispatch(shop_delete_request());
        return fetch('/api/shop/account/'+id,{
            method:'DELETE',
        })
            .then((json) => {
                dispatch(shop_delete_success(json));
            }).catch(error => {
                dispatch(shop_delete_failure(error))
            });
    };
}