/**
 * Created by zhangbohan on 16/11/2.
 */
import fetch from '../common/fetch';

export const SHOP_REQUEST = 'SHOP_REQUEST';
export const SHOP_SUCCESS = 'SHOP_SUCCESS';
export const SHOP_FAILURE = 'SHOP_FAILURE';


function shop_failure() {
    return {
        type: SHOP_FAILURE,
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
    if (shop.data) {
        return false;
    }
    if (shop.isFetching) {
        return false;
    }
    return true;
}
