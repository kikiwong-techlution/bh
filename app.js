//app.js
var dataObj = require("data/answer.js")
App({
  onLaunch: function () {
    //设置数据缓存
    // var storageData=wx.getStorageSync('commendList');
    // if(!storageData){
    //   //如果commendList缓存不存在
    //   var dataObj=require("data/answer.js");
    //   wx.clearStorageSync();
    //   wx.setStorageSync('commendList', 'dataObj.commendList');
    // }
    wx.setStorageSync('commendList', dataObj.commendList);
    wx.setStorageSync('hotList', dataObj.hotList);
    wx.setStorageSync('musicList', dataObj.musicList);
    

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight:wx.getSystemInfoSync()['statusBarHeight'],
    g_isPlayingMusic:false,
    g_currentMusicId:null
  }
})