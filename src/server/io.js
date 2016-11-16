/**
 * Created by zhangbohan on 16/10/27.
 */
import koa from 'koa.io';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

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

// router for socket event
app.io.route('get orders', function* () {
    // we tell the client to execute 'new message'
    var message = this.args[0];
    console.log('get orders',message);
    this.emit('login', message);
});


router.post('/order/new',function *(data) {
    console.log('new',this.request.body);
    app.io.sockets.emit('new message', [{
        a:1
    }]);
    this.body = this.request.body;
})

app.use(router.routes());


export default app;
