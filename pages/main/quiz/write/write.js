import { dB } from '../../../../db/dB.js';
import { dBPro } from '../../../../db/dBPro.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var answerId = options.id;
    this.dbpro = new dBPro(answerId);
    this.hotData = this.dbpro.getProblemItemById().data;
    var answers = this.dbpro.getAnswerData();
    this.setData({
      hot: this.hotData,
      answers: answers
    })
  },

  onShow: function (event) {
    this.setData({
      hot: this.hotData
    })
  },

  detailInput: function (event) {
    this.setData({
      answerDetail: event.detail.value
    })
  },

  //跳转到回答界面
  onAnswerJump: function (event) {
    var answerTitle = this.hotData.title;

    //异步写入缓存
    wx.setStorage({
      key: 'newAnswerTwo',
      data: {
        "answerTitleTwo": this.hotData.title,
        "answerDetailTwo": this.data.answerDetail,

      }
    }),

      wx.navigateBack({
        url: '',
        success: function () {
          console.log('Jump success'),
            console.log(answerTitle)
        },
        fail: function () {
          console.log('Jump fail')
        },
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})