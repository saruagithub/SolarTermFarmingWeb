Component({
  options:{
    multipleSlots: true// 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties:{
    title: {
      type:String,
      value:'删除提示'
    },
    content: {
      type: String,
      value:'你确定删除吗？'
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    } 
  },
  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data:{
    isShow:false
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  method: {
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    }
  }
})