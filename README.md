# 面对面翻译小程序


面对面翻译小程序是微信团队针对中英文面对面沟通的场景开发的流式语音翻译小程序，基于微信同声传译插件封装实现，提供了中英文语音识别，文本翻译等功能。



## 预览
![面对面翻译小程序](image/qr.jpg)


## 下载与使用

1. 克隆代码
2. `project.config.json` 中的 `appid` 替换成在公众平台申请的项目 id
3. 在 `公众平台 → 设置 → 第三方服务 → 插件管理` 中 添加微信同声传译插件 (`wx069ba97219f66d99`)
4. 打开微信开发者工具中添加项目


## 微信版本要求

基础库版本 >= `1.9.94`

- 使用插件，需要基础库版本 >= `1.9.6`
- 插件内调用`wx.getRecorderManager`接口，需要基础库版本 >= `1.9.94`


## 微信同声传译插件支持功能

- 语音识别 (目前支持 `zh_CN（中国大陆）`,  `en_US（英语）`, `zh_HK（粤语）`, `sichuanhua`（四川话）)
- 文本翻译 (目前支持 `zh_CN（中国大陆）`,  `en_US（英语）`)
- 语音合成 (目前支持 `zh_CN（中国大陆）`,  `en_US（英语）`)

## FAQ

### 什么时候开放英语语音合成？

~~插件语音合成支持`en_US（英语）`正在加紧开发中~~

插件语音合成目前已经支持`en_US（英语）`

对于插件有新需求，可描述具体使用场景发送邮件至`lethexie@tencent.com`



## License
![68B77F8EE7ED4DDAB705E93A545DF03C](https://user-images.githubusercontent.com/85571081/151598426-9ef0cdc5-351a-4d2d-b384-e2fbaf72b1f6.gif)
图1产品功能图Fig.1 Product function diagram



关键字提取及权重分析
用户可结合自身需求，通过文本或图片的方式上传所需提取内容，进行关键字内容的检索及其权重分析。并通过 ECharts将关键字所占权重进行可视化分析，以此将文档的核心内容直观的向用户展示，使用户可以快速准确的获取关键信息，进而提高学习效率。

![70602701B2FC4C968A93F08AE45C081E](https://user-images.githubusercontent.com/85571081/151598466-78cf7acc-31df-4c67-9fb8-8723b1d19d47.jpg)
![FC4322FE8D914B0589BD5E92510597B7](https://user-images.githubusercontent.com/85571081/151598510-671fa697-eedb-4318-8eae-345be74c9443.jpg)
 图2关键字提取及权重分析功能展示Fig.2 Keywordextraction and weight analysis function display

![B9C1FCB99EFD4809AAC358BE4AABDCBE](https://user-images.githubusercontent.com/85571081/151598564-e4e89dd8-782b-4955-b064-274156e92061.jpg)
![340164B887A549D4BBCA7587C6D5BBBC](https://user-images.githubusercontent.com/85571081/151598592-82699b92-7e99-4112-b715-ade4b38efa7d.jpg)


![3848A3B77364403892AF4D98707B5F40](https://user-images.githubusercontent.com/85571081/151598676-013f16e8-f751-4dbb-a934-3fbb7c23f127.jpg)
![07EB5957EAD0446FB36F5797E86B239E](https://user-images.githubusercontent.com/85571081/151598683-80cc99ae-43bf-46fb-8ffb-d6844466cb38.jpg)
![E19098960FA34D479BFE07526652D397](https://user-images.githubusercontent.com/85571081/151598711-2444cba1-922e-4d20-a354-cb667404c091.jpg)

![E34AD92C0FFD4A709C8746674B93042F](https://user-images.githubusercontent.com/85571081/151598721-e58a421c-2497-4c41-aa53-e5594fb7043a.jpg)
![D4CF646828E3481597E901589A4F2D58](https://user-images.githubusercontent.com/85571081/151598733-be4bb6eb-2f8c-4067-9c58-9e0bb37a5e93.jpg)
![E19098960FA34D479BFE07526652D397](https://user-images.githubusercontent.com/85571081/151598704-df55c481-ecdd-4543-baa5-db3dd708acc0.jpg)
（3）英语长难句分析使用对象可根据自身需求，以文本，语音或图片的方式上传所需解析的长难句内容，便可获取词语构成、词语词性、语句关系等信息。使用户可以快速，精确的了解语句结构，提高用户对于长难句的理解能力。 图4：英语长难句分析功能展示Fig.4 Displayof English long and difficult sentence analysis function
[The MIT License](./LICENSE.txt)




