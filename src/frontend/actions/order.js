import fetch from '../common/fetch';




export const ORDER_FEEDBACK_REQUEST = 'ORDER_FEEDBACK_REQUEST';
export const ORDER_FEEDBACK_SUCCESS = 'ORDER_FEEDBACK_SUCCESS';
export const ORDER_FEEDBACK_FAILURE = 'ORDER_FEEDBACK_FAILURE';




//订单反馈


function order_feedback_failure(payload) {
    return {
        type: ORDER_FEEDBACK_FAILURE,
        payload
    };
}

function order_feedback_request(payload) {
    return {
        type: ORDER_FEEDBACK_REQUEST,
        payload
    };
}

function order_feedback_success(json) {
    return {
        type: ORDER_FEEDBACK_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function feedbackOrder(data) {
    return (dispatch, getState) => {
        dispatch(order_feedback_request());
        return fetch(`/api/order/feedback`,{
            method:'POST',
            data
        })
            .then((json) => {
                dispatch(order_feedback_success(json));
            }).catch(error => {
                dispatch(order_feedback_failure(error))
            });
    };
}


export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
export const ORDER_CREATE_FAILURE = 'ORDER_CREATE_FAILURE';

//创建订单


function order_create_failure(payload) {
    return {
        type: ORDER_CREATE_FAILURE,
        payload
    };
}

function order_create_request(payload) {
    return {
        type: ORDER_CREATE_REQUEST,
        payload
    };
}

function order_create_success(json) {
    return {
        type: ORDER_CREATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function createOrder(data) {
    return (dispatch, getState) => {
        dispatch(order_create_request());
        return fetch(`/api/delivery/order`,{
            method:'POST',
            data
        })
            .then((json) => {
                dispatch(order_create_success(json));
            }).catch(error => {
                dispatch(order_create_failure(error))
            });
    };
}

//订单详情

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILURE = 'ORDER_FAILURE';



function order_failure() {
    return {
        type: ORDER_FAILURE,
    };
}

function order_request(payload) {
    return {
        type: ORDER_REQUEST,
        payload
    };
}

function order_success(json) {
    return {
        type: ORDER_SUCCESS,
        receiveAt: Date.now(),
        payload:json
    };
}

function fetchData(id) {
    return dispatch => {
        dispatch(order_request(id));
        return fetch('/api/order/'+id,{
        })
            .then((json) => {
                dispatch(order_success(json));
            }).catch(error =>{
                dispatch(order_failure(error))
            } );
    };
}

function shouldFetchData(state) {
    const  order  = state.order.item;
    if (order.isFetching) {
        return false;
    }
    return true;
}

export function fetchOrderIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchData(getState())) {
            return dispatch(fetchData(data));
        }
    };
}

//订单列表

export const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST';
export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS';
export const ORDER_LIST_FAILURE = 'ORDER_LIST_FAILURE';

function order_list_failure() {
    return {
        type: ORDER_LIST_FAILURE,
    };
}

function order_list_request(payload) {
    return {
        type: ORDER_LIST_REQUEST,
        payload
    };
}

function order_list_success(json) {
    return {
        type: ORDER_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload:json
    };
}

function fetchOrderList(data) {
    return dispatch => {
        dispatch(order_list_request(data));
        return fetch('/api/order/list',{
            data:{
                orderType:1,
                ...data
            }
        })
            .then((json) => {
                dispatch(order_list_success(json));
            }).catch(error =>{
                dispatch(order_list_failure(error))
            } );
    };
}

function shouldFetchOrderList(state) {
    const list = state.order.list;
    if (list.isFetching) {
        return false;
    }
    return true;
}

export function fetchOrderListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchOrderList(getState())) {
            return dispatch(fetchOrderList(data));
        }
    };
}


//取消订单


export const ORDER_CANCEL_REQUEST = 'ORDER_CANCEL_REQUEST';
export const ORDER_CANCEL_SUCCESS = 'ORDER_CANCEL_SUCCESS';
export const ORDER_CANCEL_FAILURE = 'ORDER_CANCEL_FAILURE';


function order_cancel_failure(payload) {
    return {
        type: ORDER_CANCEL_FAILURE,
        payload
    };
}

function order_cancel_request(payload) {
    return {
        type: ORDER_CANCEL_REQUEST,
        payload
    };
}

function order_cancel_success(json) {
    return {
        type: ORDER_CANCEL_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function orderCancelConfirm(orderNo,payload) {
    return (dispatch, getState) => {
        dispatch(order_cancel_request(orderNo));
        return fetch(`/api/order/user/cancel/ask/${orderNo}`,{
            method:'PUT',
            data:payload
        })
            .then((json) => {
                dispatch(order_cancel_success(json));
            }).catch(error => {
                dispatch(order_cancel_failure(error))
            });
    };
}


//订单继续支付


export const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST';
export const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS';
export const ORDER_PAY_FAILURE = 'ORDER_PAY_FAILURE';


function order_pay_failure(payload) {
    return {
        type: ORDER_PAY_FAILURE,
        payload
    };
}

function order_pay_request(payload) {
    return {
        type: ORDER_PAY_REQUEST,
        payload
    };
}

function order_pay_success(json) {
    return {
        type: ORDER_PAY_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function orderPay(orderNo) {
    return (dispatch, getState) => {
        dispatch(order_pay_request(orderNo));
        return fetch(`/api/payAgain/${orderNo}`,{
        })
            .then((json) => {
                dispatch(order_pay_success(json));
            }).catch(error => {
                dispatch(order_pay_failure(error))
            });
    };
}


//订单继续支付


export const ORDER_COMPLETE_REQUEST = 'ORDER_COMPLETE_REQUEST';
export const ORDER_COMPLETE_SUCCESS = 'ORDER_COMPLETE_SUCCESS';
export const ORDER_COMPLETE_FAILURE = 'ORDER_COMPLETE_FAILURE';


function order_complete_failure(payload) {
    return {
        type: ORDER_COMPLETE_FAILURE,
        payload
    };
}

function order_complete_request(payload) {
    return {
        type: ORDER_COMPLETE_REQUEST,
        payload
    };
}

function order_complete_success(json) {
    return {
        type: ORDER_COMPLETE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function orderComplete(orderNo) {
    return (dispatch, getState) => {
        dispatch(order_complete_request(orderNo));
        return fetch(`/api/order/complete/${orderNo}`,{
        })
            .then((json) => {
                dispatch(order_complete_success(json));
            }).catch(error => {
                dispatch(order_complete_failure(error))
            });
    };
}


