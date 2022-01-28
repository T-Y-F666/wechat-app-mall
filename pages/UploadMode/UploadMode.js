// pages/UploadMode/UploadMode.js
import md5 from '../../utils/md5-js'
let fs = wx.getFileSystemManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      words: [],
    tempFilePaths: '',
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:[
      'txt',
      'doc',	
      'docx',
      'xls',	
      'xlsx',	
      'pptx',	
      'pptx',	
      'pdf',	
    ],
    inputValue:'',
    Content:'',
    inputValueContent:''
  },
  takePhoto(){	
    wx.navigateTo({
      url: '../PhotoGraph/PhotoGraph',	//跳转到自定义的一个拍照页面
    })
  },

//获取应用实例
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths:res.tempFilePaths
        })
      }
    })
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
    GoToSelectTheAppropriateFile:function(){
      var that = this
      var copy_file;
              wx.chooseMessageFile({
                count: 1,
                type: 'file',
                success (res) {
                  if(that.data.selectData[that.data.index]==='txt'){
                  console.log(res)
                  fs.readFile({
                    filePath: res.tempFiles[0].path,
                    encoding: 'utf-8',
                    position: 0,
                    success(res) {
                      console.log(res.data)
                      copy_file=res.data
                      console.log(copy_file)
                      wx.request({
                        url: 'https://ltpapi.xfyun.cn/v1/ke',
                        header:{
                          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                          'X-Appid':'7d57b1eb' ,
                          'X-CurTime':Date.parse(new Date())/1000 ,
                          'X-Param':'eyJ0eXBlIjoiZGVwZW5kZW50In0=' ,
                          'X-CheckSum': md5("ea1f7747e6ff8c92539168ac033a3be5" + Date.parse(new Date())/1000 + "eyJ0eXBlIjoiZGVwZW5kZW50In0="),
                        },
                        method:"POST",
                        data: {
                          'Content-Type':'application/json',
                          text:copy_file,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
                        },
                        success: function(res) {
                          //这里就是请求成功后，进行一些函数操作
                          console.log(res)
                          var ArrayData = JSON.stringify(res.data.data.ke);
                          // console.log()
                          console.log(ArrayData)
                          wx.navigateTo({
                            url: '../ShowKeyWords/ShowKeyWords?ArrayData='+ArrayData,
                          })
                        },
                        fail:function(res) {
                          console.error(res)
                        } 
                      })
                    },
                  })
                  }
                  else{
                    wx.openDocument({
                      filePath:res.tempFiles[0].path,
                      fileType:that.data.selectData[that.data.index],
                      success:function(res){
                        // console.log(this.fileType)
                      }
                    })
                  }
                }
              })
    },

  /**
   * 生命周期函数--监听页面加载
   */
    getInputValue(e){
      this.setData({
        inputValue:e.detail
      })
      console.log(e.detail) 
    },
  GoToTextSubmission:function(){
    var that = this
    console.log(that.data.inputValue)
    if(this.data.inputValue==''&&this.data.inputValueContent==''){
      wx.showModal({
        title: '提示',
        content: '请先输入或选择内容',
        success: function (res) {
         if (res.confirm) {
          console.log('确定')
         } else if (res.cancel) {
          console.log('取消')
         }
        }
       })
    }
    else if(this.data.inputValue.value){
      console.log(that.data.inputValue)
      wx.request({
      url: 'https://ltpapi.xfyun.cn/v1/ke',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'X-Appid':'7d57b1eb' ,
        'X-CurTime':Date.parse(new Date())/1000 ,
        'X-Param':'eyJ0eXBlIjoiZGVwZW5kZW50In0=' ,
        'X-CheckSum': md5("ea1f7747e6ff8c92539168ac033a3be5" + Date.parse(new Date())/1000 + "eyJ0eXBlIjoiZGVwZW5kZW50In0="),
      },
      method:"POST",
      // if(){
      data: {
        'Content-Type':'application/json',
        text:that.data.inputValue.value,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
      },
      
      success: function(res) {
        //这里就是请求成功后，进行一些函数操作
        that.setData({

        })
        console.log(that.data.inputValue)
        console.log(res)
        if(res.data.data.ke[0].final){
        var ArrayData = JSON.stringify(res.data.data.ke);

        console.log(ArrayData)
        wx.navigateTo({
          url: '../ShowKeyWords/ShowKeyWords?ArrayData='+ArrayData,
        })
      }
        else{
          var ArrayData = JSON.stringify(res.data.data.ke);
        console.log(ArrayData)
        wx.navigateTo({
          url: '../ShowKeyWordsTwo/ShowKeyWordsTwo?ArrayData='+ArrayData,
        })
        } 
      },
      fail:function(res) {
        console.error(res)
      } 
    })}
    else if(this.data.inputValue){
      console.log(that.data.inputValue)
      wx.request({
      url: 'https://ltpapi.xfyun.cn/v1/ke',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'X-Appid':'7d57b1eb' ,
        'X-CurTime':Date.parse(new Date())/1000 ,
        'X-Param':'eyJ0eXBlIjoiZGVwZW5kZW50In0=' ,
        'X-CheckSum': md5("ea1f7747e6ff8c92539168ac033a3be5" + Date.parse(new Date())/1000 + "eyJ0eXBlIjoiZGVwZW5kZW50In0="),
      },
      method:"POST",
      // if(){
      data: {
        'Content-Type':'application/json',
        text:that.data.inputValue,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
      },
      
      success: function(res) {
        //这里就是请求成功后，进行一些函数操作
        that.setData({

        })
        console.log(that.data.inputValue)
        console.log(res)
        if(res.data.data.ke[0].final){
        var ArrayData = JSON.stringify(res.data.data.ke);

        console.log(ArrayData)
        wx.navigateTo({
          url: '../ShowKeyWords/ShowKeyWords?ArrayData='+ArrayData,
        })
      }
        else{
          var ArrayData = JSON.stringify(res.data.data.ke);
        console.log(ArrayData)
        wx.navigateTo({
          url: '../ShowKeyWordsTwo/ShowKeyWordsTwo?ArrayData='+ArrayData,
        })
        } 
      },
      fail:function(res) {
        console.error(res)
      } 
    })
    }
    
  },
    picToTxt() {
      const that = this
      wx.chooseImage({
        success: (res) => {
          //获取图片的临时路径
          const tempFilePath = res.tempFilePaths[0]
          //根据官方的要求  用base64字符编码获取图片的内容
          wx.getFileSystemManager().readFile({
            filePath: tempFilePath,
            encoding: 'base64',
            success: function (res) {
              //调用方法
              that.getImgInfo(res.data)
            },
          })
        },
      })
    },
    //根据图片的内容调用API获取图片文字
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
            image: imageData
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
            wx.hideLoading()
            var ArrayData = JSON.stringify(res.data.words_result);
        console.log(ArrayData.length)
        console.log(res.data.words_result)
        if(res.data.words_result==''){
          // console.log('抱歉未能识别')
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
        var ConTent=''
        for (let index = 0; index < res.data.words_result.length; index++) {
          ConTent+=res.data.words_result[index].words
          console.log(res.data.words_result[index].words)
        }
        console.log(ConTent)
        that.setData({
          inputValue:ConTent
        })
        console.log(that.data.inputValue)
        var ArrayData = JSON.stringify(that.data.inputValue);
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
    CopyContent:function (e) {
      // copy: function (e) {
        var that = this;
        if(that.data.Content==''){
          wx.showModal({
            title: '提示',
            content: '内容为空',
            success: function (res) {
             if (res.confirm) {
              console.log('确定')
             } else if (res.cancel) {
              console.log('取消')
             }
            }
           })
        }
       else{ wx.setClipboardData({
         data: that.data.Content,
         success: function (res) {
          wx.showModal({
           title: '提示',
           content: '复制成功',
           success: function (res) {
            if (res.confirm) {
             console.log('确定')
            } else if (res.cancel) {
             console.log('取消')
            }
           }
          })
         }
        });}
      //  },
      
      
    },
    getBaiduToken: function () {
      return new Promise(resolve => {
        var APIKEY = "sojWtHEsr8xbEKeBMRcDETFr"
        var SECKEY = "4p3ASteMj4mXRlq2un0yho25AUZGaDuy"
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
      }).catch((err)=>console.log(err))
      
    },
  
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
