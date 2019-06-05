//查看热榜问题

var util = require('../utils/util.js')
class dBPro {
  constructor(hotId) {
    this.storageKeyName = 'hotList';
    this.hotId = hotId;
  }

  getAllHotData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/answer.js').hotList;
      this.initHotList(res);
      //this.execSetStorageSync(res);
    }
    return res;
  }
  //获取制定id号的问题数据
  getProblemItemById() {
    var hotData = this.getAllHotData();
    var len = hotData.length;
    for (var i = 0; i < len; i++) {
      if (hotData[i].hotId == this.hotId) {
        return {
          //当前回答在缓存数据库数组中序号
          index: i,
          data: hotData[i]
        }
      }
    }
  }
  //保存或者更新缓存数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  addPro() {
    return this.updatehotData('addPro');
  }
  //更新本地的点赞、感谢、收藏、评论信息
  updatehotData(category) {
    var itemData = this.getProblemItemById(),
      hotData = itemData.data,
      allhotData = this.getAllHotData();

    switch (category) {
      case 'addPro':
        //处理关注问题
        if (!hotData.addProStatus) {
          //如果当前状态是未关注
          hotData.addProStatus = true;
        } else {
          hotData.addProStatus = false;
        }
        break;

      default:
        break;
    }
    //更新缓存数据库
    allhotData[itemData.index] = hotData;
    this.execSetStorageSync(allhotData);
    return hotData;

  }

  //获取回答数据
  getAnswerData() {
    var itemData = this.getProblemItemById().data;
    itemData.answers.sort(this.compareWithTime); //按时间降序
    var len = itemData.answers.length, answer;
    for (var i = 0; i < len; i++) {
      // 将comment中的时间戳转换成可阅读格式
      answer = itemData.answers[i];
      answer.create_time = util.getDiffTime(answer.create_time, true);
    }
    return itemData.answers;
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
  dBPro
}