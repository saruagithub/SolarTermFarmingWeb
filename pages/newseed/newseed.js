// pages/newseed/newseed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      whetherEdit:0,
      whetherEditDueDate:1,
      showsummary:0,
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
      dateitems: [
        { value: '4', name: '今日', checked: 'true' },
        { value: '1', name: '本周'},
        { value: '2', name: '本月'},
        { value: '3', name: '今年'},
      ],
      index: 0,
      finishbtn:1,
      editbtn:0,
      // btnImage: '../image/finish_btn.png',
      title:'',
      plan_type:4,
      content:''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  typePickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this
    // var aspect = 'record.aspect'
    var index = 'item.index'
    that.setData({
      [index]: parseInt(e.detail.value),
      // [aspect]: parseInt(e.detail.value) + 1
      // record.aspect : e.detail.value + 1,
    })
  },

  inputTitle:function(e){
    console.log('input title change，携带值为', e.detail.value)
    var that = this
    // var title = 'record.title'
    var title = 'item.title'
    that.setData({
      [title]: e.detail.value,
    })
  },

  dueDateChange: function (e) {
    console.log('dueDateChange事件，携带value值为：', e.detail.value)
    var that = this;
    var items = that.data.item.dateitems;
    console.log(items)
    for (var i = 0, len = items.length; i < len; ++i) {
      if (items[i].checked == 'true') {
        items[i].checked = 'false';
        break;
        //old one become black
      }
    }
    for (var i = 0, len = items.length; i < len; ++i) {
      if (items[i].value == parseInt(e.detail.value)) {
        items[i].checked = 'true';
        break;
        // new one become green
      }
    }
    var dateitems = 'item.dateitems'
    var plan_type = 'item.plan_type'
    that.setData({
      [plan_type]: parseInt(e.detail.value),
      [dateitems]:items
    });
    console.log('data',this.data)
  },

  bindTextAreaBlur:function(e){
    console.log('bindTextAreaBlur change，携带的value值', e.detail.value)
    var that = this
    // var content = 'record.content'
    var content = 'item.content'
    that.setData({
      [content]: e.detail.value,
    })
  },

  submitNewSeed:function(e){
    var that = this;
    if (that.data.item.title == ""){
      console.log("不能为空");
      wx.showModal({
        title: '目标不能为空',
        // content: '这是一个模态弹窗',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } 
        }
      })
      return
    }
    // let formId = event.detail.formId;
    // console.log(that.data.item,'notification ID:',formId)
    //ajax请求数据
    var userId;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        userId = res.data;
        console.log("PassUserId1:", userId);
        //post form data
        wx.request({
          url: getApp().data.servsers + '/insert',
          method:'POST',
          data:{
            user_id: userId,
            // record: that.data.record
            record:{
              aspect:that.data.item.index+1,
              title: that.data.item.title,
              content: that.data.item.content,
              plan_type:that.data.item.plan_type
            }
          },
          header:{
            'Content-Type': 'application/json'
          },
          success:function(res){
            wx.switchTab({
              url: '../index/index',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          },
          fail:function(){
            wx.showToast({
              title: '新建目标失败',
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