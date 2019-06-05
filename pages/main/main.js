// pages/main/main.js
import { dB } from '../../db/dB.js';
import { dBPro } from '../../db/dBPro.js';
//var dataObj=require("../../data/answer.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputValue:'',    //搜索内容
      currentTab:0,     //tab切换
      pageShow:true,
      searchPanelShow:false,
      
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var db=new dB();
    var dbpro=new dBPro();
    this.setData({
      commendList:db.getAllcommendData(),
      hotList:dbpro.getAllHotData()
    })
    
  },

  onShow: function (event) {
    var db = new dB();
    var dbpro = new dBPro();
    this.setData({
      commendList: db.getAllcommendData()
    })
  },

  /*搜索框切换面板*/
  onBindFocus:function(event){
    
    this.setData({
      pageShow:false,
      searchPanelShow:true
    })
  },

  /*隐藏搜索面板 */
  onCancelImgTap:function(event){
    
    this.setData({
      pageShow:true,
      searchPanelShow:false,
      inputValue:'',
      
    })
  },
 
  /*Navtab切换 */
  switchNav:function(event){
    var that=this;
    if(this.data.currentTab===event.target.dataset.current){
      return false;
    }else{
      that.setData({
        currentTab:event.target.dataset.current,
      })
    }
  },
  
  swiperChange:function(event){
    this.setData({
      currentTab:event.detail.current,
    })
  },

  /*提问页面跳转 */
  onTabJump:function(event){
    wx.navigateTo({
      url: '../main/quiz/quiz',
      success: function () {
        console.log('Jump success')
      },
      fail: function () {
        console.log('Jump fail')
      },
      complete: function () {
        console.log('Jump complete')
      }
    })
  },

  /*回答详情跳转*/
  onTapToDetail:function(event){
    var answerId=event.currentTarget.dataset.answerId;
    wx.navigateTo({
      url: 'answer-detail/answer-detail?id='+answerId,
    })
  },
  /*热榜问题跳转*/
  onTapToProblem:function(event){
    var hotId=event.currentTarget.dataset.hotId;
    console.log(hotId);
    wx.navigateTo({
      url: 'problem-detail/problem-detail?id=' + hotId,
    })
  },

  onShareAppMessage:function(){
    //用户点击右上角分享
    return{
      title:'title',   //分享标题
      desc:'desc',     //分享描述
      path:'path'      //分享路径 
    }
  }
  
   
})