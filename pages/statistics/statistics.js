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
    finishedTypeData: [],
    delayvalue:[],
    finishRate: 10,
    laterRate: 20,
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },
  /**
 * 生命周期函数--监听页面加载，页面渲染后 执行
 */
  onLoad: function (options) {
    this.getFruitData();
  },

  //本周、本月、今年更新数据显示
  switchDate: function (e) {
    var that = this
    that.setData({
      current: e.target.dataset.index
    })
    // console.log(that.data.current)
    that.getFruitData();
  },


  getFruitData: function () {
    var that = this;
    var userId;
    var nowurl;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        userId = res.data;
        console.log("statistics,PassUserId:", userId,that.data.current);
        //get page data
        if (that.data.current == 0){
          nowurl = '/query_week_all_count'
        }
        else if (that.data.current == 1){
          nowurl = '/query_month_all_count'
        }
        else{
          nowurl = '/query_year_all_count'
        }
        console.log("url",nowurl)
        wx.request({
          url: getApp().data.servsers + nowurl,
          data: {
            user_id: userId
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            that.finishedTypeData = res.data.data;
            // console.log(res.data);
            console.log("finishedTypeData",that.finishedTypeData);
            that.createColumnChart();
            that.creatPieChart1();
          }
        });
        //获取拖延率
        wx.request({
          url: getApp().data.servsers + '/query_delay_rate',
          data: {
            user_id: userId
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            // that.setData({
            //   finishedTypeData: res.data.data
            // });
            that.delayvalue = res.data.data;
            // console.log(res.data);
            console.log(that.delayvalue);
            that.creatPieChart2();
          }
        })
      }
    })
  },

  createColumnChart: function () {
    var that = this;
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
        // name: '收获果实总数' + fruitTotall,
        name: '收获果实数',
        data: [that.finishedTypeData["健康"], that.finishedTypeData["学习"], 
          that.finishedTypeData["生活"], that.finishedTypeData["工作"], 
          that.finishedTypeData["阅读"], that.finishedTypeData["情感"],
          that.finishedTypeData["兴趣"], that.finishedTypeData["其他"]],
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
    var that = this;
    new wxCharts({
      canvasId: 'ringCanvas1',
      type: 'ring',
      series: [{
        name: '未完成' + that.finishedTypeData["未完成数"],
        data: 100 - that.finishedTypeData["完成率"],
        color: '#13D1BE',
      }, {
        name: '已完成' + that.finishedTypeData["已完成数"],
        data: that.finishedTypeData["完成率"],
        color: '#F6BA33',
      }],
      extra: {
        ringWidth: 16
      },
      title: {
        name: '完成率' + that.finishedTypeData["完成率"] + '%',
        color: '#999999',
        fontSize: 12
      },
      width: 180,
      height: 180,
      dataLabel: false
    });
  },
  creatPieChart2: function () {
    var that = this;
    new wxCharts({
      canvasId: 'ringCanvas2',
      type: 'ring',
      series: [ {
        name: '拖延' + that.delayvalue["拖延完成数"],
        data: that.delayvalue["拖延率"],
        color: '#13D1BE',
      },{
        name: '按时' + that.delayvalue["提前完成数"],
        data: 100 - that.delayvalue["拖延率"],
        color: '#F6BA33',
      }],
      extra: {
        ringWidth: 16
      },
      title: {
        name: '拖延率' + that.delayvalue["拖延率"] + '%',
        color: '#999999',
        fontSize: 12
      },
      width: 180,
      height: 180,
      dataLabel: false
    });
  },

    //调用getFruitData，更新全部数据


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