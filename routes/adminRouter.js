const Router = require('koa-router')
var router = new Router()

var admin = {
  session_key: "polpol1234", // session 钥匙

  checkSession: (session) => {
    if(session.key !== this.session_key) {
        
    }
  },

  loginPage: async (ctx) => {
    return await ctx.render('admin/login', {
        title: '登录'
    })
  },
  // 登录请求
  login: (ctx) => {
    console.log(ctx.request)
    let username = ctx.request;
    ctx.return = {
      code: 0,
      message: "OK"
    }
  },
  index: async (ctx) => {
    return await ctx.render('admin/index', {
        title: '后台管理',
        tabIndex: 0
    })
  },
  blog: async (ctx) => {
    return await ctx.render('admin/blog', {
        title: '日志管理',
        tabIndex: 1
    })
  },
  article: async (ctx) => {
    console.log(ctx.session)
    return await ctx.render('admin/article', {
        title: '文章',
        tabIndex: 1
    })
  }
}

router
.get('/login', admin.loginPage)
.post('/login', admin.login)
.get('/index', admin.index)
.get('/blog', admin.blog)
.get('/article', admin.article)

module.exports = {
  admin: router
}