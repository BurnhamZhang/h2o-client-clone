'use strict';

import koa from 'koa';
import Router from 'koa-router';


const app = koa();

const router = new Router();

const wrapper = data => ({
    code: 'A00000',
    msg: '成功',
    response: {
        "remote": "H2O1220000",
        "remoteMsg": "xxxx",
        data: data
    }
})


router.use(function *(next) {
    yield next;
    if(!this.body.code){
        this.body = wrapper(this.body)
    }
});


router.post('/order', function *() {
    var data = [];
    let pageSize = this.request.body.pageSize || 20;
    let pageNum = this.request.body.pageNum || 1;
    for (var i = 0; i < pageSize; i++) {
        data.push({
            amount: i + 1,
            time: '2016.10.28 13:15:30',
            address: '青羊区桐梓琳街区新希望路6号丰德万瑞中心15楼105/刘德华/18600000000',
            price: '16.00',
            status: ['待支付', '已取消', '申请取消'][Math.floor(Math.random() * 3)]
        })
    }

    this.body = wrapper(data);
    this.body.response.pagination = {
        pageSize,
        pageNum,
        totalCount: 243,
        pageCount: 13
    }
})


router.post('/goods', function *() {
    var data = [];
    let pageSize = this.request.body.pageSize || 20;
    let pageNum = this.request.body.pageNum || 1;
    for (var i = 0; i < pageSize; i++) {
        data.push({
            goodsId: Math.floor(Math.random() * 10000),
            name: '名称' + Math.random().toString(36).substr(20),
            images: ['http://temp.im/144x144/FF9500/000', 'http://temp.im/144x144/FF9500/000'],
            memo: '描述介绍' + Math.random().toString(36).substr(2),
            price: (Math.random() * 100).toFixed(2),
            scale: ['10L', '15L', '20L', '400ML', '300ML', '500ML'][Math.floor(Math.random() * 6)],
            stock: Math.floor(Math.random() * 10000),
            depositType: Math.floor(Math.random() * 2),
            depositMoney: (Math.random() * 100).toFixed(2),
            shelves: Math.floor(Math.random() * 2)
        })
    }

    this.body = wrapper(data);
    this.body.response.pagination = {
        pageSize,
        pageNum,
        totalCount: 243,
        pageCount: 13
    }
})


router.get('/goods/:id', function *() {
    console.log(this.params.id);
    const id = this.params.id;
    this.body = {
        goodsId: id || Math.floor(Math.random() * 10000),
        name: '名称' + Math.random().toString(36).substr(20),
        images: ['http://temp.im/144x144/FF9500/000', 'http://temp.im/144x144/FF9500/000'],
        memo: '描述介绍' + Math.random().toString(36).substr(2),
        price: (Math.random() * 100).toFixed(2),
        scale: ['10L', '15L', '20L', '400ML', '300ML', '500ML'][Math.floor(Math.random() * 6)],
        stock: Math.floor(Math.random() * 10000),
        depositType: Math.floor(Math.random() * 2),
        depositMoney: (Math.random() * 100).toFixed(2),
        shelves: Math.floor(Math.random() * 2)
    }
})

router.post('/courier', function *() {
    var data = [];
    let pageSize = this.request.body.pageSize || 20;
    let pageNum = this.request.body.pageNum || 1;
    for (var i = 0; i < pageSize; i++) {
        data.push({
            id: Math.floor(Math.random() * 10000),
            name: '名称' + Math.random().toString(36).substr(20),
            image: 'http://temp.im/144x144/FF9500/000',
            account: '账号' + Math.random().toString(36).substr(20),
            phone: 1 + Math.floor(Math.random() * 9999999999),
            status: Math.floor(Math.random() * 3)
        })
    }

    console.log(this.request.body);
    this.body = wrapper(data);
    this.body.response.pagination = {
        pageSize,
        pageNum,
        totalCount: 243,
        pageCount: 13
    }

})

router.post('*', function *(data) {
    console.log('post', this.request.body);
    this.body = this.request.body;
})

app.use(router.routes());




export default app;







// Routes






