var util=require('../utils/util.js')
class dB{
  constructor(answerId) {
    this.storageKeyName = 'commendList';
    this.answerId=answerId;

  }
  
  
  //得到推荐栏的全部回答信息
  getAllcommendData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/answer.js').commendList;
      this.initcommendList(res);
      //this.execSetStorageSync(res);
    }
    return res;
  }

  //获取制定id号的回答数据
  getAnswerItemById(){
    var commendData=this.getAllcommendData();
    var len=commendData.length;
    for(var i=0;i<len;i++){
      if(commendData[i].answerId==this.answerId){
        return{
          //当前回答在缓存数据库数组中序号
          index:i,
          data:commendData[i]
        }
      }
    }
  }

  //保存或者更新缓存数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  //点赞回答
  like(){
    var data=this.updatecommendData('like')
    return data;
  }
  //感谢回答
  heart() {
    return this.updatecommendData('heart');
  }
  //收藏回答
  collect() {
    return this.updatecommendData('collect');
  }
  //发表评论
  newComment(newComment){
    this.updatecommendData('comment',newComment);
  }
  add() {
    return this.updatecommendData('add');
  }
  addPro(){
    return this.updatecommendData('addPro');
  }
  //更新本地的点赞、感谢、收藏、评论信息
  updatecommendData(category,newComment){
    var itemData=this.getAnswerItemById(),
      commendData =itemData.data,
      allcommendData=this.getAllcommendData();
    
    switch(category){
      case 'heart':
        //处理感谢
        if (!commendData.heartStatus) {
          //如果当前状态是未感谢
          commendData.heartStatus = true;
        } else {
          commendData.heartStatus = false;
        }
        break;

      case 'collect':
        //处理收藏
        if(!commendData.collectionStatus){
          //如果当前状态是未收藏
          commendData.collectionNum++;
          commendData.collectionStatus=true;
        }else{
          commendData.collectionNum--;
          commendData.collectionStatus = false;
        }
        break;

      case 'like':
        //处理点赞
        if (!commendData.likeStatus) {
          commendData.likeNum++;
          commendData.likeStatus = true;
        } else {
          commendData.likeNum--;
          commendData.likeStatus = false;
        }
        break;

      case 'comment':
        //处理评论
        commendData.comments.push(newComment);
        commendData.commentNum++;
        break;

      case 'add':
        //处理关注
        if (!commendData.addStatus) {
          //如果当前状态是未关注
          commendData.addStatus = true;
        } else {
          commendData.addStatus = false;
        }
        break;

      case 'addPro':
        //处理关注问题
        if (!commendData.addProStatus) {
          //如果当前状态是未关注
          commendData.addProStatus = true;
        } else {
          commendData.addProStatus = false;
        }
        break;

      default:
        break;
    }
    //更新缓存数据库
    allcommendData[itemData.index]=commendData;
    this.execSetStorageSync(allcommendData);
    return commendData;

  }

  //获取评论数据
  getCommentData() {
    var itemData = this.getAnswerItemById().data;
    itemData.comments.sort(this.compareWithTime); //按时间降序
    var len = itemData.comments.length, comment;
    for (var i = 0; i < len; i++) {
      // 将comment中的时间戳转换成可阅读格式
      comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }

  //获取某个标题的全部回答数据
  getAllanswerData(){
    var answerData=this.getAnswerItemById().data;
    answerData.answers.sort(this.compareWithTime);  //按时间降序
    var len = answerData.answers.length, answer;
    for(var i = 0;i < len; i++){
      //将answer中的时间戳转换成可阅读格式
      answer = answerData.answers[i];
      answer.create_time=util.getDiffTime(answer.create_time, true);
    }
    return answerData.answers;
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

export{
  dB
}