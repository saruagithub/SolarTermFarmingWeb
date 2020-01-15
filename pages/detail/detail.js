// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {
      whetherEdit:1,
      whetherEditDueDate:0,
      showsummary:0,
      // check1:0,
      // check2:0,
      // check3:0,
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
      finishbtn:0,
      editbtn:1,
      index: 0,
      title:'',
      dueDate:'',
      content:'',
      plan_type:1,
      record_id:'',
      // btnImage: '../image/write_btn.png'
    },
    options: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = 'items.index';
    var seedtitle = 'items.title';
    var dueDate = 'items.dueDate';
    var content = 'items.content';
    var plan_type = 'items.plan_type';
    var record_id = 'items.record_id';
    var that = this;
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
          [index]: parseInt(res.data.data.aspect)-1,
          [seedtitle]:res.data.data.title,
          [dueDate]:res.data.data.due_date,
          [content]:res.data.data.content,
          [plan_type]:res.data.data.plan_type,
          [record_id]:options.id
        });
        console.log(that.data,res,"options_ID1",that.data.items.record_id)
      },
      fail: function () {
        wx.showToast({
          title: '服务器开小差啦',
          duration: 1000
        })
      }
    });
    //ajax请求数据
  },

  edit: function () {
    var whetherEdit = 'items.whetherEdit';
    var finishbtn = 'items.finishbtn';
    var editbtn = 'items.editbtn';
    this.setData({
      [whetherEdit]:0,
      [finishbtn]:1,
      [editbtn]:0,
    })
  },

  typePickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this
    // var aspect = 'record.aspect'
    var index = 'items.index'
    that.setData({
      [index]: parseInt(e.detail.value),
      // [aspect]: parseInt(e.detail.value) + 1
      // record.aspect : e.detail.value + 1,
    })
  },

  inputTitle: function (e) {
    console.log('input title change，携带值为', e.detail.value)
    var that = this
    // var title = 'record.title'
    var title = 'items.title'
    that.setData({
      [title]: e.detail.value,
    })
  },

  bindTextAreaBlur: function (e) {
    console.log('bindTextAreaBlur change，携带的value值', e.detail.value)
    var that = this
    // var content = 'record.content'
    var content = 'items.content'
    that.setData({
      [content]: e.detail.value,
    })
  },

  submitNewSeed: function () {
    var that = this;
    if (that.data.items.title == "") {
      console.log("不能为空");
      wx.showModal({
        title: '目标不能为空',
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
    console.log(that.data.items)
    //ajax请求数据
    var userId;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        userId = res.data;
        console.log("PassUserId1:", userId);
        //post form data
        wx.request({
          url: getApp().data.servsers + '/update',
          method: 'POST',
          data: {
            user_id: userId,
            // record: that.data.record
            record: {
              record_id: that.data.items.record_id,
              aspect: that.data.items.index + 1,
              title: that.data.items.title,
              content: that.data.items.content,
              plan_type: that.data.items.plan_type
            }
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            wx.switchTab({
              url: '../index/index',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          },
          fail: function () {
            wx.showToast({
              title: '更改目标失败',
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
  
  }

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //   return {
  //     title: '我的目标种子',
  //     path: '/page/user?id=123',
  //     success: function (res) {
  //       // 转发成功
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //     }
  //   }
  // }
})