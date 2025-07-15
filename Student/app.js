// app.js111
// app.js 是小程序的入口文件，用于定义小程序的全局逻辑，如生命周期、全局数据等。
App({
  // onLaunch 生命周期回调：当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch() {
    // 获取并展示本地存储中的日志信息
    // wx.getStorageSync('logs')：从本地缓存中同步获取指定 key 的内容
    const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())：将当前时间戳添加到 logs 数组的开头
    logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)：将更新后的 logs 数组同步设置到本地缓存
    wx.setStorageSync('logs', logs)

    // 微信登录：调用接口获取登录凭证（code）
    wx.login({
      // 接口调用成功的回调函数
      success: res => {
        // res.code 是用户登录凭证（有效期五分钟）。
        // 开发者需要在自己的服务器后台凭此 code 换取 openId, sessionKey, unionId。
        // 这里的注释提示了后续需要将 code 发送到后端进行用户身份验证和信息获取。
      }
    })
  },
  // globalData：定义小程序的全局数据，可以在小程序的任何页面中访问和修改。
  globalData: {
    userInfo: null // 用户信息，初始设置为 null，通常在用户登录后获取并设置。
  }
})
