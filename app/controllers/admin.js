const moment = require('moment')
const crypto = require('crypto');


const STATUS_ON = 1;
const STATUS_OFF = 0


var admin = {
  session_key: "polpol1234", // session 钥匙
  // 检查后台session有效 否则重定向
  checkSession: (ctx) => {
    if(ctx.session.session_key !== admin.session_key) {
        ctx.response.redirect('/admin/login')
        return false
    }
    return true
  },

  // 后台登录页面 Page
  loginPage: (ctx) => {
    // 检查session 如果是登录状态直接进入后台管理页面
    if (ctx.session.session_key === admin.session_key && ctx.session.admin) {
      return ctx.response.redirect('/admin/index')
    }

    return ctx.render('admin/login', {
        title: '登录'
    })
  },

  // 登录请求 API
  login: async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    // 查找出用户
    let adminModel = await ctx.orm().admin.findOne({
      where: {
        username: username,
        status: STATUS_ON
      }
    })
    if(!adminModel) {
      return ctx.returnFail("用户名或密码错误", 1)
    }
    // 验证密码
    if (password !== adminModel.password) {
      return ctx.returnFail("用户名或密码错误", 1)
    }
    ctx.session.session_key = admin.session_key // 写入key
    ctx.session.admin = adminModel.dataValues // 写入session数据
    ctx.returnSuccess()
  },

  // 退出登录 Page
  logout:  (ctx) => {
    delete ctx.session.session_key;
    delete ctx.session.admin;
    return ctx.response.redirect('/admin/login')
  },

  // 后台管理首页 Page
  index: async (ctx) => {
    admin.checkSession(ctx)
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
  // 后台博客页面 Page
  blog: async (ctx) => {
    admin.checkSession(ctx)
    return await ctx.render('admin/blog', {
        title: '日志管理',
        tabIndex: 1
    })
  },
  // 后台文章编辑页面 Page
  article: async (ctx) => {
    admin.checkSession(ctx)
    let id = ctx.params.id;

    let article_category = await admin.article_category(ctx)
    // 判断是否带有参数
    if(id) {
      let article = await ctx.orm().article.findOne({
        where: {
          id: id
        }
      })
      // 找到该文章
      if(article) {
        // 编辑文章
        return await ctx.render('admin/article/update', {
          title: '写日志',
          tabIndex: -1,
          article_category: article_category,
          article: article
        })
      } else {
        // 重定向到 文章找不到页面
        return await ctx.render('admin/article/error', {
          title: '写日志',
          tabIndex: -1
        })
      }
    } else {
      // 新建文章
      return await ctx.render('admin/article/create', {
        title: '写日志',
        tabIndex: -1,
        article_category: article_category
      })
    }
  },
  // 文章类别
  article_category: async (ctx) => {
    return await ctx.orm().article_category.findAll()
  },

  // 创建文章
  create_article: async (ctx) => {
    console.log(ctx.request.body)
  },
  // 更新文章
  update_article: async (ctx) => {
    let id = ctx.params.id;
    let new_article = ctx.request.body
    if (!id) {
      return ctx.returnFail("找不到对应文章", 1)
    }

    let article = await ctx.orm().article.findOne({
      where: {
        id: id
      }
    })

    if(!article) {
      return ctx.returnFail("找不到对应文章", 1)
    }

    // 修改文章
    article.title = new_article.title
    article.intro = new_article.intro
    article.content = new_article.content
    article.category_id = new_article.category_id
    article.status = new_article.status
    article.update_at = new_article.create_at
    article.update()
    return ctx.returnSuccess()
  }
}

module.exports = admin