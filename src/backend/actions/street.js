/**
 * Created by zhangbohan on 16/11/2.
 */
import fetch from '../common/fetch';

export const STREET_REQUEST = 'STREET_REQUEST';
export const STREET_SUCCESS = 'STREET_SUCCESS';
export const STREET_FAILURE = 'STREET_FAILURE';


function street_failure() {
    return {
        type: STREET_FAILURE,
    };
}

function street_request(payload) {
    return {
        type: STREET_REQUEST,
        payload
    };
}

function street_success(json) {
    return {
        type: STREET_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchStreet(data) {
    return dispatch => {
        dispatch(street_request(data));
        return fetch('/api/courier/street')
            .then((json) => {
                dispatch(street_success(json));
            }).catch(error => {
                dispatch(street_failure(error))
            });
    };
}


export function fetchStreetIfNeeded() {
    return (dispatch, getState) => {
        const {street} = getState().courier;
        if (shouldFetchData(street)) {
            return dispatch(fetchStreet());
        }
    };
}


function shouldFetchData(street) {
    if (street.data) {
        return false;
    }
    if (street.isFetching) {
        return false;
    }
    return true;
}
