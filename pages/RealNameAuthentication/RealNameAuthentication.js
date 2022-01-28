// pages/RealNameAuthentication/RealNameAuthentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    // selectData:['中国大陆居民身份证',	
    //   '中国澳门身份证',
    //   '中国香港身份证',	
    //   '中国台湾身份证',	
    //   'Passport',		
    // ],
    optionList:['中国大陆居民身份证','中国澳门身份证','中国香港身份证','Passport'],
    value:'所有',
    index: 0,
 
    hideFlag: true,//true-隐藏  false-显示
    animationData: {},
    imgs: [],//本地图片地址数组
    picPaths:[],//网络路径
    RealNameInput:'',
    RealNameInputFlag: false,
    RealNamePinyin:'',
    RealNamePinyinFlag: false,
    IdentificationNumber:'',
    IdentificationNumberFlag:false
  },

  // 点击选项
  getOption:function(e){
    var that = this;
    that.setData({
      value:e.currentTarget.dataset.value,
      hideFlag: true
    })
  },
  //取消
  mCancel: function () {
    var that = this;
    that.hideModal();
  },
 
  // ----------------------------------------------------------------------modal
  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间
      timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn();//调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
    
  },
 
  // 隐藏遮罩层
  hideModal: function (e) {
    console.log(e)
    var that = this;
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    that.setData({
     index:Index,
     show:!that.data.show
    });
    console.log(that.data.selectData[that.data.index])

    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间 默认400ms
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown();//调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220)//先执行下滑动画，再隐藏模块
    
    
  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
      }
    }) 
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx',//
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
          that.data.picPaths.push(data['msg'])
          that.setData({
            picPaths: that.data.picPaths
          })
          console.log(that.data.picPaths)
      }
    })
  },
  RealNameInput:function(e){
    console.log(e)
    if(e.detail.value!=''){
      this.setData({
        RealName:e.detail.value,
        RealNameInputFlag: true,
      })
    }
  },
  RealPinyinNameInput:function(e){
    console.log(e)
    if(e.detail.value!=''){
      this.setData({
        RealNamePinyin:e.detail.value,
        RealNamePinyinFlag: true,
      })
    }
  },
  IdentificationNumberInput:function(e){
    console.log(e)
    if(e.detail.value!=''){
      this.setData({
        IdentificationNumber:e.detail.value,
        IdentificationNumberFlag: true,
      })
    }
  },
  SubmitCertification:function(){
    if(this.data.RealNameInputFlag==true&&this.data.RealNamePinyinFlag==true&&this.data.IdentificationNumberFlag==true){
      wx.showModal({
        title: '提示',
        content: '提交成功',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '实名认证',
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
  selectTap(){
    this.setData({
     show: !this.data.show
    });
    },
    // 点击下拉列表
    optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
     index:Index,
     show:!this.data.show
    });
    console.log(this.data.selectData[this.data.index])
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
