// pages/main/answer-detail/comment/comment.js
import { dB } from '../../../../db/dB.js';
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag:true,
    keyboardInputValue:'',
    sendMoreMsgFlag:false,
    chooseFiles:[]        //保存已选择的图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var answerId = options.id;
    this.db = new dB(answerId);
    var comments = this.db.getCommentData();
    this.setData({
      comments: comments
    })
    

  },


  //预览图片
  previewImg:function(event){
    //获取评论序号
    var commentIdx=event.currentTarget.dataset.commentIdx,
      //获取图片在图片数组中的序号
      imgIdx=event.currentTarget.dataset.imgIdx,
      //获取评论的全部图片
      imgs=this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current:imgs[imgIdx], //当前显示图片的链接
      urls: imgs  //需要预览的图片http链接列表
    })
  },
  //切换语音和键盘输入
  switchInputType:function(event){
    this.setData({
      useKeyboardFlag:!this.data.useKeyboardFlag
    })
  },

  //获取用户输入
  bindCommentInput:function(event){
    var val = event.detail.value;
    this.data.keyboardInputValue = val;
    
  }, 

  //提交用户评论
  submitComment:function(event){
    var newData={
      author: app.globalData.userInfo.nickName,
      avatar:app.globalData.userInfo.avatarUrl,
      //评论时间
      create_time:new Date().getTime()/1000,
      //评论内容
      content:{
        txt:this.data.keyboardInputValue
      }
    };
    if(!newData.content.txt){
      //如果没有评论内容，就不执行任何操作
      return;
    }
    //保存新评论到缓存数据库中
    this.db.newComment(newData);
    //显示操作结果
    this.showCommitSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
    //恢复初始状态
    this.resetAllDefaultStatus();

  },
  //评论成功
  showCommitSuccessToast:function(){
    //显示操作结果
    wx.showToast({
      title: "评论成功",
      duration:700,
      icon:"success"
    })
  },

  //重新绑定评论数据
  bindCommentData:function(){
    var comments=this.db.getCommentData();
    this.setData({
      comments:comments
    })
  },
  //重置input组件的输入值
  resetAllDefaultStatus:function(){
    //清空评论框
    this.setData({
      keyboardInputValue:''
    })
  },

  //显示选择图片、拍照等按钮
  sendMoreMsg:function(){
    this.setData({
      sendMoreMsgFlag:!this.data.sendMoreMsgFlag
    })
  },
  //选择本地照片与拍照
  chooseImage:function(event){
    //已选择图片数组
    var imgArr=this.data.chooseFiles;
    //只能上传3张照片，包括拍照
    var leftCount=3-imgArr.length;
    if(leftCount <= 0){
      return;
    }
    var sourceType=[event.currentTarget.dataset.category],
      that=this;
      wx.chooseImage({
        count:leftCount,
        sourceType:sourceType,
        success:function(res){
          //可以分次选图片，但总数不能超过3张
          that.setData({
            chooseFiles:imgArr.concat(res.tempFilePaths)
          });
        }
      })
  },

  //删除已选择的图片
  deleteImage:function(event){
    var index=event.currentTarget.dataset.idx;
    var that=this;
    that.data.chooseFiles.splice(index,1);
    that.setData({
      chooseFiles:that.data.chooseFiles
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})