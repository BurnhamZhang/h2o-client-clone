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
    if (!this.body.code) {
        this.body = wrapper(this.body)
    }
});


router.get('/order', function *() {
    var data = [];
    let pageSize = this.request.body.pageSize || 20;
    let pageNum = this.request.body.pageNum || 1;
    for (var i = 0; i < pageSize; i++) {
        data.push({
            id: i + 1,
            amount: Math.ceil(Math.random() * 4343),
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


router.get('/goods', function *() {
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

router.get('/courier', function *() {
    var data = [];
    let pageSize = this.request.body.pageSize || 20;
    let pageNum = this.request.body.pageNum || 1;
    for (var i = 0; i < pageSize; i++) {
        data.push({
            id: Math.floor(Math.random() * 10000),
            name: '名称' + Math.random().toString(36).substr(20),
            image: 'http://temp.im/144x144/FF9500/000',
            account: '账号' + Math.random().toString(36).substr(20),
            password: '名称' + Math.random().toString(36).substr(20),
            phone: 1 + Math.floor(Math.random() * 9999999999),
            status: Math.floor(Math.random() * 3) + '',
            region: {
                streetId: '1', streetName: "航空路"
            }
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


router.get('/courier/:id', function *() {
    const id = this.params.id;
    this.body = {
        id: id || Math.floor(Math.random() * 10000),
        name: '名称' + Math.random().toString(36).substr(20),
        password: '名称' + Math.random().toString(36).substr(20),
        image: 'http://temp.im/144x144/FF9500/000',
        account: '账号' + Math.random().toString(36).substr(20),
        phone: 1 + Math.floor(Math.random() * 9999999999),
        status: Math.floor(Math.random() * 3) + '',
        region: {
            streetId: '1', streetName: "航空路"
        }
    }
})


/**
 * id    门店id
 * showName    对外显示门店名称
 * geo    地址（经纬度）
 * location    地址（到街道）
 * hourseNumber    地址（到门牌号）
 * status    账号状态 1-正常营业，0-停止营业
 * phone    门店电话
 * deliveryStart    配送时段,开始
 * deliveryEnd    配送时段,结束
 * deliveryType    "1-非配送时段允许下单，0-非配送时段不允许下单"
 * shopRegions  对象集合 []
 * shopRegions.id    门店区域id
 * shopRegions.streetId    配送街道id
 * shopRegions.streetName    街道名称
 */

router.get('/shop', function *() {
    this.body = {
        id: Math.floor(Math.random() * 10000),
        showName: '名称' + Math.random().toString(36).substr(20),
        geo: '经纬度' + Math.random().toString(36).substr(20),
        location: '地址' + Math.random().toString(36).substr(20),
        hourseNumber: '账号' + Math.random().toString(36).substr(20),
        status: Math.floor(Math.random() * 2) + '',
        phone: 1 + Math.floor(Math.random() * 9999999999),
        complainPhone: 1 + Math.floor(Math.random() * 9999999999),
        deliveryStart: '10:23:23',
        deliveryEnd: '15:00:00',
        deliveryType: Math.floor(Math.random() * 2) + '',
        shopRegions: [{
            streetId: '1', streetName: "航空路"
        }, {
            streetId: '2', streetName: "xxx"
        }, {
            streetId: '3', streetName: "dddd"
        }]
    }
})

/**
 *
 * id    门店账号ID
 * shopName    门店名
 * leader    负责人
 * phone    联系方式
 * account    账号
 * status    账号状态（1-正常，0-停用）

 */

router.get('/shop/account', function *() {
    var data = [];
    let pageSize = this.request.body.pageSize || 20;
    let pageNum = this.request.body.pageNum || 1;
    for (var i = 0; i < pageSize; i++) {
        data.push({
            id: Math.floor(Math.random() * 10000),
            shopName: '门店名' + Math.random().toString(36).substr(20),
            leader: '负责人' + Math.random().toString(36).substr(20),
            account: '账号' + Math.random().toString(36).substr(20),
            phone: 1 + Math.floor(Math.random() * 9999999999),
            status: Math.floor(Math.random() * 2) + '',
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


/**
 *
 * id    门店账号ID
 * shopName    门店名
 * leader    负责人
 * phone    联系方式
 * account    账号
 * status    账号状态（1-正常，0-停用）

 */

router.get('/shop/account/:id', function *() {
    const id = this.params.id;
    this.body = {
        id: id || Math.floor(Math.random() * 10000),
        shopName: '门店名' + Math.random().toString(36).substr(20),
        leader: '负责人' + Math.random().toString(36).substr(20),
        account: '账号' + Math.random().toString(36).substr(20),
        phone: 1 + Math.floor(Math.random() * 9999999999),
        status: Math.floor(Math.random() * 2) + '',
    }
})

router.post('/upload', function *() {
    this.body = {
        url: 'http://temp.im/144x144/FF9500/000'
    }
})

router.get('/courier/street', function *() {
    var data = [];
    for (var i = 0; i < 15; i++) {
        data.push({
            streetName: '名称' + Math.random().toString(36).substr(20),
            streetId: i + '',
        })
    }
    this.body = data;
})


router.post('*', function *(data) {
    console.log('post', this.request.body);
    this.body = this.request.body;
})

app.use(router.routes());


export default app;


// Routes






