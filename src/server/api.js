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

router.post('*',function *(data) {
    console.log('post',this.request.body);
    this.body = this.request.body;
})

app.use(router.routes());




export default app;







// Routes






