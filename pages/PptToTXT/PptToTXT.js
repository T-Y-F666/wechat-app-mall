Page({
  data: {
    imgList: [
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/T36IUGU%24N%256C%5BYW04B3FLUI.png",
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/%25(J0%24IJGK_J%40%5D3)%24RPL7%7D%7BV.png",
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/OLHUZ%40(N1(6U63%5B32DHD%25WI.png",
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/1AZ9_KEG~U5M%60G977AHUYH6.png",
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/VDC8HYCT%7BA5%5DMO%7B%60P%7BNO%24%40V.png",
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/VDC8HYCT%7BA5%5DMO%7B%60P%7BNO%24%40V.png"
    ]
  },
  //预览图片，放大预览
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  }
})
