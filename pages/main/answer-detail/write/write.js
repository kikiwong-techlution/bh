// pages/main/answer-detail/write/write.js
//var db = require("../../db/dB.js").db;
import { dB } from '../../../../db/dB.js';
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
    this.db = new dB(answerId);
    this.commendData = this.db.getAnswerItemById().data;
    this.setData({
      commend: this.commendData,
    })
  },

  onShow:function(event){
    this.setData({
      commend:this.commendData
    })
  },

  detailInput: function (event) {
    this.setData({
      answerDetail: event.detail.value
    })
  },

  //跳转到回答界面
  onAnswerJump:function(event){
    var answerTitle=this.commendData.title;
    
    //异步写入缓存
    wx.setStorage({
      key: 'newAnswer',
      data: {
        "answerTitle": this.commendData.title,
        "answerDetail": this.data.answerDetail,

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

 

})