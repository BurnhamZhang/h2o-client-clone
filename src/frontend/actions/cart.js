import fetch from '../common/fetch';

export const CART_UPDATE_GOODS = 'CART_UPDATE_GOODS';
export const CART_ADD_GOODS = 'CART_ADD_GOODS';
export const CART_DELETE_GOODS = 'CART_DELETE_GOODS';





export function cartUpdateGoods(payload) {
    return {
        type: CART_UPDATE_GOODS,
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
