// pages/main/answer-detail/answer-detail.js
import { dB } from '../../../db/dB.js';
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
    this.answerId=options.id;
    this.db=new dB(this.answerId);
    this.commendData = this.db.getAnswerItemById().data;
    
    this.setData({
      commend:this.commendData,
    })
  },

  onShow:function(event){
    this.db = new dB(this.answerId);
    this.commendData = this.db.getAnswerItemById().data;
    this.setData({
      commend:this.commendData
    })
  },

  onTabToWrite: function (event) {
    var answerId = event.currentTarget.dataset.answerId;
    console.log("answerId="+answerId);
    wx.navigateTo({
      url: '../answer-detail/write/write?id=' + answerId,
    })
    
  },

  onAddTap: function (event) {
    var newData = this.db.add();
    //交互反馈
    wx.showToast({
      title: newData.addStatus ? "关注成功" : "取消关注",
      duration: 700,
      icon: "success",
      mask: true
    })
    //重新绑定数据，注意不要将整个newData全部作为setData的参数
    this.setData({
      'commend.addStatus': newData.addStatus
    })
  },

  onLikeTap: function (event) {
    var newData = this.db.like();
    //交互反馈
    wx.showToast({
      title: newData.likeStatus ? "点赞成功" : "取消点赞",
      duration: 700,
      icon: "success",
      mask: true
    })
    //重新绑定数据，注意不要将整个newData全部作为setData的参数
    this.setData({
      'commend.likeStatus': newData.likeStatus,
      'commend.likeNum':newData.likeNum
    })
  },

  onHeartTap: function (event) {
    var newData=this.db.heart();
    //交互反馈
    wx.showToast({
      title: newData.heartStatus ? "感谢成功" : "取消感谢",
      duration: 700,
      icon: "success",
      mask: true
    })
    //重新绑定数据，注意不要将整个newData全部作为setData的参数
    this.setData({
      'commend.heartStatus':newData.heartStatus
    })
  },

  onCollectionTap:function(event){
    var newData = this.db.collect();
    //交互反馈
    wx.showToast({
      title: newData.collectionStatus? "收藏成功" : "取消收藏",
      duration:700,
      icon:"success",
      mask:true
    })
    //重新绑定数据，注意不要将整个newData全部作为setData的参数
    this.setData({
      'commend.collectionStatus': newData.collectionStatus,
      'commend.collectionNum': newData.collectionNum
    })
  },

  //评论界面
  onCommentTap:function(event){
    var answerId= event.currentTarget.dataset.answerId;
    wx.navigateTo({
      url: '../answer-detail/comment/comment?id=' + answerId,
    })
  

  },
  //预览图片
  previewImg: function (event) {
    //获取评论序号
    var detailIdx = event.currentTarget.dataset.detailIdx,
      //获取图片在图片数组中的序号
      imgIdx = event.currentTarget.dataset.imgIdx,
      //获取评论的全部图片
      imgs = this.data.detail[detailIdx].detailImg;
    wx.previewImage({
      current: imgs[imgIdx], //当前显示图片的链接
      urls: imgs  //需要预览的图片http链接列表
    })
  },

  //跳转到该标题的所有回答界面
  onAnswerTap: function (event) {
    var _answerId = event.currentTarget.dataset.answerId;
    wx.navigateTo({
      url: '../answer-detail/problem-detail/problem-detail?id=' + _answerId,
      success: function () {
        console.log('Jump success'),
        console.log(_answerId)
      },
    })
  },

  


  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})