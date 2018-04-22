var app = getApp()
Page({
  data: {
    current: 0,
    listgoods: [{
      "record_id": '0101001',
      "content": "完成毕业设计，深度学习",
      "due_time": "2018/3/4 15:00",
      "fruit_img": "../image/bean.png"
    }],
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
    var nickName;
    //username
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        nickName = userInfo.nickName
        console.log(nickName)
      }
    })
    //ajax请求数据
    wx.request({
      url: 'https://d6b55dbf.ngrok.io/query_fruits/雪音',
          header: {
              'Content-Type': 'application/json'
          },
          success: function(res) {
              // switch1(res.data);
              console.log(res.data);
              that.setData({
                  listgoods:res.data
              });
          }
        })
    console.log(this.data.listgoods);
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
  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeSlider: function (e) {
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
  }

})
