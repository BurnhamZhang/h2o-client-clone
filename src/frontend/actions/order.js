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



export function feedbackOrder() {
    return (dispatch, getState) => {
        const state = getState();
        const shopId = state.shop.data[0];
        const goodsIdArray = state.order.data.map(item=>item.goodsId);
        dispatch(order_feedback_request());
        return fetch(`/api/order/feedback`,{
            method:'POST',
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

//订单反馈


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
