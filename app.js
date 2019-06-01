const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path')
const app = new Koa();
const router = require('./routes/router')
const session = require('koa-session');



app.keys = ['qwe8w-9f8q9-f9v7b-9w8e9-5gh42'];
const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
 };

render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
})

app.use(router.routes())
app.use(session(CONFIG, app));

app.listen(3000, () => {
    console.log('server start: localhost:3000')
});
