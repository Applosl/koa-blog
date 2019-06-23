const Router = require('koa-router')
const admin = require('../app/controllers/admin')
var router = new Router()
router
.get('/login', admin.loginPage)
.post('/login', admin.login)
.get('/logout', admin.logout)
.get('/index', admin.index)
.get('/blog', admin.blog)
.get('/article', admin.article)
.get('/article/:id', admin.article)
.post('/article', admin.create_article)
.post('/article/:id', admin.update_article)

module.exports = {
  admin: router
}