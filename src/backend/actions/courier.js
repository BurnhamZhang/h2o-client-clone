/**
 * Created by zhangbohan on 16/11/1.
 */


import fetch from '../common/fetch';

export const COURIER_REQUEST = 'COURIER_REQUEST';
export const COURIER_SUCCESS = 'COURIER_SUCCESS';
export const COURIER_FAILURE = 'COURIER_FAILURE';

export const COURIER_LIST_REQUEST = 'COURIER_LIST_REQUEST';
export const COURIER_LIST_SUCCESS = 'COURIER_LIST_SUCCESS';
export const COURIER_LIST_FAILURE = 'COURIER_LIST_FAILURE';

function courier_failure() {
    return {
        type: COURIER_FAILURE,
    };
}

function courier_request(payload) {
    return {
        type: COURIER_REQUEST,
        payload
    };
}

function courier_success(json) {
    return {
        type: COURIER_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchCourier(data) {
    return dispatch => {
        dispatch(courier_request(data));
        return fetch('/api/courier/' + data, {
            method: 'GET',
        })
            .then((json) => {
                dispatch(courier_success(json));
            }).catch(error => {
                dispatch(courier_failure(error))
            });
    };
}


export function fetchCourierIfNeeded(id) {

    if (id == 'create') {
        return false
    }

    return (dispatch, getState) => {
        const {list,item} = getState().courier;
        const courier = list.data && list.data.find(item => item.courierId == id);
        if (courier) {
            return dispatch(courier_success(courier));
        }

        if (shouldFetchData(courier)) {
            return dispatch(fetchCourier(id));
        }
    };
}


function shouldFetchData(courier) {
    if (courier.isFetching) {
        return false;
    }
    return true;
}



function courier_list_failure() {
    return {
        type: COURIER_LIST_FAILURE,
    };
}

function courier_list_request(payload) {
    return {
        type: COURIER_LIST_REQUEST,
        payload
    };
}

function courier_list_success(json) {
    return {
        type: COURIER_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchCourierList(data) {
    return dispatch => {
        dispatch(courier_list_request(data));
        return fetch('/api/courier', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((json) => {
                dispatch(courier_list_success(json));
            }).catch(error => {
                dispatch(courier_list_failure(error))
            });
    };
}


function shouldFetchCourierList(state) {
    if (state.courier.list.isFetching) {
        return false;
    }
    return true;
}


export function fetchCourierListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchCourierList(getState())) {
            return dispatch(fetchCourierList(data));
        }
    };
}
