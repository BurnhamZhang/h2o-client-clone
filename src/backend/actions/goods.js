import fetch from '../common/fetch';

export const GOODS_REQUEST = 'GOODS_REQUEST';
export const GOODS_SUCCESS = 'GOODS_SUCCESS';
export const GOODS_FAILURE = 'GOODS_FAILURE';


export const GOODS_LIST_REQUEST = 'GOODS_LIST_REQUEST';
export const GOODS_LIST_SUCCESS = 'GOODS_LIST_SUCCESS';
export const GOODS_LIST_FAILURE = 'GOODS_LIST_FAILURE';




export const GOODS_UPDATE_REQUEST = 'GOODS_UPDATE_REQUEST';
export const GOODS_UPDATE_SUCCESS = 'GOODS_UPDATE_SUCCESS';
export const GOODS_UPDATE_FAILURE = 'GOODS_UPDATE_FAILURE';

export const GOODS_CREATE_REQUEST = 'GOODS_CREATE_REQUEST';
export const GOODS_CREATE_SUCCESS = 'GOODS_CREATE_SUCCESS';
export const GOODS_CREATE_FAILURE = 'GOODS_CREATE_FAILURE';



export const GOODS_DELETE_REQUEST = 'GOODS_DELETE_REQUEST';
export const GOODS_DELETE_SUCCESS = 'GOODS_DELETE_SUCCESS';
export const GOODS_DELETE_FAILURE = 'GOODS_DELETE_FAILURE';



export const AVAILABLE_GOODS_LIST_REQUEST = 'AVAILABLE_GOODS_LIST_REQUEST';
export const AVAILABLE_GOODS_LIST_SUCCESS = 'AVAILABLE_GOODS_LIST_SUCCESS';
export const AVAILABLE_GOODS_LIST_FAILURE = 'AVAILABLE_GOODS_LIST_FAILURE';


//商品详情


function goods_failure(payload) {
    return {
        type: GOODS_FAILURE,
        payload
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
        return fetch('/api/shop/goods/' + data)
            .then((json) => {
                dispatch(goods_success(json));
            }).catch(error => {
                dispatch(goods_failure(error))
            });
    };
}


export function fetchGoodsIfNeeded(id) {

    return (dispatch, getState) => {
        const {list,item} = getState().goods;
        // 跳过选取列表中的商品
        // const goods = list.data && list.data.find(item => item.goodsId == id);
        // if (goods) {
        //     return dispatch(goods_success({data:goods}));
        // }

        if (id != 'create' && shouldFetchData(item)) {
            return dispatch(fetchGoods(id));
        }
        else {
            return dispatch(goods_success({
                data:null
            }));
        }
    };
}


function shouldFetchData(goods) {
    if (goods.isFetching) {
        return false;
    }
    return true;
}


//商品列表



function goods_list_failure(payload) {
    return {
        type: GOODS_LIST_FAILURE,
        payload
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
        return fetch('/api/shop/goods', {
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
    const {list} = state.goods;
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

//编辑商品


function goods_update_failure(payload) {
    return {
        type: GOODS_UPDATE_FAILURE,
        payload
    };
}

function goods_update_request(payload) {
    return {
        type: GOODS_UPDATE_REQUEST,
        payload
    };
}

function goods_update_success(json) {
    return {
        type: GOODS_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function updateGoodsById(id ,data) {
    return (dispatch, getState) => {
        dispatch(goods_update_request(id));
        return fetch('/api/shop/goods/' + id,{
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


//新建商品

function goods_create_failure(payload) {
    return {
        type: GOODS_CREATE_FAILURE,
        payload
    };
}

function goods_create_request(payload) {
    return {
        type: GOODS_CREATE_REQUEST,
        payload
    };
}

function goods_create_success(json) {
    return {
        type: GOODS_CREATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function createGoods(payload) {
    return (dispatch, getState) => {
        dispatch(goods_create_request());
        return fetch('/api/shop/goods',{
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

//删除商品
function goods_delete_failure(payload) {
    return {
        type: GOODS_DELETE_FAILURE,
        payload
    };
}

function goods_delete_request(payload) {
    return {
        type: GOODS_DELETE_REQUEST,
        payload
    };
}

function goods_delete_success(json) {
    return {
        type: GOODS_DELETE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function deleteGoodsById(id) {
    return (dispatch, getState) => {
        dispatch(goods_delete_request());
        return fetch('/api/shop/goods/'+id,{
            method:'DELETE',
        })
            .then((json) => {
                dispatch(goods_delete_success(json));
            }).catch(error => {
                dispatch(goods_delete_failure(error))
            });
    };
}


//门店可选商品

function available_goods_list_failure() {
    return {
        type: AVAILABLE_GOODS_LIST_FAILURE,
    };
}

function available_goods_list_request(payload) {
    return {
        type: AVAILABLE_GOODS_LIST_REQUEST,
        payload
    };
}

function available_goods_list_success(json) {
    return {
        type: AVAILABLE_GOODS_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchAvailableGoodsList() {
    return dispatch => {
        dispatch(available_goods_list_request());
        return fetch('/api/shop/canadd/goods')
            .then((json) => {
                dispatch(available_goods_list_success(json));
            }).catch(error => {
                dispatch(available_goods_list_failure(error))
            });
    };
}


function shouldFetchAvailableGoodsList(state) {
    const {available} = state.goods;
    if (available.isFetching) {
        return false;
    }
    return true;
}


export function fetchAvailableGoodsListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchAvailableGoodsList(getState())) {
            return dispatch(fetchAvailableGoodsList(data));
        }
    };
}
