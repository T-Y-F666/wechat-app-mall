import md5 from '../../utils/md5-js'
const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();
Page({

  data: {
    AllArrayDataJs:[],
    //语音
    recordState: false, //录音状态
    content:'',//hr内容
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //识别语音
    this.initRecord();
  },
  // 手动输入内容
  conInput: function (e) {
    this.setData({
      content:e.detail.value,
    })
  console.log(this.data.content)
  },
  //识别语音 -- 初始化
  initRecord: function () {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function (res) {
      console.error("error msg", res)
    }
    //识别结束事件
    manager.onStop = function (res) {
      console.log('..............结束录音')
      console.log('录音临时文件地址 -->' + res.tempFilePath); 
      console.log('录音总时长 -->' + res.duration + 'ms'); 
      console.log('文件大小 --> ' + res.fileSize + 'B');
      console.log('语音内容 --> ' + res.result);
      // resfinal = res.result
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function (res) {}
        })
        return;
      }

      var text = that.data.content + res.result;
      
      that.setData({
        content: text
      })
    }
  },
  //语音  --按住说话
  touchStart: function (e) {
    this.setData({
      recordState: true  //录音状态
    })
    // 语音开始识别
    manager.start({
      lang: 'zh_CN',// 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
    })
  },
  //语音  --松开结束
  touchEnd: function (e) {
    this.setData({
      recordState: false
    })
    // 语音结束识别
    manager.stop();
  },
  GoToGetContentKeywords: function(contenttext) { 
    console.log(this.data.content)
    wx.request({
      url: 'https://ltpapi.xfyun.cn/v1/ke', //这里填写你的接口路
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
        text:this.data.content,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
      },
      success: function(res) {
        //这里就是请求成功后，进行一些函数操作
      // console.log(this.data.content)
      

        // console.log(res.data.data.ke) 
        console.log(res)               
        var ArrayData = JSON.stringify(res.data.data.ke);  
          wx.navigateTo({
            url: '../ShowKeyWords/ShowKeyWords?ArrayData='+ArrayData,
          })
      },
      fail(res) {
        console.error(res)
      }
      })
    },
GoToSemanticDependencyGraphAnalysisBtn: function() {
  var that = this
  console.log(this.data.ArrayDataJs)
  var copy_file;
  console.log(this.data.ArrayDataJs),
          console.log(this.data.content)
          copy_file=this.data.content
          console.log(copy_file)
            wx.request({
              url: 'http://ltpapi.xfyun.cn/v1/sdgp', //这里填写你的接口路
              header:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'X-Appid':'7d57b1eb' ,
                'X-CurTime':Date.parse(new Date())/1000 ,
                'X-Param':'eyJ0eXBlIjoiZGVwZW5kZW50In0=' ,
                'X-CheckSum': md5("ea1f7747e6ff8c92539168ac033a3be5" + Date.parse(new Date())/1000 + "eyJ0eXBlIjoiZGVwZW5kZW50In0="),
              },
              method:"POST",
              data: {
                'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
                text:copy_file,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
              },
              success: function(res) {
                console.log(res)
                if(res.data.code==10109){
                  wx.showToast({
                    title: '请先输入或选择内容',
                    image:'D:/Face2FaceTranslator-master/pages/com/Warning.png',
                    duration:2000,
                  })
                }
                console.log(res.data.data.sdgp.length)
                  var ArrayData = JSON.stringify(res.data.data.sdgp);
                  for (let i = 0; i < res.data.data.sdgp.length; i++) {
                    if(res.data.data.sdgp[i].relate=='Agt'){
                      console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'为所属关系')
                      that.setData({
                        ArrayDataJs: {id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'为所属关系'},  //录音状态
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdgp[i].relate=='Root'){
                      console.log(copy_file[(res.data.data.sdgp[i].id)]+'为全句核心节点')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+' : 为全句核心节点'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdgp[i].relate=='Datv'){
                      console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'涉事关系')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+' : 涉事关系'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdgp[i].relate=='eSucc'){
                      console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'顺承关系')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+' : 顺承关系'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdgp[i].relate=='ePurp'){
                      console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'目的关系')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+' : 目的关系'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdgp[i].relate=='Pat'){
                      console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'受事关系')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+' : 受事关系'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                  }
                  console.log(that.data.AllArrayDataJs)
                  var FormatArrayData = JSON.stringify(that.data.AllArrayDataJs)
                  wx.navigateTo({
                    url: '../SemanticDependencyGraphAnalysis/SemanticDependencyGraphAnalysis?FormatArrayData='+FormatArrayData,
                  })               
                  console.log(that.data.AllArrayDataJs)
              },
              fail:function(res) {
                console.error(res)
              }
            })
},
})
