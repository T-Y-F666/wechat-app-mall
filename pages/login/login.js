Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginBtnState:true,
    username:"",
    password:"",
    isShow: true,    //运用三目运算法，对最右侧图片进行控制
    show:"text" 
    
  },
  usernameInput:function(e){
    console.log(e);
    var val=e.detail.value;
    if(val!=''){
      this.setData({
        username:val
      });
      if(this.data.password!=""){
        console.log(this.data.password)
        this.setData({
          loginBtnState:false
        })
      }
    }
    else{
      this.setData({
        loginBtnState:true
      })
    }
  },
  passwordInput:function(e){
    console.log(e);
    var val=e.detail.value;
    if(val!=''){
      this.setData({
        password:val
      });
      if(this.data.username!=""){
        this.setData({
          loginBtnState:false
        })
      }
    }
    else{
      this.setData({
        loginBtnState:true
      })
    }
  },
  showPassword: function() {
    if (this.data.isShow) {   //如果this.data.isShow为true,则表示为密码小黑点
      this.setData({
        isShow:false,
        show:"password"
      })
    } else {
      this.setData({
        isShow: true,
        show: "text"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  login:function(){
    var userInfs = wx.getStorageSync('userobjs') || [];
    console.log(userInfs);
    var userInf=userInfs.find(item=>item.username == this.data.username);
    if(userInf){
      if(userInf.password == this.data.password){
        console.log(this.data.username)
        wx.setStorage({
          key: 'information',
          data: this.data.username,
          success(res){//等同于success:function(res),es6的写法，es6在小程序中都可以使用，推荐使用
            console.log(this.data.username)
            }
        })
          wx.showToast({
            title: '登录成功',
            duration:2000,
            success:function(){
              wx.switchTab({
                url: '../home/home',
              })
            }
          })
      }
      else{
        wx.showToast({
          title: '密码不正确',
          duration:2000,
        })
      }
    }
  },
  onLoad: function (options) {
  },
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
