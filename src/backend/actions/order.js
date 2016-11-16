import fetch from '../common/fetch';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILURE = 'ORDER_FAILURE';

export const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST';
export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS';
export const ORDER_LIST_FAILURE = 'ORDER_LIST_FAILURE';



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
      data:data
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
