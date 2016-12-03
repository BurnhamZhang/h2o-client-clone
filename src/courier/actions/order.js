import fetch from '../common/fetch';




export const ORDER_ASSIGN_REQUEST = 'ORDER_ASSIGN_REQUEST';
export const ORDER_ASSIGN_SUCCESS = 'ORDER_ASSIGN_SUCCESS';
export const ORDER_ASSIGN_FAILURE = 'ORDER_ASSIGN_FAILURE';


export const ORDER_LIST_CLEAR = 'ORDER_LIST_CLEAR';



export  function orderListClear() {
    return {
        type: ORDER_LIST_CLEAR,
    };
}

//待分配订单查询


function order_assign_failure(payload) {
    return {
        type: ORDER_ASSIGN_FAILURE,
        payload
    };
}

function order_assign_request(payload) {
    return {
        type: ORDER_ASSIGN_REQUEST,
        payload
    };
}

function order_assign_success(json) {
    return {
        type: ORDER_ASSIGN_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function order_list_clear() {
    return {
        type: ORDER_LIST_CLEAR,
    };
}




export function assignOrderList(data) {
    return (dispatch, getState) => {
        dispatch(order_assign_request());
        return fetch(`/api/order/assign`,{
            data
        })
            .then((json) => {
                dispatch(order_assign_success(json));
            }).catch(error => {
                dispatch(order_assign_failure(error))
            });
    };
}



