var app = getApp()
Page({
  data: {
    current: 0,
    showData: false,
    listgoods0: [],
    listgoods1: [],
    listgoods2: [],
    listgoods3: [],
    listgoods4: [],
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },
  onPullDownRefresh: function () {
    this.queryData();
    console.log('onPullDownRefresh')
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.queryData();
  },
  //week data
  queryData:function(){
    var that = this;
    //ajax请求数据
    var userId;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        userId = res.data;
        console.log("PassUserId1:", userId);
        //get page week data
        if(that.data.current == 0){
          wx.request({
            url: getApp().data.servsers + '/query_day_seeds',
            data: {
              user_id: userId
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              //problem？？？？？？？
              if (res.data.data.length == 0) {
                that.setData({
                  showData: true
                })
              }
              else {
                that.setData({
                  showData:false,
                  listgoods0: res.data.data
                });
              }
              console.log("day_seed:", res.data, that.data.showData)
            },
            fail: function () {
              wx.showToast({
                title: '服务器开小差啦',
                duration: 1000
              })
            }
          });
        }
        if (that.data.current == 1){
          //get page month data
          wx.request({
            url: getApp().data.servsers + '/query_week_seeds',
            data: {
              user_id: userId
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
              console.log("week_seed", res.data, that.data.showData)
            },
            fail: function () {
              wx.showToast({
                title: '服务器开小差啦',
                duration: 1000
              })
            }
          });
        }
        if (that.data.current == 2 ){
          //get page year data
          wx.request({
            url: getApp().data.servsers + '/query_month_seeds',
            data: {
              user_id: userId
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              if (res.data.data.length == 0) {
                that.setData({
                  showData: true
                })
              }else{
                that.setData({
                  showData: false,
                  listgoods2: res.data.data
                });
              }
              console.log("month_seed",res.data,that.data.showData)
            },
            fail: function () {
              wx.showToast({
                title: '服务器开小差啦',
                duration: 1000
              })
            }
          });
        }
        if (that.data.current == 3){
          //get page later data
          wx.request({
            url: getApp().data.servsers + '/query_year_seeds',
            data: {
              user_id: userId
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              if (res.data.data.length == 0) {
                that.setData({
                  showData: true
                });
                // console.log("*********")
              } else {
                that.setData({
                  showData: false,
                  listgoods3: res.data.data
                });
              }
              console.log("year_seed", res.data, that.data.showData)
            },
            fail: function () {
              wx.showToast({
                title: '服务器开小差啦',
                duration: 1000
              })
            }
          });
        }
        if (that.data.current == 4) {
          //get page month data
          wx.request({
            url: getApp().data.servsers + '/query_over_due_date_seeds',
            data: {
              user_id: userId
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
                  listgoods4: res.data.data
                });
              }
              console.log("overdue", res.data, that.data.showData)
            },
            fail: function () {
              wx.showToast({
                title: '服务器开小差啦',
                duration: 1000
              })
            }
          });
        }
      }
    })
  },
  //详情页跳转
  lookdetail: function (e) {
    var lookid = e.currentTarget.dataset;
    console.log("lookid",lookid)
    wx.navigateTo({
      // url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=coming'
      // url: "/pages/yiguo/detail/detail?id=" + lookid.id
      url: '/pages/detail/detail?id='+ lookid.id +''
    })
  },

  finishgoal:function(e){
    var taskid = e.currentTarget.dataset;
    console.log("taskid", taskid)
    wx.navigateTo({
      url: '/pages/rethink/rethink?id=' + taskid.id + '',
    })
  },

  switchDate: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
    // this.queryData()
  },
  changeDate: function (e) {
    this.setData({
      current: e.detail.current
    })
    this.queryData()
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
  }

})
