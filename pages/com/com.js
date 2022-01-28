// pages/com/com.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit:function(e){
    console.log(e.detail.value);
    var obj = {};
    obj.username = e.detail.value.username;
    obj.password = e.detail.value.pwd;
    obj.passwordAgain = e.detail.value.pwdAgain;
    if(e.detail.value.pwdAgain != e.detail.value.pwd){
      wx.showToast({
        title: '密码不一致',
        duration:2000,
      })  
    }
    obj.comname = e.detail.value.comName;
    obj.code = e.detail.value.code;
    obj.iphone = e.detail.value.iphone;
    console.log(obj);

    var arr = wx.getStorageSync('userobjs') || [];
    if( e.detail.value.username.length >= 5 && e.detail.value.username.length <= 18 && e.detail.value.comName.length > 0 && e.detail.value.pwdAgain === e.detail.value.pwd && e.detail.value.pwd.length >= 6 && e.detail.value.pwd.length <= 20){
      arr.push(obj);
      wx.setStorageSync('userobjs',arr);
      wx.showToast({
        title: '注册成功',
        duration:2000,
        success:function(){
          wx.navigateTo({
            url: '../login/login',
          })
        }
      })
    }
    else if(e.detail.value.pwdAgain !== e.detail.value.pwd){
      wx.showToast({
        title: '密码不一致',
        duration:2000,
      })
    }
    else if(e.detail.value.username.length < 5){
      wx.showToast({
        title: '用户名过短',
        image:'pages/com/Warning.png',
        duration:2000,
      })
    }
    else if(e.detail.value.username.length > 18){
      wx.showToast({
        title: '用户名过长',
        duration:2000,
        image:'pages/com/Warning.png',
      })
    }
    else if(e.detail.value.pwd.length < 6){
      wx.showToast({
        title: '密码过短',
        duration:2000,
        image:'pages/com/Warning.png',
      })
    }
    else if(e.detail.value.pwd.length > 18){
      wx.showToast({
        title: '密码过长',
        duration:2000,
        image:'pages/com/Warning.png',
      })
    }
    else if(e.detail.value.comName.length ==0){
      wx.showToast({
        title: '请输入企业名称',
        duration:2000,
        image:'pages/com/Warning.png',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '企业用户注册',
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
  onShareAppMessage: function () {

  }
})
