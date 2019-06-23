'use strict';
const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path')
const router = require('./routes/router')
const session = require('koa-session');
const bodyParser = require('koa-body');
const app = new Koa();
const jsonApi = require('./middleware/jsonApi')

// 载入配置
const db_config = require('./config/DB')
const session_config = require('./config/session')

const orm = require('koa-orm')(db_config);

app.use(async (ctx, next) => {
    console.log(`Precess ${ctx.request.method} ${ctx.request.url}...`);
    var start = Date.now(),ms;
    await next();// 调用下一个中间件（等待下一个异步函数返回）
    ms = Date.now() - start;
    ctx.response.set('X-Response-Time', `${ms}ms`);
    console.log(`Response Time: ${ms}ms`);
});

app.use(bodyParser({
    multipart: true,  // 允许上传多个文件
}));

app.keys = ['qwe8w-9f8q9-f9v7b-9w8e9-5gh42'];
render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
})
app.use(session(session_config, app));
app.use(orm.middleware);
app.use(jsonApi())
app.use(router.routes())




app.listen(3000, () => {
    console.log('server start: localhost:3000')
});
