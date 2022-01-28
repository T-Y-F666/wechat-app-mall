Page({
  data: {
    imgList: [
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/LD%40PL%2530V%40%5B%7B%24TQQOSHU081.png",
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/P(R0M%24ON%25RG5JM%253Q)SWB%7BU.png",
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/P(R0M%24ON%25RG5JM%253Q)SWB%7BU.png",
      "https://636c-cloud1-8gg5m3b955bdc7a0-1307943554.tcb.qcloud.la/%24NZ4EH7(KP()Q%60M1Y3KI8EA.png"
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
