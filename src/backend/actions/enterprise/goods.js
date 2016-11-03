import fetch from '../../common/fetch';

export const ENTERPRISE_GOODS_REQUEST = 'ENTERPRISE_GOODS_REQUEST';
export const ENTERPRISE_GOODS_SUCCESS = 'ENTERPRISE_GOODS_SUCCESS';
export const ENTERPRISE_GOODS_FAILURE = 'ENTERPRISE_GOODS_FAILURE';


export const ENTERPRISE_GOODS_LIST_REQUEST = 'ENTERPRISE_GOODS_LIST_REQUEST';
export const ENTERPRISE_GOODS_LIST_SUCCESS = 'ENTERPRISE_GOODS_LIST_SUCCESS';
export const ENTERPRISE_GOODS_LIST_FAILURE = 'ENTERPRISE_GOODS_LIST_FAILURE';

function goods_failure() {
    return {
        type: ENTERPRISE_GOODS_FAILURE,
    };
}

function goods_request(payload) {
    return {
        type: ENTERPRISE_GOODS_REQUEST,
        payload
    };
}

function goods_success(json) {
    return {
        type: ENTERPRISE_GOODS_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchGoods(data) {
    return dispatch => {
        dispatch(goods_request(data));
        return fetch('/api/goods/' + data)
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
        const {list,item} = getState().enterprise.goods;
        const goods = list.data && list.data.find(item => item.goodsId == id);
        if (goods) {
            return dispatch(goods_success(goods));
        }

        if (shouldFetchData(item)) {
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





function goods_list_failure() {
    return {
        type: ENTERPRISE_GOODS_LIST_FAILURE,
    };
}

function goods_list_request(payload) {
    return {
        type: ENTERPRISE_GOODS_LIST_REQUEST,
        payload
    };
}

function goods_list_success(json) {
    return {
        type: ENTERPRISE_GOODS_LIST_SUCCESS,
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
    const {list} = state.enterprise.goods;
    if (list.isFetching) {
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