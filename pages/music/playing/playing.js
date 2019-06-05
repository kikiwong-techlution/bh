// pages/music/playing/playing.js
import { dBMusic } from '../../../db/dBMusic.js';
var app = getApp();
console.log(app)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.musicId = options.id;
    this.dbmusic = new dBMusic(this.musicId);
    this.musicData = this.dbmusic.getMusicById().data;
  console.log(this.musicId);
    this.setData({
      musicList: this.musicData,
    })
    this.setMusicMonitor();
    this.initMusicStatus();
  },

  //播放/停止
  onMusicTap: function (event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: this.musicData.url,
        title: this.musicData.title,
        coverImgUrl: this.musicData.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicId = this.musicData.musicId;
    }

  },

  //设置音乐播放监听
  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    });

    wx.onBackgroundAudioPlay(function (event) {
      if (app.globalData.g_currentMusicId === that.musicData.musicId) {
        that.setData({
          isPlayingMusic: true
        })
      }
      app.globalData.g_isPlayingMusic = true;
    });

    wx.onBackgroundAudioPause(function () {
      if (app.globalData.g_currentMusicId == that.musicData.musicId) {
        that.setData({
          isPlayingMusic: false
        })
      }
      app.globalData.g_isPlayingMusic = false;
    });
  },

  //初始化音乐播放图标状态
  initMusicStatus() {
    var currentId = this.musicData.musicId;
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicId === currentId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    else {
      this.setData({
        isPlayingMusic: false
      })
    }
  },

  onUnload: function (event) {
    wx.stopBackgroundAudio()
    this.setData({
      isPlayingMusic: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})