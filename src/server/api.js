'use strict';

import koa from 'koa';
import Router from 'koa-router';




const app = koa();

const router = new Router();


router.post('/order',function *() {
    var data = [];
    let pageSize  = this.request.body.pageSize ||20;
    let current = this.request.body.current || 1;
    for(var i = 0;i<pageSize;i++){
        data.push({
            amount: i+1 ,
            time: '2016.10.28 13:15:30',
            address: '青羊区桐梓琳街区新希望路6号丰德万瑞中心15楼105/刘德华/18600000000',
            price: '16.00',
            status: ['待支付','已取消','申请取消'][Math.floor(Math.random()*3)]
        })
    }

    console.log(this.request.body);
    this.body = {
        data : data,
        total:264,
        pageSize,
        current
    }
})



router.post('/goods',function *() {
    var data = [];
    let pageSize  = this.request.body.pageSize ||20;
    let current = this.request.body.current || 1;
    for(var i = 0;i<pageSize;i++){
        data.push({
            goodsId:Math.floor(Math.random()*10000),
            name:'名称'+Math.random().toString(36).substr(20),
            images:['http://temp.im/144x144/FF9500/000','http://temp.im/144x144/FF9500/000'],
            memo:'描述介绍'+Math.random().toString(36).substr(2),
            price: (Math.random()*100).toFixed(2),
            scale: ['10L','15L','20L','400ML','300ML','500ML'][Math.floor(Math.random()*6)],
            stock: Math.floor(Math.random()*10000),
            depositType:Math.floor(Math.random()*2),
            depositMoney:(Math.random()*100).toFixed(2),
            shelves:Math.floor(Math.random()*2)
        })
    }

    console.log(this.request.body);
    this.body = {
        data : data,
        total:264,
        pageSize,
        current
    }
})


router.get('/goods/:id',function *() {
    console.log(this.params.id);
    const id = this.params.id;
    this.body = {
        goodsId:id||Math.floor(Math.random()*10000),
        name:'名称'+Math.random().toString(36).substr(20),
        images:['http://temp.im/144x144/FF9500/000','http://temp.im/144x144/FF9500/000'],
        memo:'描述介绍'+Math.random().toString(36).substr(2),
        price: (Math.random()*100).toFixed(2),
        scale: ['10L','15L','20L','400ML','300ML','500ML'][Math.floor(Math.random()*6)],
        stock: Math.floor(Math.random()*10000),
        depositType:Math.floor(Math.random()*2),
        depositMoney:(Math.random()*100).toFixed(2),
        shelves:Math.floor(Math.random()*2)
    }
})

router.post('*',function *(data) {
    console.log('post',this.request.body);
    this.body = this.request.body;
})

app.use(router.routes());




export default app;







// Routes






