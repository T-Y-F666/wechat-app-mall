var app = getApp()
var url = app.globalData.url
var utils = require( '../../utils/util.js');
Page({

/**
* 页面的初始数据
*/
data: {
//用户输入的手机号
mobile: '',
//用户输入的验证码
code: '',
//服务器返回的验证码
res_code: '',
//用来控制获取验证码倒计时按钮的时效性
sendDisabled: false,
forbiddenTime: 0,
codeText: '获取验证码'
},
/**
* 手机号输入
*/
mobileChange: function (e) {
var that= this;
that.setData({
mobile: e.detail.value
});
},

/**
* 验证码输入
*/
codeChange: function (e) {
var that = this;
that.setData({
code: e.detail.value
});
},

/**
* 发送验证码
*/
sendCode: function () {
var that = this;
let mobile = that.data.mobile;
if (!mobile) {
utils.quickTip( '请输入手机号');
return;
}
if (!that.mobileValid(mobile)) {
utils.quickTip( '请输入正确的手机号');
return;
}
wx.request({
url: url + 'Wx_SendCode',
data: {
mobile: mobile
},
method: 'POST',
header: { "Content-Type": "application/x-www-form-urlencoded" },
success: function(res){
let data = res.data;
that.setData({
sendDisabled: true,
res_code:data.phone_code,
});
that.reflashTime( 120);
}
})
},
/**
* 绑定手机号
*/
bindMobile: function () {
var that= this
let mobile = that.data.mobile;
if (!mobile) {
utils.quickTip( '请输入手机号');
return;
}
let code = that.data.code;
let res_code = that.data.res_code;
if (!code) {
utils.quickTip( '请输入验证码');
return;
}
if(code==res_code){
var openid=wx.getStorageSync( 'openid');
//将手机号添加入用户信息表中
wx.request({
url: url+ 'Wx_AddPnone',
data:{
openid:openid,
mobile: that.data.mobile
},
method: 'POST',
header: { "Content-Type": "application/x-www-form-urlencoded" },
success: function(res){
console.log(res);
//提示用户
wx.showToast({
title: '绑定成功',
icon: 'success',
success: function () {
setTimeout( function () {
wx.switchTab({
url: '/pages/self/self',
});
}, 1000);
}
});
}
})
} else{
utils.quickTip( '验证码错误！');
return;
}
},
/**
* 刷新验证码重新获取时间
*/
reflashTime(time) {
var that = this;
let index = setInterval( function () {
time -= 1;
if (time <= 0) {
that.setData({
forbiddenTime: 0,
sendDisabled: false,
codeText: '获取验证码'
});
index = null;
} else {
that.setData({
forbiddenTime: time,
codeText: '重新获取' + time + 's'
});
}
}, 1000);
},
/**
* 手机号校验
*/
mobileValid(mobile) {
var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile)) {
return false;
} else {
return true;
}
},
/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
var that= this
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
