const Router = require('koa-router')
const {admin} = require('./adminRouter')
const {user} = require('./userRouter')
const {api} = require('./apiRouter')
var router = new Router()

router.use('/', user.routes())
router.use('/admin', admin.routes())
router.use('/api', api.routes())

module.exports = router
