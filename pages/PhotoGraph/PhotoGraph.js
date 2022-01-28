let fs = wx.getFileSystemManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: [],
    picToTxtState:true,
    TempImage:''

  },
    // 拍摄按钮按下, 执行record 触发拍摄
    record(){
      this.setData({
        picToTxtState:false
      })
      this.data.cameraContext = wx.createCameraContext()
      this.data.cameraContext.takePhoto({
        quality:"high", //高质量的图片
        success: res => {
          //res.tempImagePath照片文件在手机内的的临时路径
          let tempImagePath = res.tempImagePath
          wx.saveFile({
            tempFilePath: tempImagePath,
            success: function (res) {
              //返回保存时的临时路径 res.savedFilePath
              const savedFilePath = res.savedFilePath
              // 保存到本地相册
              wx.saveImageToPhotosAlbum({
                filePath: savedFilePath,
              })
              this.setData({
                picToTxtState: false,
                TempImage:filePath
              })
            },
            //保存失败回调（比如内存不足）
            fail: console.log
          })
        }
      })
    },

    getImgInfo: function (imageData) {
      wx.showLoading({
        title: '识别中...',
      })
      var that = this
      that.getBaiduToken().then(res => {
        console.log(res)
        //获取token
        const token = res.data.access_token
        console.log(token)
        const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${token}` // baiduToken是已经获取的access_Token      
        wx.request({
          url: detectUrl,
          data: {
            image: that.TempImage
          },
          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 必须的        
          },
          success: function (res, resolve) {
            console.log(res)
            //将 res.data.words_result数组中的内容加入到words中           
            that.setData({
              words: res.data.words_result
            })
            console.log('识别后： ' + res.data.words_result)
            if(res.data.words_result=='undefined'){
              wx.showModal({
                title: '提示',
                content: '抱歉，未能识别出文字，请仔细检查上传图片内容',
                success: function (res) {
                 if (res.confirm) {
                  console.log('确定')
                 } else if (res.cancel) {
                  console.log('取消')
                 }
                }
               })
            }
            wx.hideLoading()
          },
          fail: function (res, reject) {
            console.log('get word fail：', res.data);
            wx.hideLoading()
          },
          complete: function () {
            wx.hideLoading()
          }
        })
      })
    },
    // 获取百度access_token  
    getBaiduToken: function () {
      return new Promise(resolve => {
        var APIKEY = "填写你的APIKEY"
        var SECKEY = "填写你的SECKEY"
        var tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${APIKEY}&client_secret=${SECKEY}`
        var that = this;
        wx.request({
          url: tokenUrl,
          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/json; charset-UTF-8'
          },
          success: function (res) {
            console.log("[BaiduToken获取成功]", res);
            return resolve(res)
          },
          fail: function (res) {
            console.log("[BaiduToken获取失败]", res);
            return resolve(res)
          }
        })
      })
    },

  // })
  

  
// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
