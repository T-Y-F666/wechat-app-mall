import md5 from '../../utils/md5-js'
import CryptoJS from '../../utils/crypto-js'
const app = getApp();
let fs = wx.getFileSystemManager()
class SliceIdGenerator {
  constructor() {
      this.__ch = 'aaaaaaaaa'
  }

  getNextSliceId() {
      let ch = this.__ch
      let i = ch.length - 1
      while (i >= 0) {
          let ci = ch[i]
          if (ci !== 'z') {
              ch = ch.slice(0, i) + String.fromCharCode(ci.charCodeAt(0) + 1) + ch.slice(i + 1)
              break
          } else {
              ch = ch.slice(0, i) + 'a' + ch.slice(i + 1)
              i--
          }
      }
      this.__ch = ch
      return this.__ch
  }
}
Page({
  
  
  /**
   * 页面的初始数据
   */

  data :{
   
    ArrayDataJs: "",
    AllArrayDataJs: [],
    WordDataJs:"",
    AllwordJsonValue: [],
    AllwordJsValue:[],
    WordDataJson:"",
    AllwordJs:[],
    shoopingtext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    shoopingarray: [{ //商品
      id: 1,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/KUDF28O%5BDI%7BC0%7D)90UZ_PEP.png",
      title: "关键字获取",
      // status: 0,
    }, {
      id: 2,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/DIB%5BI%7B%60V%7BTX%5D7AJLUSV(0CU.png",
      title: "语义依存 (依存图) 分析(sdgp)",
      // status: 0,
      // url: ,
    },{
      id: 3,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/DIB%5BI%7B%60V%7BTX%5D7AJLUSV(0CU.png",
      title: "语义依存 (依存图) 分析(sdgp)",
      // status: 0,
      // url: ,
    },{
      id: 4,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/DIB%5BI%7B%60V%7BTX%5D7AJLUSV(0CU.png",
      title: "语义依存 (依存树) 分析(sdp)",
      // status: 0,
      // url: ,
    },{
      id: 5,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/Semantic%20Role%20Labeling.png",
      title: "语义角色标注(srl)",
      // status: 0,
      // url: ,
    },{
      id: 6,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/DIB%5BI%7B%60V%7BTX%5D7AJLUSV(0CU.png",
      title: "依存句法分析(dp)",
      // status: 0,
      // url: ,
    },{
      id: 7,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/DIB%5BI%7B%60V%7BTX%5D7AJLUSV(0CU.png",
      title: "命名实体识别(ner)",
      // status: 0,
      // url: ,
    },{
      id: 8,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/lexical%20analysis.png",
      title: "词性标注(pos)",
      // status: 0,
    },{
      id: 9,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/lexical%20analysis.png",
      title: "中文分词(cws)",
      // status: 0,
    },{
      id: 10,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/lexical%20analysis.png",
      title: "课件提取(ner)",
      // status: 0,
      // url: ,
    },{
      id: 11,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/lexical%20analysis.png",
      title: "课件提取(ner)",
      // status: 0,
    },{
      id: 12,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/lexical%20analysis.png",
      title: "长语音实时语音转写(long)",
      // status: 0,
    },{
      id: 13,
      images: "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/lexical%20analysis.png",
      title: "语音实时语音转写(short)",
      // status: 0,
    }
  ],
    imgUrls: [
      'https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/DIB%5BI%7B%60V%7BTX%5D7AJLUSV(0CU.png',
      'https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/KUDF28O%5BDI%7BC0%7D)90UZ_PEP.png',
      'https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/image3.png'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    
  },
    // 跳转到搜索页面
    // search: function () {
    //   wx.navigateTo({
    //     url: '../search/search'
    //   })
    // },
    cleanhistory: function(e) {
      this.setData({
        history: false, //隐藏历史记录
        historyArray: [], //清空历史记录数组
        newArray: [],
        shoopingtext: "" //清空搜索框
      })
    },
    search: function(e) {
      var searchtext = this.data.shoopingtext; //搜索框的值
      var sss = true;
      if (searchtext != "") {
        //将搜索框的值赋给历史数组
        this.data.historyArray.push(searchtext);
        //模糊查询 循环查询数组中的title字段
        for (var index in this.data.shoopingarray) {
          var num = this.data.shoopingarray[index].title.indexOf(searchtext);
          let temp = 'shoopingarray[' + index + '].status';
          if (num != -1) { //不匹配的不显示
            this.setData({
              [temp]: 1,
            })
            sss = false //隐藏未找到提示
          }
        }
        this.setData({
          history: false, //隐藏历史记录
          noneview: sss, //隐藏未找到提示
          shoppinglist: true, //显示商品列表
          newArray: this.data.historyArray //给新历史记录数组赋值
        })
      } else {
        this.setData({
          noneview: true, //显示未找到提示
          shoppinglist: false, //隐藏商品列表
          history: false, //隐藏历史记录
        })
      }
    },
    shoppinginput: function(e) {
      //当删除input的值为空时
      if (e.detail.value == "") {
        this.setData({
          history: true, //显示历史记录
          shoppinglist: false //隐藏商品列表
        });
        //所有商品列表的状态改为0
        for (var index in this.data.shoopingarray) {
          let temp = 'shoopingarray[' + index + '].status';
          this.setData({
            [temp]: 0,
          })
        }
      }
      this.setData({
        shoopingtext: e.detail.value
      })
    },
    //点击历史记录赋值给搜索框
    textfz: function(e) {
      this.setData({
        shoopingtext: e.target.dataset.text
      })
    },
  goToCoursewareExtractionBtn: function() {
    const FILE_PIECE_SICE = 10485760  
    // const file_len01 = 
  wx.chooseMessageFile({
    
    count: 1,
    type: 'file',
    success (res) {
  //mpFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      console.log('选择',res)
      console.log(res.tempFiles[0].path)
      var ChooseMessageFile = res.tempFiles[0].path
      var SliceIdGeneratorFile = new SliceIdGenerator()
      var start = 0
      var end = start + fs.statSync(res.tempFiles[0].path).size - 1 
      var len = fs.statSync(res.tempFiles[0].path).size < FILE_PIECE_SICE ? fs.statSync(res.tempFiles[0].path).size : FILE_PIECE_SICE
      wx.request({
        // data: fromdata,
        url: 'http://raasr.xfyun.cn/api/prepare', //这里填写你的接口路径
        header: { //这里写你接口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        
        data: {//这里写你要请求的参数
          app_id: '7d57b1eb' ,
          signa:  require('crypto-js').enc.Base64.stringify(require('crypto-js').HmacSHA1(require('crypto-js').MD5("7d57b1eb" + Date.parse(new Date())/1000 ).toString(), 
          "4c4ecc05718f9303435efd4360bde0f1")),
          ts: Date.parse(new Date())/1000 ,
          file_len: fs.statSync(res.tempFiles[0].path).size,
          file_name:  res.tempFiles[0].path,
          slice_num: Math.ceil(fs.statSync(res.tempFiles[0].path).size / FILE_PIECE_SICE),
        },
        success: function(res) {
        //这里就是请求成功后，进行一些函数操作
          // var a=res.data;
          console.log(res.data)
          console.log(res.data.data)
          wx.request({
            url: 'http://raasr.xfyun.cn/api/upload', //这里填写你的接口路径
              header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                  'Content-Type': ' multipart/form-data'
              },
              method:"POST",

              // console.log(ChooseMessageFile),
              data: {
                app_id: '7d57b1eb' ,
                signa:  require('crypto-js').enc.Base64.stringify(require('crypto-js').HmacSHA1(require('crypto-js').MD5("7d57b1eb" + Date.parse(new Date())/1000 ).toString(), 
                  "4c4ecc05718f9303435efd4360bde0f1")),
                ts: Date.parse(new Date())/1000 ,
                task_id: res.data.data,
                slice_id: SliceIdGeneratorFile.getNextSliceId(),
                // content: b.getNextSliceId().content(),
                content:[67 ,58, 92, 85, 115, 101, 114, 115, 92, 65, 92, 68, 101, 115, 107, 116, 111, 112, 92, 116, 101, 115, 116, 46, 109, 112, 51]
               },
              success: function(res) {
                //这里就是请求成功后，进行一些函数操作
                console.log(res.data)
                wx.request({
            
                  url: ' https://raasr.xfyun.cn/api/merge', //这里填写你的接口路径
                    header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    data: {
                      app_id: '7d57b1eb' ,
                      signa:  require('crypto-js').enc.Base64.stringify(require('crypto-js').HmacSHA1(require('crypto-js').MD5("7d57b1eb" + Date.parse(new Date())/1000 ).toString(), 
                        "4c4ecc05718f9303435efd4360bde0f1")),
                      ts: Date.parse(new Date())/1000 ,
                      task_id: res.data.data,
                      // slice_id: 
                     },
                    success: function(res) {
                      //这里就是请求成功后，进行一些函数操作
                      console.log(res.data)
                      wx.request({
            
                        url: 'http://raasr.xfyun.cn/api/getProgress', //这里填写你的接口路径
                          header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                          },
                          data: {
                            app_id: '7d57b1eb' ,
                            signa:  require('crypto-js').enc.Base64.stringify(require('crypto-js').HmacSHA1(require('crypto-js').MD5("7d57b1eb" + Date.parse(new Date())/1000 ).toString(), 
                              "4c4ecc05718f9303435efd4360bde0f1")),
                            ts: Date.parse(new Date())/1000 ,
                            task_id: a,
                           },
                          success: function(res) {
                            //这里就是请求成功后，进行一些函数操作
                            console.log(res.data)
                            wx.request({
            
                              url: ' http://raasr.xfyun.cn/api/getResult', //这里填写你的接口路径
                                header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                },
                                data: {
                                  app_id: '7d57b1eb' ,
                                  signa:  require('crypto-js').enc.Base64.stringify(require('crypto-js').HmacSHA1(require('crypto-js').MD5("7d57b1eb" + Date.parse(new Date())/1000 ).toString(), 
                                    "4c4ecc05718f9303435efd4360bde0f1")),
                                  ts: Date.parse(new Date())/1000 ,
                                  task_id: a,
                                 },
                                success: function(res) {
                                  //这里就是请求成功后，进行一些函数操作
                                  console.log(res.data)
                      
                                  // console.log(a)
                                }
                            })
                            // console.log(a)
                          }
                      })
                      // console.log(a)
                    }
                })
                // console.log(a)
              }
          })
        },
      })
    }
  })
},
goToKeyWordsBtn: function() {
  
              wx.navigateTo({
                url: '../UploadMode/UploadMode',
              })
          
},
goRealTimeVoiceBtn:function(){
  wx.navigateTo({
    url: '../RealTimeVoice/RealTimeVoice'
  })
  
},
GoToLongSpeechRealTimeConversionBtn: function(){

            wx.request({
              url: 'ws://rtasr.xfyun.cn/v1/ws?appid=7d57b1eb&ts='+(Date.parse(new Date())/1000).toString()+'&signa='+require('crypto-js').enc.Base64.stringify(require('crypto-js').HmacSHA1(require('crypto-js').MD5("7d57b1eb" + Date.parse(new Date())/1000 ).toString(), 
              "48a2b32962cee424bcd452d63e90fd07")), //这里填写你的接口路
              // header:{
                
              //   'appid':'7d57b1eb',
              //   'ts':Date.parse(new Date())/1000 ,
              //   'signa':require('crypto-js').enc.Base64.stringify(require('crypto-js').HmacSHA1(require('crypto-js').MD5("7d57b1eb" + Date.parse(new Date())/1000 ).toString(), 
              //   "48a2b32962cee424bcd452d63e90fd07")),
              // },
              // method:"POST",
              // data: {
              //   'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
              //   // text:copy_file,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
              // },
              success: function(res) {
                console.log(res)
                console.log(res.data.data.sdgp)
                  var ArrayData = JSON.stringify(res.data.data.sdgp);
                  console.log(ArrayData)
                  wx.navigateTo({
                    url: '../SemanticDependencyGraphAnalysis/SemanticDependencyGraphAnalysis?ArrayData='+ArrayData,
                  })               
              },
              fail:function(res) {
                console.error(res)
              }
            })
},
GoToSemanticDependencyGraphAnalysis: function() {
  var that = this
  // ArrayDataJs: [{ id: 1, name: '银色' }, { id: 2, name: '白色' },{ id: 3, name: '黑色' }],
  console.log(this.data.ArrayDataJs)
  var copy_file;
  // this.data.ArrayDataJs.push({ id: 1, name: '银色' }),
  console.log(this.data.ArrayDataJs)
  // this.data.ArrayDataJs.push({ id: 2, name: '白色' }),

  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success (res) {
      fs.readFile({
        filePath: res.tempFiles[0].path,
        encoding: 'utf-8',
        position: 0,
        success(res) {
          console.log(res.data)
          copy_file=res.data
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
        }
      })
  }
})
},
GoToSemanticDependencyTreeAnalysis:function(){
  var that = this
  // ArrayDataJs: [{ id: 1, name: '银色' }, { id: 2, name: '白色' },{ id: 3, name: '黑色' }],
  console.log(this.data.ArrayDataJs)
  var copy_file;
  // this.data.ArrayDataJs.push({ id: 1, name: '银色' }),
  console.log(this.data.ArrayDataJs)
  // this.data.ArrayDataJs.push({ id: 2, name: '白色' }),

  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success (res) {
      fs.readFile({
        filePath: res.tempFiles[0].path,
        encoding: 'utf-8',
        position: 0,
        success(res) {
          console.log(res.data)
          copy_file=res.data
          console.log(copy_file)
            wx.request({
              url: 'http://ltpapi.xfyun.cn/v1/sdp', //这里填写你的接口路
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
                console.log(res.data.data.sdp.length)
                  var ArrayData = JSON.stringify(res.data.data.sdp);
                  for (let i = 0; i < res.data.data.sdp.length; i++) {
                    if(res.data.data.sdp[i].relate=='Agt'){
                      console.log(copy_file[(res.data.data.sdp[i].parent)]+'为所属关系')
                      that.setData({
                        ArrayDataJs: {id:i,content:copy_file[(res.data.data.sdp[i].parent)]+'为所属关系'},  //录音状态
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdp[i].relate=='Root'){
                      console.log(copy_file[(res.data.data.sdp[i].parent)]+'为全句核心节点')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdp[i].parent)]+' : 为全句核心节点'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdp[i].relate=='Datv'){
                      console.log(copy_file[(res.data.data.sdp[i].parent)]+'涉事关系')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdp[i].parent)]+' : 涉事关系'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdp[i].relate=='eSucc'){
                      console.log(copy_file[(res.data.data.sdp[i].parent)]+'顺承关系')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdp[i].parent)]+' : 顺承关系'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdp[i].relate=='ePurp'){
                      console.log(copy_file[(res.data.data.sdp[i].parent)]+'目的关系')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdp[i].parent)]+' : 目的关系'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                    else if(res.data.data.sdp[i].relate=='Pat'){
                      console.log(copy_file[(res.data.data.sdp[i].parent)]+'受事关系')
                      that.setData({
                        ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdp[i].parent)]+' : 受事关系'}
                      })
                      that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    }
                  }
                  console.log(that.data.AllArrayDataJs)
                  var FormatArrayData = JSON.stringify(that.data.AllArrayDataJs)
                  wx.navigateTo({
                    url: '../DependencyTreeAnalysis/DependencyTreeAnalysis?FormatArrayData='+FormatArrayData,
                  })               
                  console.log(that.data.AllArrayDataJs)
              },
              fail:function(res) {
                console.error(res)
              }
            })
        }
      })
  }
})
},
goHelpDocumentationBtn: function() {
    wx.navigateTo({
    url: '../HelpDocumentation/HelpDocumentation'
  })
},
ChineseEnglishRealTimeTranslation:function(){
  wx.navigateTo({
    url: '../index/index'
  })
},
EnglishSemanticAnalysis:function(){
  const config = {
    // 请求地址
    hostUrl: "https://ntrans.xfyun.cn/v2/ots",
    host: "ntrans.xfyun.cn",
    //在控制台-我的应用-机器翻译获取
    appid: "1ba77f8f",
    //在控制台-我的应用-机器翻译获取
    apiSecret: "M2ZkMjBjZGI2MzJiODFmNjQyZTFhM2Q4",
    //在控制台-我的应用-机器翻译获取
    apiKey: "b05def7fe43739e22819a482de468482",
    uri: "/v2/ots"
  }
  let transVar = {
    text: "I finally got through this interface",//待翻译文本
    from: "en",//源语种
    to: "cn"//目标语种
  }
  let date = (new Date().toUTCString())
  let postBody = getPostBody(transVar.text, transVar.from, transVar.to)
  let digest = getDigest(postBody)
  wx.request({

    
    url: config.hostUrl,
    header:{
        'Content-Type': 'application/json',
        'Accept': 'application/json,version=1.0',
        'Host': config.host,
        'Date': date,
        'Digest': digest,
        'Authorization': getAuthStr(date, digest)

    },
    method:"POST",
    json: true,
    data: postBody,
    success: function(res) {
      //这里就是请求成功后，进行一些函数操作
      // console.log(res.data.data.trans_result.dst)
      console.log(res)
      var ArrayData = JSON.stringify(res.data.data.ke);
      console.log(ArrayData)
      wx.navigateTo({
        url: '../ChineseEnglishTranslation/ChineseEnglishTranslation?ArrayData='+ArrayData,
      })
    },
    fail:function(res) {
      console.error(res)
    } 
  })
  function getPostBody(text, from, to) {
    let digestObj = {
    //填充common
      common: {
        app_id: config.appid
      },
    //填充business
      business:{
        from: from,
        to : to
      },
    //填充data
      data:{
        text: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
      }
    }
    return digestObj
  }
  
  // 请求获取请求体签名
  function getDigest(body) {
    return 'SHA-256=' + CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(body)))
  }
  
  // 鉴权签名
  function getAuthStr(date, digest) {
    let signatureOrigin = `host: ${config.host}\ndate: ${date}\nPOST ${config.uri} HTTP/1.1\ndigest: ${digest}`
    let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
    let signature = CryptoJS.enc.Base64.stringify(signatureSha)
    let authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line digest", signature="${signature}"`
    return authorizationOrigin
  }
},
PrintedCharacterRecognition:function () {
  const config = {
    // 印刷文字识别 webapi 接口地址
    hostUrl: "https://webapi.xfyun.cn/v1/service/v1/ocr/general",
    host: "webapi.xfyun.cn",
    //在控制台-我的应用-印刷文字识别获取
    appid: "1ba77f8f",
    // 接口密钥(webapi类型应用开通印刷文字识别服务后，控制台--我的应用---印刷文字识别---服务的apikey)
    apiKey: "0e1d8c87cbeeae7042a12d735ea58d2a",
    uri: "/v1/ise",
    // 上传本地图片
    file: "pages/image/ocr.jpg"
  }
  let ts = parseInt(new Date().getTime() / 1000)

// let options = {
  // url: config.hostUrl,
  // headers: getReqHeader(),
  // form: getPostBody()
// }
let xParamStr = getXParamStr()
  let xCheckSum = CryptoJS.MD5(config.apiKey + ts + xParamStr).toString()
  let buffer = fs.readFileSync(config.file)
wx.request({
  url: config.hostUrl,
  header:{
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-Appid': config.appid,
    'X-CurTime': ts + "",
    'X-Param': xParamStr,
    'X-CheckSum': xCheckSum

  },
  method:"POST",
  data: {
    // 'Content-Type':'application/json',
    // text:copy_file,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
    // getPostBody()
    image: buffer.toString('base64')
  },
  success: function(res) {
    //这里就是请求成功后，进行一些函数操作
    console.log(res)
    var ArrayData = JSON.stringify(res.data.data.ke);
    console.log(ArrayData)
    wx.navigateTo({
      url: '../ShowKeyWords/ShowKeyWords?ArrayData='+ArrayData,
    })
  },
  fail:function(res) {
    console.error(res)
  } 
})
function getXParamStr() {
  let xParam = {
    language: 'cn'
  }
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(xParam)))
}

