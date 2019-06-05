// pages/music/music.js
import { dBMusic } from '../../db/dBMusic.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbmusic = new dBMusic();
    
    this.setData({
      musicList: dbmusic.getAllMusicData(),
    })
    //this.setMusicMonitor();
    //this.initMusicStatus();
  },

  onTapToPlaying:function(event){
    var musicId = event.currentTarget.dataset.musicId;
    wx.navigateTo({
      url: '../music/playing/playing?id=' +musicId,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})