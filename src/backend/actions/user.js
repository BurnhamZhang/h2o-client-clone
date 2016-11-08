import fetch from '../common/fetch';
import {User} from '../constants/globals';
import * as  storage from '../common/storage';
export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const INVALIDATE_USER = 'INVALIDATE_USER';
export const AUTH_TIMEOUT = 'AUTH_TIMEOUT';


export function auth_timeout(payload) {
    return {
        type: AUTH_TIMEOUT,
        payload
    };
}
export function invalidateUser() {
    return {
        type: INVALIDATE_USER,
    };
}

function requestUser(payload) {
    return {
        type: REQUEST_USER,
        payload
    };
}

function receiveUser(json) {
    return {
        type: RECEIVE_USER,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchData(data) {
    return dispatch => {
        dispatch(requestUser(data));
        return fetch(User, {
            method: 'POST',
            data
        })
            .then((json) => {
                if (json.data.account) {
                    json.data.loginType = data.loginType;
                    storage.set('USER_INFO', json.data);
                }
                dispatch(receiveUser(json));


            }).catch(error => {
                dispatch(invalidateUser(error))
            });
    };
}

function shouldFetchData(state) {
    const {example} = state;
    if (!example) {
        return true;
    } else if (example.isFetching) {
        return false;
    }
    return example.didInvalidate;
}

export function fetchUserIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchData(getState())) {
            return dispatch(fetchData(data));
        }
    };
}
