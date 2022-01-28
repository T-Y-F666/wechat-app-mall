import md5 from 'md5-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  GetVerificationCode:function(e){
    var genSignature=function(secretKey,paramsJson){
      var sorter=function(paramsJson){
          var sortedJson={};
          var sortedKeys=Object.keys(paramsJson).sort();
          for(var i=0;i<sortedKeys.length;i++){
              sortedJson[sortedKeys[i]] = paramsJson[sortedKeys[i]]
          }
          return sortedJson;
      }
      var sortedParam=sorter(paramsJson);
      var needSignatureStr="";
      for(var key in sortedParam){
          var value=sortedParam[key];
          needSignatureStr=needSignatureStr+key+value;
      }
      needSignatureStr+=secretKey;
      var md5er = crypto.createHash('md5');//MD5加密工具
      md5er.update(needSignatureStr,"UTF-8");
      return md5er.digest('hex');
  };
      function randomString(len) {
      　　len = len || 32;
      　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      　　var maxPos = $chars.length;
      　　var pwd = '';
      　　for (var i = 0; i < len; i++) {
      　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      　　}
      　　return pwd;
      }
// document.write(randomString(32));
// </script>
            
      wx.request({
        url: 'https://sms.dun.163.com/v2/sendsms', //这里填写你的接口路
        header:{
          'secretId': '475b613df85928427a106200c8f8bc20',
          'businessId':'38b58cb205cf448aa4f2af3110734fff',
          // 'cbd8b4a13acb3213fc00e53c761e8086',
          'version':'v2',
          'timestamp':Date.parse(new Date())/1000,
          'nonce':  randomString(16)+ Date.parse(new Date())/1000 ,
          'signature':md5('businessIdcbd8b4a13acb3213fc00e53c761e8086nonce'+randomString(16)+ Date.parse(new Date())/1000+'secretId475b613df85928427a106200c8f8bc20timestamp'+Date.parse(new Date())/1000+'versionv2cbd8b4a13acb3213fc00e53c761e8086'),
        },
        method:"POST",
        data: {
          'Content-Type':'Content-Type: application/x-www-form-urlencoded',
          // text:res.result,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
        },
        success: function(res) {
          //这里就是请求成功后，进行一些函数操作
          console.log('接口调用成功')   
          wx.request({
            url: 'https://sms.dun.163.com/v2/sendsms', //这里填写你的接口路
            header:{
              'secretId': '475b613df85928427a106200c8f8bc20',
              'businessId':'38b58cb205cf448aa4f2af3110734fff',
              'version':'v2',
              'timestamp':Date.parse(new Date())/1000,
              'nonce':  randomString(16)+ Date.parse(new Date())/1000 ,
              'signature':md5('businessIdcbd8b4a13acb3213fc00e53c761e8086nonce'+randomString(16)+ Date.parse(new Date())/1000+'secretId475b613df85928427a106200c8f8bc20timestamp'+Date.parse(new Date())/1000+'versionv2cbd8b4a13acb3213fc00e53c761e8086'),
              'mobile':'你的手机号',


            },
            method:"POST",
            data: {
              'Content-Type':'Content-Type: application/x-www-form-urlencoded',
              // text:res.result,//这里是需要进行关键词搜索的文档，你可以用选择文件的方法，把txt的文字提取来之后，再通过传参传到这里
            },
            success: function(res) {
              //这里就是请求成功后，进行一些函数操作
              console.log('接口调用成功')   
                           
            },
            })
        },
      var genSignature=function(secretKey,paramsJson){
        var sorter=function(paramsJson){
            var sortedJson={};
            var sortedKeys=Object.keys(paramsJson).sort();
            for(var i=0;i<sortedKeys.length;i++){
                sortedJson[sortedKeys[i]] = paramsJson[sortedKeys[i]]
            }
            return sortedJson;
        }
        var sortedParam=sorter(paramsJson);
        var needSignatureStr="";
        for(var key in sortedParam){
            var value=sortedParam[key];
            needSignatureStr=needSignatureStr+key+value;
        }
        needSignatureStr+=secretKey;
        var md5er = crypto.createHash('md5');//MD5加密工具
        md5er.update(needSignatureStr,"UTF-8");
        return md5er.digest('hex');
    };
    
  },
  formSubmit:function(e){
    console.log(e.detail.value);
    var obj = {};
    obj.username = e.detail.value.username;
    obj.password = e.detail.value.pwd;
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
      title: '普通用户注册',
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
