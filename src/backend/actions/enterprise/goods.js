import fetch from '../../common/fetch';

export const ENTERPRISE_GOODS_REQUEST = 'ENTERPRISE_GOODS_REQUEST';
export const ENTERPRISE_GOODS_SUCCESS = 'ENTERPRISE_GOODS_SUCCESS';
export const ENTERPRISE_GOODS_FAILURE = 'ENTERPRISE_GOODS_FAILURE';


export const ENTERPRISE_GOODS_LIST_REQUEST = 'ENTERPRISE_GOODS_LIST_REQUEST';
export const ENTERPRISE_GOODS_LIST_SUCCESS = 'ENTERPRISE_GOODS_LIST_SUCCESS';
export const ENTERPRISE_GOODS_LIST_FAILURE = 'ENTERPRISE_GOODS_LIST_FAILURE';


export const ENTERPRISE_GOODS_UPDATE_REQUEST = 'ENTERPRISE_GOODS_UPDATE_REQUEST';
export const ENTERPRISE_GOODS_UPDATE_SUCCESS = 'ENTERPRISE_GOODS_UPDATE_SUCCESS';
export const ENTERPRISE_GOODS_UPDATE_FAILURE = 'ENTERPRISE_GOODS_UPDATE_FAILURE';

export const ENTERPRISE_GOODS_CREATE_REQUEST = 'ENTERPRISE_GOODS_CREATE_REQUEST';
export const ENTERPRISE_GOODS_CREATE_SUCCESS = 'ENTERPRISE_GOODS_CREATE_SUCCESS';
export const ENTERPRISE_GOODS_CREATE_FAILURE = 'ENTERPRISE_GOODS_CREATE_FAILURE';



export const ENTERPRISE_GOODS_DELETE_REQUEST = 'ENTERPRISE_GOODS_DELETE_REQUEST';
export const ENTERPRISE_GOODS_DELETE_SUCCESS = 'ENTERPRISE_GOODS_DELETE_SUCCESS';
export const ENTERPRISE_GOODS_DELETE_FAILURE = 'ENTERPRISE_GOODS_DELETE_FAILURE';




function goods_failure(payload) {
    return {
        type: ENTERPRISE_GOODS_FAILURE,
        payload
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
    return (dispatch, getState) => {
        const {list,item} = getState().enterprise.goods;
        // 商品信息不全无法直接用列表李的商品信息
        // const goods = list.data && list.data.find(item => item.goodsId == id);
        // if (goods) {
        //     return dispatch(goods_success({data:goods}));
        // }

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





function goods_list_failure(payload) {
    return {
        type: ENTERPRISE_GOODS_LIST_FAILURE,
        payload
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




function goods_update_failure(payload) {
    return {
        type: ENTERPRISE_GOODS_UPDATE_FAILURE,
        payload
    };
}

function goods_update_request(payload) {
    return {
        type: ENTERPRISE_GOODS_UPDATE_REQUEST,
        payload
    };
}

function goods_update_success(json) {
    return {
        type: ENTERPRISE_GOODS_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function updateGoodsById(id ,data) {
    return (dispatch, getState) => {
        dispatch(goods_update_request(id));
        return fetch('/api/goods/' + id,{
            method:'PUT',
            data:data
        })
            .then((json) => {
                dispatch(goods_update_success(json));
            }).catch(error => {
                dispatch(goods_update_failure(error))
            });
    };
}




function goods_create_failure(payload) {
    return {
        type: ENTERPRISE_GOODS_CREATE_FAILURE,
        payload
    };
}

function goods_create_request(payload) {
    return {
        type: ENTERPRISE_GOODS_CREATE_REQUEST,
        payload
    };
}

function goods_create_success(json) {
    return {
        type: ENTERPRISE_GOODS_CREATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function createGoods(payload) {
    return (dispatch, getState) => {
        dispatch(goods_create_request());
        return fetch('/api/goods/',{
            method:'POST',
            data:payload
        })
            .then((json) => {
                dispatch(goods_create_success(json));
            }).catch(error => {
                dispatch(goods_create_failure(error))
            });
    };
}


function goods_delete_failure(payload) {
    return {
        type: ENTERPRISE_GOODS_DELETE_FAILURE,
        payload
    };
}

function goods_delete_request(payload) {
    return {
        type: ENTERPRISE_GOODS_DELETE_REQUEST,
        payload
    };
}

function goods_delete_success(json) {
    return {
        type: ENTERPRISE_GOODS_DELETE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function deleteGoodsById(id) {
    return (dispatch, getState) => {
        dispatch(goods_delete_request());
        return fetch('/api/goods/'+id,{
            method:'DELETE',
        })
            .then((json) => {
                dispatch(goods_delete_success(json));
            }).catch(error => {
                dispatch(goods_delete_failure(error))
            });
    };
}

