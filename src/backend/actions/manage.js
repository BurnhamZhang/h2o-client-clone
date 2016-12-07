/**
 * Created by zhangbohan on 16/11/17.
 */



import fetch from '../common/fetch';



export const MANAGE_ORDER_REQUEST = 'MANAGE_ORDER_REQUEST';
export const MANAGE_ORDER_SUCCESS = 'MANAGE_ORDER_SUCCESS';
export const MANAGE_ORDER_FAILURE = 'MANAGE_ORDER_FAILURE';


function manage_order_failure(payload) {
    return {
        type: MANAGE_ORDER_FAILURE,
        payload
    };
}

function manage_order_request(payload) {
    return {
        type: MANAGE_ORDER_REQUEST,
        payload
    };
}

function manage_order_success(json) {
    return {
        type: MANAGE_ORDER_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchManageOrderList(data) {
    return dispatch => {
        dispatch(manage_order_request(data));
        return fetch('/api/order/assign?pageSize=9999999&pageNum=1', {
            data
        })
            .then((json) => {
                dispatch(manage_order_success(json));
            }).catch(error => {
                dispatch(manage_order_failure(error))
            });
    };
}


function shouldFetchManageOrderList(state) {
    if (state.manage.isFetching) {
        return false;
    }
    return true;
}


export function fetchManageOrderListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchManageOrderList(getState())) {
            return dispatch(fetchManageOrderList(data));
        }
    };
}

