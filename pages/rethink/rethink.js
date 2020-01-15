// pages/rethink/rethink.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    summary:'',
    record_id:'',
    options: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      record_id:options.id
    })
    console.log('rethink record_id', that.data.record_id,options.id);
  },

  bindTextAreaBlur: function (e) {
    console.log('bindTextAreaBlur change，携带的value值', e.detail.value)
    var that = this
    that.setData({
      summary: e.detail.value,
    })
    console.log(that.data.summary);
  },

  submitthoughts:function(){
    var that = this;
    if (that.data.summary == '') {
      console.log("不能为空");
      wx.showModal({
        title: '不能为空',
        // content: '这是一个模态弹窗',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }
    console.log(that.data)
    var userId;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        userId = res.data;
        console.log("PassUserId1:", userId);
        //post form data
        wx.request({
          url: getApp().data.servsers + '/goal_finished',
          method: 'POST',
          data: {
            user_id: userId,
            record:{
              record_id: that.data.record_id,
              summary: that.data.summary
            }
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            // console.log(res);
            wx.switchTab({
              url: '../fruitlist/fruitlist',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          },
          fail: function () {
            wx.showToast({
              title: '提交失败',
              duration: 1000
            })
          }
        })
      }
    })
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
  // onShareAppMessage: function () {
  
  // }
})