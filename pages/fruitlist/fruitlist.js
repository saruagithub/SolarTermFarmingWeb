// pages/fruitlist/fruitlist.js
var app = getApp()
Page({
  data: {
    current: 0,
    listgoods: [{
      "id": '0101001',
      "title": "完成毕业设计，深度学习",
      "time": "2018/3/4 15:00",
      "pic_url": "../image/watermelon.png"
    }, {
      "id": '0101001',
      "title": "本周跑步3次，坚持",
      "time": "2018/3/4 15:00",
      "pic_url": "../image/pear.png"
    }, {
      "id": '0101001',
      "title": "沛新西兰阳光金奇异果",
      "time": "2018/3/4 15:00",
      "pic_url": "../image/banana.png"
    }, {
      "id": '0101001',
      "title": "沛新西兰阳光金奇异果",
      "time": "2018/3/4 15:00",
      "pic_url": "../image/cherry.png"
    }, {
      "id": '0101001',
      "title": "沛新西兰阳光金奇异果",
      "time": "2018/3/4 15:00",
      "pic_url": "../image/apple.png"
    }, {
      "id": '0101001',
      "title": "沛新西兰阳光金奇异果",
      "time": "2018/3/4 15:00",
      "pic_url": "../image/orange.png"
    }, {
      "id": '0101001',
      "title": "沛新西兰阳光金奇异果",
      "time": "2018/3/4 15:00",
      "pic_url": "../image/pineapple.png"
    }, {
      "id": '0101001',
      "title": "沛新西兰阳光金奇异果",
      "time": "2018/3/4 15:00",
      "pic_url": "../image/grape.png"
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
    //ajax请求数据
    // wx.request({
    //         url: 'http://www.htmlk.cn/json-test/lists.json',
    //         header: {
    //             'Content-Type': 'application/json'
    //         },
    //         success: function(res) {
    //            switch1(res.data);
    //            console.log(res.data);
    //            that.setData({
    //                listgoods:res.data
    //            });
    //         }
    //     })
    //对商品进行价格排序
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
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {

  }
})
