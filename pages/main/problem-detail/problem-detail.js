// pages/main/problem-detail/problem-detail.js
import { dB } from '../../../db/dB.js';
import { dBPro } from '../../../db/dBPro.js';
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
    var hotId = options.id;
    this.dbpro = new dBPro(hotId);
    this.hotData = this.dbpro.getProblemItemById().data;
    var answers = this.dbpro.getAnswerData();
    this.setData({
      hot: this.hotData,
      answers: answers
    })
    
  },

  onShow:function(event){
    
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

  onaddProTap: function (event) {
    var newData = this.dbpro.addPro();
    //交互反馈
    wx.showToast({
      title: newData.addProStatus ? "关注成功" : "取消关注",
      duration: 700,
      icon: "success",
      mask: true
    })
    //重新绑定数据，注意不要将整个newData全部作为setData的参数
    this.setData({
      'hot.addProStatus': newData.addProStatus
    })
  },

  //跳转到“写回答”
  onTabToWrite: function (event) {
    var answerId = event.currentTarget.dataset.hotId;
    console.log("answerId=" + answerId);
    wx.navigateTo({
      url: '../problem-detail/write/write?id=' + answerId,
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})