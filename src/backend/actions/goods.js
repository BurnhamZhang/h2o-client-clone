import fetch from '../common/fetch';

export const GOODS_REQUEST = 'GOODS_REQUEST';
export const GOODS_SUCCESS = 'GOODS_SUCCESS';
export const GOODS_FAILURE = 'GOODS_FAILURE';

function goods_failure() {
    return {
        type: GOODS_FAILURE,
    };
}

function goods_request(payload) {
    return {
        type: GOODS_REQUEST,
        payload
    };
}

function goods_success(json) {
    return {
        type: GOODS_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchGoods(data) {
    return dispatch => {
        dispatch(goods_request(data));
        return fetch('/api/goods/' + data, {
            method: 'GET',
        })
            .then((json) => {
                dispatch(goods_success(json));
            }).catch(error => {
                dispatch(goods_failure(error))
            });
    };
}


export function fetchGoodsIfNeeded(id) {

    if (id == 'create') {
        return false
    }

    return (dispatch, getState) => {
        const {goodslist,goods} = getState();
        const item = goodslist.data && goodslist.data.find(item => item.goodsId == id);
        if (item) {
            return dispatch(goods_success(item));
        }

        if (shouldFetchData(goods)) {
            return dispatch(fetchGoods(id));
        }
    };
}


function shouldFetchData(goods) {
    if (goods.isFetching) {
        return false;
    }
    return true;
}