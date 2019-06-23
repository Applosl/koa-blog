module.exports = () => {
  function returnJson(json) {
      this.set("Content-Type", "application/json")
      this.body = JSON.stringify(json)
  }
  // 返回成功的 请求的json
  function returnSuccess(data) {
    
    let json = {
      code: 0,
      message: "success",
      data: data || ''
    }
    returnJson.bind(this)(json)
  }
  // 返回失败情况的json
  function returnFail(message, code) {
    let json = {
      code: code,
      message: message,
    }
    returnJson.bind(this)(json)
  }
  return async (ctx, next) => {
      ctx.returnJson = returnJson.bind(ctx)
      ctx.returnSuccess = returnSuccess.bind(ctx)
      ctx.returnFail = returnFail.bind(ctx)
      await next()
  }
}