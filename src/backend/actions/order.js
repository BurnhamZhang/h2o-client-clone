import fetch from '../common/fetch';

export const ORDERS_REQUEST = 'ORDERS_REQUEST';
export const ORDERS_SUCCESS = 'ORDERS_SUCCESS';
export const ORDERS_FAILURE = 'ORDERS_FAILURE';

export function orders_failure() {
  return {
    type: ORDERS_FAILURE,
  };
}

function orders_request(payload) {
  return {
    type: ORDERS_REQUEST,
    payload
  };
}

function orders_success(json) {
  return {
    type: ORDERS_SUCCESS,
    receiveAt: Date.now(),
    payload:json
  };
}

function fetchData(data) {
  return dispatch => {
    dispatch(orders_request(data));
    return fetch('/api/order',{
      method:'POST',
      body: JSON.stringify(data)
    })
    .then((json) => {
      dispatch(orders_success(json));
    }).catch(error =>{
      dispatch(orders_failure(error))
        } );
  };
}

function shouldFetchData(state) {
  const { order } = state;
  if (order.isFetching) {
    return false;
  }
  return true;
}

export function fetchOrdersIfNeeded(data) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      return dispatch(fetchData(data));
    }
  };
}
