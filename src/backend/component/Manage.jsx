import React from 'react';
import {Menu, Breadcrumb, Icon,Button} from 'antd';
import {Link} from 'react-router';
import io from 'socket.io-client';

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


socket.on('login',function (data) {
    console.warn('login',data);
})


class Manage extends React.Component {

    onClick(){


        let a = socket.emit('get orders', {
            test:1,
            name:'dsd'
        },function () {
            console.log('callback',arguments)
        });
        console.log('get orders',{
            test:1,
            name:'dsd'
        },a)
    }
    render() {
        return (
            <div className="ant-layout-content">
                <Button onClick={this.onClick}>发送</Button>
                Manage
            </div>
        )
    }
}


export default Manage;
