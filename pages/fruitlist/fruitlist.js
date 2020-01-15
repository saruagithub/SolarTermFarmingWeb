// pages/fruitlist/fruitlist.js
var app = getApp()
Page({
  data: {
    //current: 0,
    listgoods1: [],
    yearArray: ['2018'],
    monthArray: ['All','01','02','03','04','05','06','07','08','09','10','11','12'],
    yearIndex:0,
    monthIndex:0
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  onLoad: function (options) {
    //获取当前时间戳
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    console.log("当前时间戳为：" + timestamp,'年月',Y,M);

    //var that = this;
    // for (var i = 0; i < 13; i++) {
    //     if(M == that.monthArray[i]){
    //       that.setData({
    //         monthIndex: i
    //       });
    //     }
    // };
    //that.queryData();
  },

  // chose year
  // yearPickerChange: function (e) {
  //   console.log('yearpicker携带值为', e.detail.value)
  //   var that = this
  //   var index = 'item.index'
  //   that.setData({
  //     [index]: parseInt(e.detail.value),
  //     // [aspect]: parseInt(e.detail.value) + 1
  //     // record.aspect : e.detail.value + 1,
  //   })
  // },

  monthPickerChange: function (e) {
    console.log('monthPicker携带值为', e.detail.value)
    var that = this;
    that.setData({
      monthIndex: parseInt(e.detail.value),
    })
    console.log(that.data.monthIndex);
    that.queryData();
  },


  queryData: function () {
    var that = this;
    //ajax请求数据
    var userId;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        userId = res.data;
        console.log("PassUserId1:", userId);
        wx.request({
          url: getApp().data.servsers + '/query_fruits',
          data: {
            user_id: userId,
            year: 2018,
            month: that.data.monthIndex
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            if (res.data.data.length == 0) {
              that.setData({
                showData: true
              })
            }
            else {
              that.setData({
                showData: false,
                listgoods1: res.data.data
              });
            }
            console.log("all_fruit:", res.data)
          },
          fail: function () {
            wx.showToast({
              title: '服务器开小差啦',
              duration: 1000
            })
          }
        });
      }
    })
  },
  //详情页跳转
  lookdetail: function (e) {
    var lookid = e.currentTarget.dataset;
    console.log(lookid);
    wx.navigateTo({
      url: '/pages/fruitdetail/fruitdetail?id=' + lookid.id + ''
      // url: "/pages/fruitdetail/fruitdetail"
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.queryData();
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
