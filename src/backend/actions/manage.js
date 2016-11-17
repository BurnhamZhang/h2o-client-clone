/**
 * Created by zhangbohan on 16/11/17.
 */


import io from 'socket.io-client';
import {getStore} from '../index';

export const MANAGE_LOGIN = 'MANAGE_LOGIN';
export const MANAGE_LEAVE = 'MANAGE_LEAVE';
export const MANAGE_RECEIVE_ORDERS = 'MANAGE_RECEIVE_ORDERS';

console.log('io',io)
const socket = io();
console.log('socket',socket);

socket.on('connect', function() {
    console.log("与服务器联通");
});
socket.on('disconnect', function() {
    console.log("与服务器断开");
});


socket.on('new message',function (data) {
    console.warn('new message',data);
})


socket.on('receive orders',function (data) {
    console.warn('receive orders',data)
    getStore().dispatch(receive_orders(data.response));
})




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


function receive_orders(payload) {
    return {
        type: MANAGE_RECEIVE_ORDERS,
        payload
    };
}