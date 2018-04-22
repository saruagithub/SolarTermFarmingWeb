var url = 'http://47.106.137.199:5001'
const app = getApp()
var wxCharts = require('../../utils/wxcharts.js');
var nickName; //username
var windowWidth = 320; //phone width
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    goal_seednum: 0,
    goal_fruitnum: 0,
    // watermelonNum:0,
    finishRate: 10,
    laterRate: 20
  },
  getFruitData: function () {
    var that = this
    const requestTask = wx.request({
      url: 'https://ade3585d.ngrok.io/seed_count/雪音',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        // 设置界面数据???
      }
    })
    requestTask.abort() // 取消请求任务???
  },

  createColumnChart: function () {
    var fruitTotall = 44;
    //charts
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      console.log("windowwidth:", windowWidth)
    } catch (e) {
      console.log("get system info failed! canvas")
      // do something when get system info failed
    }
    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['健康', '学习', '生活', '工作', '阅读', '情感', '兴趣', '其他'],
      series: [{
        name: '收获果实总数' + fruitTotall,
        data: [10, 3, 4, 5, 3, 6, 4, 9],
        color: '#F6BA33'
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        min: 0,
      },
      width: windowWidth * 0.8,
      height: 250,
      dataLabel: true
    });
  },

  creatPieChart1: function () {
    new wxCharts({
      canvasId: 'ringCanvas1',
      type: 'ring',
      series: [{
        name: '未完成',
        data: 15,
        color: '#13D1BE',
      }, {
        name: '已完成',
        data: 35,
        color: '#F6BA33',
      }],
      extra: {
        ringWidth: 16
      },
      title: {
        name: '完成率' + 50 + '%',
        color: '#999999',
        fontSize: 12
      },
      width: 180,
      height: 180,
      dataLabel: false
    });
  },
  creatPieChart2: function () {
    new wxCharts({
      canvasId: 'ringCanvas2',
      type: 'ring',
      series: [{
        name: '按时',
        data: 10,
        color: '#F6BA33',
      }, {
        name: '拖延',
        data: 35,
        color: '#13D1BE',
      }],
      extra: {
        ringWidth: 16
      },
      title: {
        name: '拖延率' + 22 + '%',
        color: '#999999',
        fontSize: 12
      },
      width: 180,
      height: 180,
      dataLabel: false
    });
  },
  /**
   * 生命周期函数--监听页面加载，页面渲染后 执行
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        nickName = userInfo.nickName
        console.log(nickName)
      }
    })
    this.getFruitData();
    this.createColumnChart();
    this.creatPieChart1();
    this.creatPieChart2();
  },

  //本周、本月、今年更新数据显示
  switchDate: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
    //调用getFruitData，更新全部数据
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})