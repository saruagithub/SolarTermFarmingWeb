// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {
      aspectArray: ["健康苹果", "学习西瓜", "生活香蕉", "工作樱桃", "阅读梨子", "情感橘子", "兴趣菠萝", "其他葡萄"],
      objectAspectArray: [
        {
          id: 0,
          name: '健康苹果',
        }, {
          id: 1,
          name: '学习西瓜'
        }, {
          id: 2,
          name: '生活香蕉'
        }, {
          id: 3,
          name: '工作樱桃'
        },
        {
          id: 4,
          name: '阅读梨子'
        }, {
          id: 5,
          name: '情感橘子'
        }, {
          id: 6,
          name: '兴趣菠萝'
        }, {
          id: 7,
          name: '其他葡萄'
        }
      ],
      index: 0,
      btnImage: '../image/write_btn.png'
    },
    options: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var index = 'items.index'
    //get detail data
    wx.request({
      url: getApp().data.servsers + '/detail',
      data: {
        record_id: options.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        
        that.setData({
          [index]: res.data.aspect
        });
        console.log(res.data)
      }
    });
    //ajax请求数据
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