// pages/main/answer-detail/problem-detail/problem-detail.js
import { dB } from '../../../../db/dB.js';
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
    var answerId = options.id;
    console.log(answerId);
    this.db = new dB(answerId);
    var answers = this.db.getAllanswerData();
    this.commendData = this.db.getAnswerItemById().data;
    this.setData({
      answers: answers,
      commend:this.commendData
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

  //写回答
  onTabToWrite: function (event) {
    var answerId = event.currentTarget.dataset.answerId;
    console.log("answerId=" + answerId);
    wx.navigateTo({
      url: '../write/write?id=' + answerId,
    })
  },

  onaddProTap: function (event) {
    var newData = this.db.addPro();
    //交互反馈
    wx.showToast({
      title: newData.addProStatus ? "关注问题成功" : "取消关注",
      duration: 700,
      icon: "success",
      mask: true
    })
    //重新绑定数据，注意不要将整个newData全部作为setData的参数
    this.setData({
      'commend.addProStatus': newData.addProStatus
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})