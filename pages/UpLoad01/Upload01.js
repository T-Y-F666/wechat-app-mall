import md5 from '../../utils/md5-js'
import CryptoJS from '../../utils/crypto-js'
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
    ],//下拉列表的数据
    // index:0//选择的下拉列表下标
    // TextContents:''
    inputValue:'',
    Content:'',
    ChineseContent:'',
    AllwordJsValue:[],
    AllArrayDataJs:[],
    AllPartOfSpeechAnalysisArrayData:[],
    AllSemanticRelation:[]
  },
  takePhoto(){	
    wx.navigateTo({
      url: '../PhotoGraph/PhotoGraph',	//跳转到自定义的一个拍照页面
    })
  },

  //index.js
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
                    // console.log(that.data.selectData[that.data.index]=='txt')
                  console.log(res)
                  fs.readFile({
                    filePath: res.tempFiles[0].path,
                    encoding: 'utf-8',
                    position: 0,
                    success(res) {
                      console.log(res.data)
                      copy_file=res.data
                      console.log(copy_file)
                      that.setData({
                        inputValue:copy_file
                      })
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
                      console.log(that.data.inputValue)
                      let transVar = {
                        text: that.data.inputValue,//待翻译文本
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
                          console.log(res)
                          console.log(res.data.data.result.trans_result.dst)
                          that.setData({
                            ChineseContent:res.data.data.result.trans_result.dst
                          })
                          var ArrayDataEnglishToChinese = JSON.stringify(res.data.data.result);
                          console.log(ArrayDataEnglishToChinese)
                          // wx.navigateTo({
                          //   url: '../ChineseEnglishTranslation/ChineseEnglishTranslation?ArrayData='+ArrayData,
                          // })
                          // var that = this
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
                              text: that.data.ChineseContent,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
                            },
                            success: function(res) {
                              console.log(res)
                              // console.log(res.data.data.word.length)
                                var ArrayDataChineseWordSegmentation = JSON.stringify(res.data.data.sdgp);
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
                                      text:that.data.ChineseContent,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
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
                                          console.log(that.data.WordDataJson)
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
                                        var PartOfSpeechAnalysisArrayData = JSON.stringify(that.data.AllwordJsValue)
                                        console.log(PartOfSpeechAnalysisArrayData)
                                        that.setData({
                                          AllPartOfSpeechAnalysisArrayData:PartOfSpeechAnalysisArrayData
                                        })
                                        // wx.navigateTo({
                                        //   url: '../PartOfSpeechTagging/PartOfSpeechTagging?FormatArrayData='+FormatArrayData,
                                        // })     
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
                                            text:that.data.ChineseContent,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
                                          },
                                          success: function(res) {
                                            console.log(res)
                                            console.log(res.data.data.sdgp.length)
                                              var ArrayData = JSON.stringify(res.data.data.sdgp);
                                              for (let i = 0; i < res.data.data.sdgp.length; i++) {
                                                if(res.data.data.sdgp[i].relate=='Agt'){
                                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'为所属关系')
                                                  that.setData({
                                                    ArrayDataJs: {id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'为所属关系'},  //录音状态
                                                  })
                                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                                }
                                                else if(res.data.data.sdgp[i].relate=='Root'){
                                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'为全句核心节点')
                                                  that.setData({
                                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+' : 为全句核心节点'}
                                                  })
                                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                                }
                                                else if(res.data.data.sdgp[i].relate=='Datv'){
                                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'涉事关系')
                                                  that.setData({
                                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+' : 涉事关系'}
                                                  })
                                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                                }
                                                else if(res.data.data.sdgp[i].relate=='eSucc'){
                                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'顺承关系')
                                                  that.setData({
                                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+' : 顺承关系'}
                                                  })
                                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                                }
                                                else if(res.data.data.sdgp[i].relate=='ePurp'){
                                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'目的关系')
                                                  that.setData({
                                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+' : 目的关系'}
                                                  })
                                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                                }
                                                else if(res.data.data.sdgp[i].relate=='Pat'){
                                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'受事关系')
                                                  that.setData({
                                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+' : 受事关系'}
                                                  })
                                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                                }
                                              }
                                              console.log(that.data.AllArrayDataJs)
                                              var SemanticRelation = JSON.stringify(that.data.AllArrayDataJs)
                                              that.setData({
                                                AllSemanticRelation:SemanticRelation
                                              })
                                              // wx.navigateTo({
                                              //   url: '../SemanticDependencyGraphAnalysis/SemanticDependencyGraphAnalysis?FormatArrayData='+FormatArrayData,
                                              // })     
                                              console.log(that.data.AllPartOfSpeechAnalysisArrayData)
                                              console.log(ArrayDataEnglishToChinese)
                                              var PartOfSpeechAnalysisArrayData = JSON.stringify(PartOfSpeechAnalysisArrayData)
                                              console.log(PartOfSpeechAnalysisArrayData)
                                              wx.navigateTo({
                                                url: '../AllFunction/AllFunction?ArrayData='+ArrayDataEnglishToChinese
                                                +'&AllPartOfSpeechAnalysisArrayData='+that.data.AllPartOfSpeechAnalysisArrayData
                                                +'&AllSemanticRelation='+that.data.AllSemanticRelation,
                                              })          
                                              console.log(that.data.AllArrayDataJs)
                                          },
                                          fail:function(res) {
                                            console.error(res)
                                          }
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
  // getInputValue:function(){
    getInputValue(e){
      this.setData({
        inputValue:e.detail
      })
      console.log(e.detail)// {value: "ff", cursor: 2}  
    },
  // },
  GoToTextSubmission:function(){
    var that = this
    // console.log(this.data.inputValue.value)
    console.log(that.data.inputValue)
    if(that.data.inputValue==''){
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
    // this.data.inputValue.value
    else {
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
        text: that.data.inputValue.value,//待翻译文本
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
          console.log(res)
          console.log(res.data.data.result.trans_result.dst)
          that.setData({
            ChineseContent:res.data.data.result.trans_result.dst
          })
          var ArrayDataEnglishToChinese = JSON.stringify(res.data.data.result);
          console.log(ArrayDataEnglishToChinese)
          // wx.navigateTo({
          //   url: '../ChineseEnglishTranslation/ChineseEnglishTranslation?ArrayData='+ArrayData,
          // })
          // var that = this
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
              text: that.data.ChineseContent,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
            },
            success: function(res) {
              console.log(res)
              // console.log(res.data.data.word.length)
                var ArrayDataChineseWordSegmentation = JSON.stringify(res.data.data.sdgp);
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
                      text:that.data.ChineseContent,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
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
                          console.log(that.data.WordDataJson)
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
                        var PartOfSpeechAnalysisArrayData = JSON.stringify(that.data.AllwordJsValue)
                        console.log(PartOfSpeechAnalysisArrayData)
                        that.setData({
                          AllPartOfSpeechAnalysisArrayData:PartOfSpeechAnalysisArrayData
                        })
                        // wx.navigateTo({
                        //   url: '../PartOfSpeechTagging/PartOfSpeechTagging?FormatArrayData='+FormatArrayData,
                        // })     
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
                            text:that.data.ChineseContent,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
                          },
                          success: function(res) {
                            console.log(res)
                            console.log(res.data.data.sdgp.length)
                              var ArrayData = JSON.stringify(res.data.data.sdgp);
                              for (let i = 0; i < res.data.data.sdgp.length; i++) {
                                if(res.data.data.sdgp[i].relate=='Agt'){
                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'为所属关系')
                                  that.setData({
                                    ArrayDataJs: {id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'为所属关系'},  //录音状态
                                  })
                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                }
                                else if(res.data.data.sdgp[i].relate=='Root'){
                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'为全句核心节点')
                                  that.setData({
                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+' : 为全句核心节点'}
                                  })
                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                }
                                else if(res.data.data.sdgp[i].relate=='Datv'){
                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'涉事关系')
                                  that.setData({
                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+' : 涉事关系'}
                                  })
                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                }
                                else if(res.data.data.sdgp[i].relate=='eSucc'){
                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'顺承关系')
                                  that.setData({
                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+' : 顺承关系'}
                                  })
                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                }
                                else if(res.data.data.sdgp[i].relate=='ePurp'){
                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'目的关系')
                                  that.setData({
                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+' : 目的关系'}
                                  })
                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                }
                                else if(res.data.data.sdgp[i].relate=='Pat'){
                                  console.log(that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+'受事关系')
                                  that.setData({
                                    ArrayDataJs:{id:i,content:that.data.ChineseContent[(res.data.data.sdgp[i].id)]+'<--->'+that.data.ChineseContent[(res.data.data.sdgp[i].parent)]+' : 受事关系'}
                                  })
                                  that.data.AllArrayDataJs.push(that.data.ArrayDataJs)
                                }
                              }
                              console.log(that.data.AllArrayDataJs)
                              var SemanticRelation = JSON.stringify(that.data.AllArrayDataJs)
                              that.setData({
                                AllSemanticRelation:SemanticRelation
                              })
                              // wx.navigateTo({
                              //   url: '../SemanticDependencyGraphAnalysis/SemanticDependencyGraphAnalysis?FormatArrayData='+FormatArrayData,
                              // })     
                              console.log(that.data.AllPartOfSpeechAnalysisArrayData)
                              console.log(ArrayDataEnglishToChinese)
                              var PartOfSpeechAnalysisArrayData = JSON.stringify(PartOfSpeechAnalysisArrayData)
                              console.log(PartOfSpeechAnalysisArrayData)
                              wx.navigateTo({
                                url: '../AllFunction/AllFunction?ArrayData='+ArrayDataEnglishToChinese
                                +'&AllPartOfSpeechAnalysisArrayData='+that.data.AllPartOfSpeechAnalysisArrayData
                                +'&AllSemanticRelation='+that.data.AllSemanticRelation,
                              })          
                              console.log(that.data.AllArrayDataJs)
                          },
                          fail:function(res) {
                            console.error(res)
                          }
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
      console.log(this.data.ChineseContent)
    }
      
    
  },
  // Page({
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
            // var AllArrayData=''
            // for(var i=0;i<res.data.words_result;++i){
            //   AllArrayData+=words[o]
            // }
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
      })
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
