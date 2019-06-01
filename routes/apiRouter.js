const Router = require('koa-router')
var router = new Router()

// var home = {
//   // 首页
//   index: async (ctx) => {
//     let title = "首页";
//     let year = (new Date()).getFullYear()
//     return await ctx.render('index', {
//         title: title,
//         year: year
//     })
//   },
// }

// router
// .get('/', home.login)

module.exports = {
  api: router
}