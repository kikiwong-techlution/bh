// pages/login/login.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
  },

  //事件处理事件
  bindViewTap: function () {
    wx.switchTab({
      url:'../main/main'
    })
  },

  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }else if(this.data.canIUse){
      //由于getUserInfo是网络请求，可能会在page.load之后才会返回
      //所以此处加入callback以防止这种情况
      app.userInfoReadyCallback=res =>{
        this.setData({
          userInfo:res.userInfo,
          hasUserInfo:true
        })
      }
    }else{
      //在没有open-type-getUserInfo版本的兼容处理
      wx.getUserInfo({
        success:res =>{
          app.globalData.userInfo=res.userInfo
          this.setData({
            userInfo:res.userInfo,
            hasUserInfo:true
          })
        }
      })
    }
  },

  getUserInfo:function(e){
    console.log(e)
    app.globalData.userInfo=e.detail.userInfo
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo:true
    })
  }
  
})