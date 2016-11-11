/**
 * Created by zhangbohan on 16/11/2.
 */
import fetch from '../common/fetch';

export const REGION_REQUEST = 'REGION_REQUEST';
export const REGION_SUCCESS = 'REGION_SUCCESS';
export const REGION_FAILURE = 'REGION_FAILURE';


function region_failure() {
    return {
        type: REGION_FAILURE,
    };
}

function region_request(payload) {
    return {
        type: REGION_REQUEST,
        payload
    };
}

function region_success(payload,id) {
    return {
        type: REGION_SUCCESS,
        receiveAt: Date.now(),
        payload,
        id
    };
}


function fetchRegion(id) {
    return dispatch => {
        dispatch(region_request(id));
        return fetch('/api/region?'+(id=='top'?'level=1':('parentCode='+id)))
            .then((json) => {
                dispatch(region_success(json.data,id));
            }).catch(error => {
                dispatch(region_failure(error))
            });
    };
}


export function fetchRegionIfNeeded(id='top') {
    return (dispatch, getState) => {
        const {region} = getState();

        if (shouldFetchData(region,id)) {
            return dispatch(fetchRegion(id));
        }
    };
}


function shouldFetchData(region,id) {
    if(region[id]){
        return false;
    }
    return true;
}



export const SHOP_REGION_REQUEST = 'SHOP_REGION_REQUEST';
export const SHOP_REGION_SUCCESS = 'SHOP_REGION_SUCCESS';
export const SHOP_REGION_FAILURE = 'SHOP_REGION_FAILURE';


function shop_region_failure(payload) {
    return {
        type: SHOP_REGION_FAILURE,
        payload
    };
}

function shop_region_request(payload) {
    return {
        type: SHOP_REGION_REQUEST,
        payload
    };
}

function shop_region_success(json) {
    return {
        type: SHOP_REGION_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchShopRegion(data) {
    return dispatch => {
        dispatch(shop_region_request(data));
        return fetch('/api/shop/region')
            .then((json) => {
                dispatch(shop_region_success(json));
            }).catch(error => {
                dispatch(shop_region_failure(error))
            });
    };
}


export function fetchShopRegionIfNeeded() {
    return (dispatch, getState) => {
        const {region} = getState().courier;
        if (shouldFetchRegion(region)) {
            return dispatch(fetchShopRegion());
        }
    };
}


function shouldFetchRegion(region) {
    if (region.data) {
        return false;
    }
    if (region.isFetching) {
        return false;
    }
    return true;
}
