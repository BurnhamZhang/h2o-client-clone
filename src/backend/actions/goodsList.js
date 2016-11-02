import fetch from '../common/fetch';

export const GOODS_LIST_REQUEST = 'GOODS_LIST_REQUEST';
export const GOODS_LIST_SUCCESS = 'GOODS_LIST_SUCCESS';
export const GOODS_LIST_FAILURE = 'GOODS_LIST_FAILURE';


function goods_list_failure() {
    return {
        type: GOODS_LIST_FAILURE,
    };
}

function goods_list_request(payload) {
    return {
        type: GOODS_LIST_REQUEST,
        payload
    };
}

function goods_list_success(json) {
    return {
        type: GOODS_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchGoodsList(data) {
    return dispatch => {
        dispatch(goods_list_request(data));
        return fetch('/api/goods', {
            data
        })
            .then((json) => {
                dispatch(goods_list_success(json));
            }).catch(error => {
                dispatch(goods_list_failure(error))
            });
    };
}


function shouldFetchGoodsList(state) {
    const {goods} = state;
    if (goods.isFetching) {
        return false;
    }
    return true;
}


export function fetchGoodsListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchGoodsList(getState())) {
            return dispatch(fetchGoodsList(data));
        }
    };
}