// 组装请求头
function getReqHeader() {
  let xParamStr = getXParamStr()
  let xCheckSum = CryptoJS.MD5(config.apiKey + ts + xParamStr).toString()
  return {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-Appid': config.appid,
    'X-CurTime': ts + "",
    'X-Param': xParamStr,
    'X-CheckSum': xCheckSum
  }
}


// 组装postBody
function getPostBody() {
  let buffer = fs.readFileSync(config.file)
  return {
    image: buffer.toString('base64'),
  }
}
  
},

goHelpDocumentationBtn: function() {
  wx.navigateTo({
  url: '../image/image'
})
},

GoToChineseWordSegmentation:function () {
  var that = this
  // ArrayDataJs: [{ id: 1, name: '银色' }, { id: 2, name: '白色' },{ id: 3, name: '黑色' }],
  console.log(this.data.ArrayDataJs)
  var copy_file;
  // this.data.ArrayDataJs.push({ id: 1, name: '银色' }),
  console.log(this.data.ArrayDataJs)
  // this.data.ArrayDataJs.push({ id: 2, name: '白色' }),

  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success (res) {
      fs.readFile({
        filePath: res.tempFiles[0].path,
        encoding: 'utf-8',
        position: 0,
        success(res) {
          console.log(res.data)
          copy_file=res.data
          console.log(copy_file)
            wx.request({
              url: 'http://ltpapi.xfyun.cn/v1/cws', //这里填写你的接口路
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
                console.log(res.data.data.word.length)
                  var ArrayData = JSON.stringify(res.data.data.sdgp);
                  for (let i = 0; i < res.data.data.word.length; i++) {
                    console.log(res.data.data.word[i])
                    // if(res.data.data.sdgp[i].relate=='Agt'){
                    //   console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'为所属关系')
                    //   that.setData({
                    //     ArrayDataJs: {id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'为所属关系'},  //录音状态
                    //   })
                    //   that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    // }
                    // else if(res.data.data.sdgp[i].relate=='Root'){
                    //   console.log(copy_file[(res.data.data.sdgp[i].id)]+'为全句核心节点')
                    //   that.setData({
                    //     ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+' : 为全句核心节点'}
                    //   })
                    //   that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    // }
                    // else if(res.data.data.sdgp[i].relate=='Datv'){
                    //   console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'涉事关系')
                    //   that.setData({
                    //     ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+' : 涉事关系'}
                    //   })
                    //   that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    // }
                    // else if(res.data.data.sdgp[i].relate=='eSucc'){
                    //   console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'顺承关系')
                    //   that.setData({
                    //     ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+' : 顺承关系'}
                    //   })
                    //   that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    // }
                    // else if(res.data.data.sdgp[i].relate=='ePurp'){
                    //   console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'目的关系')
                    //   that.setData({
                    //     ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+' : 目的关系'}
                    //   })
                    //   that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    // }
                    // else if(res.data.data.sdgp[i].relate=='Pat'){
                    //   console.log(copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+'受事关系')
                    //   that.setData({
                    //     ArrayDataJs:{id:i,content:copy_file[(res.data.data.sdgp[i].id)]+'<--->'+copy_file[(res.data.data.sdgp[i].parent)]+' : 受事关系'}
                    //   })
                    //   that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                    // }
                  }
                  // console.log(that.data.AllArrayDataJs)
                  var FormatArrayData = JSON.stringify(res.data.data.word)
                  wx.navigateTo({
                    url: '../ChineseWordSegmentation/ChineseWordSegmentation?FormatArrayData='+FormatArrayData,
                  })               
                  console.log(that.data.AllArrayDataJs)
              },
              fail:function(res) {
                console.error(res)
              }
            })
        }
      })
  }
})
},
GoToPartOfSpeechTagging:function () {
    var that = this
    console.log(this.data.ArrayDataJs)
    var copy_file;
    console.log(this.data.ArrayDataJs)
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        fs.readFile({
          filePath: res.tempFiles[0].path,
          encoding: 'utf-8',
          position: 0,
          success(res) {
            console.log(res.data)
            copy_file=res.data
            console.log(copy_file)
            wx.request({
              url: 'http://ltpapi.xfyun.cn/v1/cws', //这里填写你的接口路
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
                // console.log(res.data.data.word.length)
                  var ArrayData = JSON.stringify(res.data.data.sdgp);
                  for (let i = 0; i < res.data.data.word.length; i++) {
                    console.log(res.data.data.word[i])
                  }
                  console.log(res.data.data.word)
                  that.setData({
                    AllwordJs:res.data.data.word
                  })
                  console.log(that.data.AllwordJs)
                    wx.request({
                      url: 'http://ltpapi.xfyun.cn/v1/pos', //这里填写你的接口路
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
                        console.log(res.data.data.pos)
                        console.log(that.data.AllwordJs)
                        for (let i = 0; i < res.data.data.pos.length; i++) {
                          if(res.data.data.pos[i]=='r'){
                            console.log(that.data.AllwordJs[i]+'代词')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为代词'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
    
                          else if(res.data.data.pos[i]=='n'){
                            console.log(that.data.AllwordJs[i]+'为名词')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为名词'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='ns'){
                            console.log(that.data.AllwordJs[i]+'为地名')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为地名'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='wp'){
                            console.log(that.data.AllwordJs[i]+'为标点')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为标点'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='k'){
                            console.log(that.data.AllwordJs[i]+'为后缀')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为后缀'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='h'){
                            console.log(that.data.AllwordJs[i]+'为前缀')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为前缀'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='u'){
                            console.log(that.data.AllwordJs[i]+'为助词')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为助词'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='c'){
                            console.log(that.data.AllwordJs[i]+'为连词')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为连词'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='v'){
                            console.log(that.data.AllwordJs[i]+'为动词')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为动词'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='v'){
                            console.log(that.data.AllwordJs[i]+'为介词')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为介词'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                          else if(res.data.data.pos[i]=='d'){
                            console.log(that.data.AllwordJs[i]+'为副词')
                            that.setData({
                              WordDataJson: {id:i,content:that.data.AllwordJs[i]+'为副词'},  //录音状态
                            })
                            that.data.AllwordJsValue.push(that.data.WordDataJson)
                          }
                        }
                        console.log(that.data.AllwordJsValue)
                          var FormatArrayData = JSON.stringify(that.data.AllwordJsValue)
                          wx.navigateTo({
                            url: '../PartOfSpeechTagging/PartOfSpeechTagging?FormatArrayData='+FormatArrayData,
                          })               
                      },
                      fail:function(res) {
                        console.error(res)
                      }
                    })
                  var FormatArrayData = JSON.stringify(res.data.data.word)               
                  console.log(that.data.AllArrayDataJs)
              },
              fail:function(res) {
                console.error(res)
              }
            })
          }
        })
    }
  })
},
GoToNamedEntityRecognition:function () {
  var that = this
  console.log(this.data.ArrayDataJs)
  var copy_file;
  console.log(this.data.ArrayDataJs)
  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success (res) {
      fs.readFile({
        filePath: res.tempFiles[0].path,
        encoding: 'utf-8',
        position: 0,
        success(res) {
          console.log(res.data)
          copy_file=res.data
          console.log(copy_file)
          wx.request({
            url: 'http://ltpapi.xfyun.cn/v1/cws', //这里填写你的接口路
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
              console.log(res.data.data.word.length)
                var ArrayData = JSON.stringify(res.data.data.sdgp);
                for (let i = 0; i < res.data.data.word.length; i++) {
                  console.log(res.data.data.word[i])
                }
                console.log(res.data.data.word)
                that.setData({
                  AllwordJson:res.data.data.word
                })
                console.log(that.data.AllwordJson)
                  wx.request({
                    url: 'http://ltpapi.xfyun.cn/v1/ner', //这里填写你的接口路
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
                      console.log(res.data.data.ner)
                      console.log(that.data.AllwordJson)

                      for (let i = 0; i < res.data.data.ner.length; i++) {
                        if(res.data.data.ner[i]=='S-Nh'){
                          console.log(that.data.AllwordJson[i]+'为人名')
                          that.setData({
                            WordDataJs: {id:i,content:that.data.AllwordJson[i]+'为人名'},  //录音状态
                          })
                          that.data.AllwordJsonValue.push(that.data.WordDataJs)
                        }
  
                        else if(res.data.data.ner[i]=='S-Ns'){
                          console.log(that.data.AllwordJson[i]+'为地名')
                          that.setData({
                            WordDataJs: {id:i,content:that.data.AllwordJson[i]+'为地名'},  //录音状态
                          })
                          that.data.AllwordJsonValue.push(that.data.WordDataJs)
                        }
                        else if(res.data.data.ner[i]=='Ni'){
                          console.log(that.data.AllwordJson[i]+'为机构名')
                          that.setData({
                            WordDataJs: {id:i,content:that.data.AllwordJson[i]+'为机构名'},  //录音状态
                          })
                          that.data.AllwordJsonValue.push(that.data.WordDataJs)
                        }
                      }
                      console.log(that.data.AllwordJsonValue)
                        var FormatArrayData = JSON.stringify(that.data.AllwordJsonValue)
                        wx.navigateTo({
                          url: '../NamedEntityDimensions/NamedEntityDimensions?FormatArrayData='+FormatArrayData,
                        }) 
                    },
                    fail:function(res) {
                      console.error(res)
                    }
                  })
                var FormatArrayData = JSON.stringify(res.data.data.word)               
                console.log(that.data.AllArrayDataJs)
            },
            fail:function(res) {
              console.error(res)
            }
          })
        }
      })
  }
})

  
},
GoToSemanticRoleLabeling:function () {
  // GoToNamedEntityRecognition:function () {
    var that = this
    // ArrayDataJs: [{ id: 1, name: '银色' }, { id: 2, name: '白色' },{ id: 3, name: '黑色' }],
    console.log(this.data.ArrayDataJs)
    var copy_file;
    // this.data.ArrayDataJs.push({ id: 1, name: '银色' }),
    console.log(this.data.ArrayDataJs)
    // this.data.ArrayDataJs.push({ id: 2, name: '白色' }),
  
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        fs.readFile({
          filePath: res.tempFiles[0].path,
          encoding: 'utf-8',
          position: 0,
          success(res) {
            console.log(res.data)
            copy_file=res.data
            console.log(copy_file)
            wx.request({
              url: 'http://ltpapi.xfyun.cn/v1/cws', //这里填写你的接口路
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
                console.log(res.data.data.word.length)
                  var ArrayData = JSON.stringify(res.data.data.sdgp);
                  for (let i = 0; i < res.data.data.word.length; i++) {
                    console.log(res.data.data.word[i])
                  }
                  console.log(res.data.data.word)
                  that.setData({
                    AllwordJson:res.data.data.word
                  })
                  console.log(that.data.AllwordJson)
                    wx.request({
                      url: 'http://ltpapi.xfyun.cn/v1/srl', //这里填写你的接口路
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
                        console.log(res.data.data.ner)
  
                        for (let i = 0; i < res.data.data.ner.length; i++) {
                          if(res.data.data.ner[i]=='S-Nh'){
                            console.log(that.data.AllwordJson[i]+'为人名')
                            that.setData({
                              WordDataJs: {id:i,content:that.data.AllwordJson[i]+'为人名'},  //录音状态
                            })
                            that.data.AllwordJson.push(that.data.WordDataJs)
                          }
    
                          else if(res.data.data.ner[i]=='S-Ns'){
                            console.log(that.data.AllwordJson[i]+'为地名')
                            that.setData({
                              WordDataJs: {id:i,content:that.data.AllwordJson[i]+'为地名'},  //录音状态
                            })
                            that.data.AllwordJson.push(that.data.WordDataJs)
                          }
                          else if(res.data.data.ner[i]=='Ni'){
                            console.log(that.data.AllwordJson[i]+'为机构名')
                            that.setData({
                              WordDataJs: {id:i,content:that.data.AllwordJson[i]+'为机构名'},  //录音状态
                            })
                            that.data.AllwordJson.push(that.data.WordDataJs)
                          }
                        }
                        console.log(that.data.AllwordJson)
                          var FormatArrayData = JSON.stringify(that.data.AllwordJson)
                          wx.navigateTo({
                            url: '../ChineseWordSegmentation/ChineseWordSegmentation?FormatArrayData='+FormatArrayData,
                          })               
                      },
                      fail:function(res) {
                        console.error(res)
                      }
                    })
                  var FormatArrayData = JSON.stringify(res.data.data.word)               
                  console.log(that.data.AllArrayDataJs)
              },
              fail:function(res) {
                console.error(res)
              }
            })
          }
        })
    }
  })
  
    
  // },
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '更多',
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
