// pages/main/quiz/quiz.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "value": "",   // 文本的内容
    "maxlength": -1,  // 最大输入长度，设置为 -1 的时候不限制最大长度
    "focus": true,
    "auto-height": true,  // 是否自动增高，设置auto-height时，style.height不生效
    "adjust-position": true, // 键盘弹起时，是否自动上推页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {

  },

  titleInput:function(event){
    this.setData({
      title:event.detail.value
    })
  },

  detailInput: function (event) {
    this.setData({
      detail: event.detail.value
    })
  },

  onProblemJump:function(event){
    var proId=event.currentTarget.id;
    
    console.log(proId);

    //异步写入缓存
    wx.setStorage({
      key: 'proId',
      data:{
        "title":this.data.title,
        "detail":this.data.detail,
        
      }  
        
    }),

    wx.navigateTo({
      url: '../quiz/problem/problem?proId='+ proId + '&title=' + this.data.title 
          + '&detail=' + this.data.detail,
      success: function () {
        console.log('Jump success')
      },
      fail: function () {
      console.log('Jump fail')
     },
    })
  }
  
})