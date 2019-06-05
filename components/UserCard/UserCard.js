Component({
  properties: {

  },
  data: {
    userlist: [
      {
        type: '我的创作',
        amount: 3
      },
      {
        type: '关注',
        amount: 3
      },
      {
        type: '收藏',
        amount: 0
      },
      {
        type: '最近浏览',
        amount: 4
      }
    ]
  },
  lifetimes: {
    attached: function() {
      
    }
  }
})