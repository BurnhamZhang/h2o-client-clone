/**
 * Created by zhangbohan on 16/11/17.
 */


import {getStore} from '../index';

export const MANAGE_LOGIN = 'MANAGE_LOGIN';
export const MANAGE_LEAVE = 'MANAGE_LEAVE';
export const MANAGE_RECEIVE_ORDERS = 'MANAGE_RECEIVE_ORDERS';






function manage_login_success(payload) {
    return {
        type: MANAGE_LOGIN,
        payload
    };
}



export function manage_login() {
    return (dispatch, getState) => {
        const token = getState().user.data.token;
        socket.emit('login',{
            token:token
        })

        console.warn('manage_login_success')
        dispatch(manage_login_success())
    };
}


export function get_orders() {
    socket.emit('get orders')
}

function receive_orders(payload) {
    return {
        type: MANAGE_RECEIVE_ORDERS,
        payload
    };
}