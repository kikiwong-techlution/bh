var util = require('../utils/util.js')
class dBMusic {
  constructor(musicId) {
    this.storageKeyName = 'musicList';
    this.musicId = musicId;

  }


  //得到推荐栏的全部回答信息
  getAllMusicData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/answer.js').musicList;
      this.initmusicList(res);
      //this.execSetStorageSync(res);
    }
    return res;
  }

  //获取制定id号的问题数据
  getMusicById() {
    var musicData = this.getAllMusicData();
    var len = musicData.length;
    for (var i = 0; i < len; i++) {
      if (musicData[i].musicId == this.musicId) {
        return {
          //当前回答在缓存数据库数组中序号
          index: i,
          data: musicData[i]
        }
      }
    }
  }
  //保存或者更新缓存数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }



  compareWithTime(value1, value2) {
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if (flag < 0) {
      return 1;
    } else if (flag > 0) {
      return -1
    } else {
      return 0;
    }
  }

};

export {
  dBMusic
}