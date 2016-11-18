/**
 * Created by zhangbohan on 16/10/27.
 */
import koa from 'koa.io';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import proxy from './proxy';
const  app = koa();
app.use(bodyParser());
const router = new Router();


// middleware for socket.io's connect and disconnect
app.io.use(function* (next) {
    // on connect
    console.log('somebody connected');
    yield* next;
    // on disconnect
    console.log('somebody disconnect');

});

// router for socket event
app.io.route('new message', function* () {
    // we tell the client to execute 'new message'
    var message = this.args[0];
    this.emit('new message', message);
});


app.io.route('get orders', function* () {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    console.log('token',this.token)
    if (this.token) {
        headers.token = this.token
    }

    proxy('/order/overtime?pageSize=1&pageNum=999999',{
        method:'GET',
        headers:headers
    }).then((data)=>{
        this.emit('receive orders',data);
    })

});



app.io.route('login', function* (a,b,c) {
    console.log('login',b)
    this.token = b.token;


    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    if (this.token) {
        headers.token = this.token
    }

    proxy('/order/overtime?pageSize=1&pageNum=999999',{
        method:'GET',
        headers:headers
    }).then((data)=>{
        this.emit('receive orders',data);
    })

});

router.post('/order/new',function *(data) {
    console.log('new',this.request.body);
    app.io.sockets.emit('new message', this.request.body);
    this.body = this.request.body;
})

app.use(router.routes());


export default app;
