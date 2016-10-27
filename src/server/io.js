/**
 * Created by zhangbohan on 16/10/27.
 */
import koa from 'koa.io';
import Router from 'koa-router';

const  app = koa();

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
    this.broadcast.emit('new message', message);
});

// router for socket event
app.io.route('get message', function* () {
    // we tell the client to execute 'new message'
    var message = this.args[0];
    console.log('message',message);
    this.broadcast.emit('new message', message);
});


router.post('/order/new',function *(data) {
    console.log('broadcast',this.broadcast);
    this.body = this.request.body;
})


app.use(router.routes());


export default app;
