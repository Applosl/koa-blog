const Router = require('koa-router')
const admin = require('../app/controllers/admin')
var router = new Router()
router
.get('/login', admin.loginPage)
.post('/login', admin.login)
.get('/index', admin.index)
.get('/blog', admin.blog)
.get('/article', admin.article)

module.exports = {
  admin: router
}