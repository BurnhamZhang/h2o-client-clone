import fetch from '../common/fetch';

export const CART_UPDATE_GOODS = 'CART_UPDATE_GOODS';
export const CART_ADD_GOODS = 'CART_ADD_GOODS';
export const CART_DELETE_GOODS = 'CART_DELETE_GOODS';
export const CART_UPDATE_GOODS_CHECKED = 'CART_UPDATE_GOODS_CHECKED';


export const CART_UPDATE_REQUEST = 'CART_UPDATE_REQUEST';
export const CART_UPDATE_SUCCESS = 'CART_UPDATE_SUCCESS';
export const CART_UPDATE_FAILURE = 'CART_UPDATE_FAILURE';


export function cartUpdateGoods(payload) {
    return {
        type: CART_UPDATE_GOODS,
        payload
    };
}

export function cartUpdateGoodsChecked(payload) {
    return {
        type: CART_UPDATE_GOODS_CHECKED,
        payload
    };
}


export function cartDeleteGoods(payload) {
    return {
        type: CART_DELETE_GOODS,
        payload
    };
}


export function cartAddGoods(payload) {
    return {
        type: CART_ADD_GOODS,
        payload
    };
}


//获取最新商品状态


function cart_update_failure(payload) {
    return {
        type: CART_UPDATE_FAILURE,
        payload
    };
}

function cart_update_request(payload) {
    return {
        type: CART_UPDATE_REQUEST,
        payload
    };
}

function cart_update_success(json) {
    return {
        type: CART_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function updateCart() {
    return (dispatch, getState) => {
        const state = getState();
        const shopId = state.shop.data[0];
        const goodsIdArray = state.cart.data.map(item=>item.goodsId);
        dispatch(cart_update_request());
        return fetch(`/api/user/cart/goods/${shopId}`,{
            data:{
                goodsIdArray
            }
        })
            .then((json) => {
                dispatch(cart_update_success(json));
            }).catch(error => {
                dispatch(cart_update_failure(error))
            });
    };
}