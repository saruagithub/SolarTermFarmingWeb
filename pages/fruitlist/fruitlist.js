// pages/fruitlist/fruitlist.js
var app = getApp()
Page({
  data: {
    current: 0,
    listgoods1: [],
    listgoods2: [],
    listgoods3: [],
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var userId;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        userId = res.data;
        //console.log("PassUserId1:", userId); 
        //get page data
        wx.request({
          url: getApp().data.servsers + '/query_week_fruits',
          data: {
            user_id: userId
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              listgoods1: that.data.listgoods1.concat(res.data.data)
            });
          }
        })
      }
    })
  },
  //详情页跳转
  lookdetail: function (e) {
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      // url: "/pages/yiguo/detail/detail?id=" + lookid.id
      url: "/pages/detail/detail"
    })
  },
  //本周、本月、今年更新数据显示
  switchDate: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeDate: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {

  }
})
