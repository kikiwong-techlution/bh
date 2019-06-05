// pages/home/home.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputValue: '',    //搜索内容
    currentTab: 0,     //tab切换
    pageShow: false,
    searchPanelShow: false,
    open: false,
    list1: [
      {
        icon: '/image/icon/notebook.png',
        name: 'notebook'
      },
      {
        icon: '/image/icon/monitor.png',
        name: 'monitor'
      },
      {
        icon: '/image/icon/checklist.png',
        name: 'checklist'
      },
      {
        icon: '/image/icon/calendar.png',
        name: 'calendar'
      },
      {
        icon: '/image/icon/talk.png',
        name: 'talk'
      },
      {
        icon: '/image/icon/group.png',
        name: 'group'
      },
      {
        icon: '/image/icon/print.png',
        name: 'print'
      },
      {
        icon: '/image/icon/setup.png',
        name: 'setup'
      }
    ]
  },

  showitem: function () {
    this.setData({
      open: !this.data.open
    })
  },


  /*搜索框切换面板*/
  onBindFocus: function (event) {

    this.setData({
      pageShow: true,
      searchPanelShow: true
    })
  },

  /*隐藏搜索面板 */
  onCancelImgTap: function (event) {

    this.setData({
      pageShow: false,
      searchPanelShow: false,
      inputValue: '',

    })
  },
  
  onLoad: function (options) {
    /*if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      //由于getUserInfo是网络请求，可能会在page.load之后才会返回
      //所以此处加入callback以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      //在没有open-type-getUserInfo版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/

    //异步读取本地缓存
    var that=this;
    wx.getStorage({
      key: 'proId',
      success: function(res) {
        
        that.setData({
          title:res.data.title,
          detail:res.data.detail,
          
        })
      },
      
    });

  
  },
  onShow:function(){
    var that=this;
    wx.getStorage({
      key: 'newAnswer',
      success: function (res) {
        
        that.setData({
          answerTitle: res.data.answerTitle,
          answerDetail: res.data.answerDetail
        })
      },
    });

    wx.getStorage({
      key: 'newAnswerTwo',
      success: function (res) {
        
        that.setData({
          answerTitleTwo: res.data.answerTitleTwo,
          answerDetailTwo: res.data.answerDetailTwo
        })
      },
    })
  },

  getUserInfo: function (event) {
    console.log(event)
    app.globalData.userInfo = event.detail.userInfo
    this.setData({
      userInfo: event.detail.userInfo,
      hasUserInfo: true
    })
  },

  /*Navtab切换 */
  switchNav: function (event) {
    const that = this;
    if (this.data.currentTab === event.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: event.target.dataset.current,
      })
    }
  },

  swiperChange: function (event) {
    this.setData({
      currentTab: event.detail.current,
    })
  },

  onProblemJump:function(event){
    wx.navigateTo({
      url: '../main/quiz/problem/problem?title=' + this.data.title
        + '&detail=' + this.data.detail,
      success: function () {
        console.log('Jump success')
      },
      fail: function () {
        console.log('Jump fail')
      },
    })
  },

  
})