// pages/main/quiz/problem/problem.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',    //搜索内容
    pageShow: true,
    searchPanelShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var proId = options.proId;
    console.log("id=" + proId);
    var title=options.title;
    var problem_des=options.detail;
    this.setData({
      title:title,
      problem_des:problem_des
    })
  },

  onUnload:function(){
    wx.reLaunch({
      url: '/pages/home/home',   
    })
  },

  /*搜索框切换面板*/
  onBindFocus: function (event) {

    this.setData({
      pageShow: false,
      searchPanelShow: true
    })
  },

  /*隐藏搜索面板 */
  onCancelImgTap: function (event) {

    this.setData({
      pageShow: true,
      searchPanelShow: false,
      inputValue: '',

    })
  },
})