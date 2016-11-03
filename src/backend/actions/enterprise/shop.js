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

function shop_failure() {
    return {
        type: ENTERPRISE_SHOP_FAILURE,
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


function shop_list_failure() {
    return {
        type: ENTERPRISE_SHOP_LIST_FAILURE,
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
