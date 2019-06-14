const moment = require('moment')
var admin = {
  session_key: "polpol1234", // session 钥匙
  // 检查后台session有效 否则重定向
  checkSession: (ctx) => {
    if(ctx.session.key !== admin.session_key) {
        ctx.response.redirect('/admin/login')
        return false
    }
    return true
  },

  // 后台登录页面
  loginPage: (ctx) => {
    return ctx.render('admin/login', {
        title: '登录'
    })
  },

  // 登录请求 API
  login: (ctx) => {
    console.log(ctx.request.body)
    let username = ctx.request;
    ctx.return = {
      code: 0,
      message: "OK"
    }
  },

  // 后台管理首页
  index: async (ctx) => {
    // admin.checkSession(ctx)
    let page = 1;
    let page_size = 10;
    let article_list =  await ctx.orm().article.findAll({
      order: [["create_at", "DESC"]],
      offset: (page-1) * page_size,
      limit: page_size,
      // raw: true
    })
    return ctx.render('admin/index', {
        title: '后台管理',
        tabIndex: 0,
        article_list: article_list
    })
  },
  // 后台博客页面
  blog: async (ctx) => {
    admin.checkSession(ctx)
    return await ctx.render('admin/blog', {
        title: '日志管理',
        tabIndex: 1
    })
  },
  article: async (ctx) => {
    // admin.checkSession(ctx)
    return await ctx.render('admin/article', {
        title: '文章',
        tabIndex: 1
    })
  }
}

module.exports = admin