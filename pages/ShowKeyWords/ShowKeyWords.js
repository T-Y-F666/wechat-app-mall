// pages/ShowKeyWords/ShowKeyWords.js
var wxCharts = require('dist_wxcharts.js');
var app = getApp();
var pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    console.log(options.ArrayData)
    var ArrayData = JSON.parse(options.ArrayData)
    console.log(ArrayData)
      that.setData({
        ArrayData: ArrayData,
      })

      console.log((ArrayData.length))
      var windowWidth = 320;

        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
      var windowWidth = 320;
      if(ArrayData[0].score){
        if(ArrayData.length==1){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                // data: /*15*/parseFloat(ArrayData[0].final),
                data:parseFloat(ArrayData[0].score),
            }, 
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        }
        else　if(ArrayData.length==2){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                // data: /*15*/parseFloat(ArrayData[0].final),
                data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                // data: /*35*/parseFloat(ArrayData[1].final),
                data:parseFloat(ArrayData[1].score),
            }, 
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        }
        else　if(ArrayData.length==3){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                data:parseFloat(ArrayData[1].score),
            }, {
                name: /*'成交量3'*/ArrayData[2].word,
                data:parseFloat(ArrayData[2].score),
            }, 
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        }
        else　if(ArrayData.length==4){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                // data: /*15*/parseFloat(ArrayData[0].final),
                data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                // data: /*35*/parseFloat(ArrayData[1].final),
                data:parseFloat(ArrayData[1].score),
            }, {
                name: /*'成交量3'*/ArrayData[2].word,
                // data: /*78*/parseFloat(ArrayData[2].final),
                data:parseFloat(ArrayData[2].score),
            }, {
                name: /*'成交量4'*/ArrayData[3].word,
                // data: /*?63*/parseFloat(ArrayData[3].final),
                data:parseFloat(ArrayData[3].score),
            },
            
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });  
        }
        else　if(ArrayData.length==5){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                // data: /*15*/parseFloat(ArrayData[0].final),
                data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                // data: /*35*/parseFloat(ArrayData[1].final),
                data:parseFloat(ArrayData[1].score),
            }, {
                name: /*'成交量3'*/ArrayData[2].word,
                // data: /*78*/parseFloat(ArrayData[2].final),
                data:parseFloat(ArrayData[2].score),
            }, {
                name: /*'成交量4'*/ArrayData[3].word,
                // data: /*?63*/parseFloat(ArrayData[3].final),
                data:parseFloat(ArrayData[3].score),
            },
             {
                name: /*'成交量2'*/ArrayData[4].word,
                // data: /*35*/parseFloat(ArrayData[4].final),
                data:parseFloat(ArrayData[4].score),
            },
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        }
        else　if(ArrayData.length==6){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                // data: /*15*/parseFloat(ArrayData[0].final),
                data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                // data: /*35*/parseFloat(ArrayData[1].final),
                data:parseFloat(ArrayData[1].score),
            }, {
                name: /*'成交量3'*/ArrayData[2].word,
                // data: /*78*/parseFloat(ArrayData[2].final),
                data:parseFloat(ArrayData[2].score),
            }, {
                name: /*'成交量4'*/ArrayData[3].word,
                // data: /*?63*/parseFloat(ArrayData[3].final),
                data:parseFloat(ArrayData[3].score),
            },
             {
                name: /*'成交量2'*/ArrayData[4].word,
                // data: /*35*/parseFloat(ArrayData[4].final),
                data:parseFloat(ArrayData[4].score),
            },{
              name: /*'成交量1'*/ArrayData[5].word,
              // data: /*15*/parseFloat(ArrayData[5].final),
              data:parseFloat(ArrayData[5].score),
          },
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        }
        else　if(ArrayData.length==7){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                // data: /*15*/parseFloat(ArrayData[0].final),
                data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                // data: /*35*/parseFloat(ArrayData[1].final),
                data:parseFloat(ArrayData[1].score),
            }, {
                name: /*'成交量3'*/ArrayData[2].word,
                // data: /*78*/parseFloat(ArrayData[2].final),
                data:parseFloat(ArrayData[2].score),
            }, {
                name: /*'成交量4'*/ArrayData[3].word,
                // data: /*?63*/parseFloat(ArrayData[3].final),
                data:parseFloat(ArrayData[3].score),
            },
             {
                name: /*'成交量2'*/ArrayData[4].word,
                // data: /*35*/parseFloat(ArrayData[4].final),
                data:parseFloat(ArrayData[4].score),
            },{
              name: /*'成交量1'*/ArrayData[5].word,
              // data: /*15*/parseFloat(ArrayData[5].final),
              data:parseFloat(ArrayData[5].score),
          }, {
              name: /*'成交量2'*/ArrayData[6].word,
              // data: /*35*/parseFloat(ArrayData[6].final),
              data:parseFloat(ArrayData[6].score),
          },
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        }
        else　if(ArrayData.length==8){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                // data: /*15*/parseFloat(ArrayData[0].final),
                data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                // data: /*35*/parseFloat(ArrayData[1].final),
                data:parseFloat(ArrayData[1].score),
            }, {
                name: /*'成交量3'*/ArrayData[2].word,
                // data: /*78*/parseFloat(ArrayData[2].final),
                data:parseFloat(ArrayData[2].score),
            }, {
                name: /*'成交量4'*/ArrayData[3].word,
                // data: /*?63*/parseFloat(ArrayData[3].final),
                data:parseFloat(ArrayData[3].score),
            },
             {
                name: /*'成交量2'*/ArrayData[4].word,
                // data: /*35*/parseFloat(ArrayData[4].final),
                data:parseFloat(ArrayData[4].score),
            },{
              name: /*'成交量1'*/ArrayData[5].word,
              // data: /*15*/parseFloat(ArrayData[5].final),
              data:parseFloat(ArrayData[5].score),
          }, {
              name: ArrayData[6].word,
              data:parseFloat(ArrayData[6].score),
          }, {
              name: ArrayData[7].word,
              data:parseFloat(ArrayData[7].score),
          },
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        }
        else　if(ArrayData.length==9){
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                // data: /*15*/parseFloat(ArrayData[0].final),
                data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                // data: /*35*/parseFloat(ArrayData[1].final),
                data:parseFloat(ArrayData[1].score),
            }, {
                name: /*'成交量3'*/ArrayData[2].word,
                // data: /*78*/parseFloat(ArrayData[2].final),
                data:parseFloat(ArrayData[2].score),
            }, {
                name: /*'成交量4'*/ArrayData[3].word,
                // data: /*?63*/parseFloat(ArrayData[3].final),
                data:parseFloat(ArrayData[3].score),
            },
             {
                name: /*'成交量2'*/ArrayData[4].word,
                // data: /*35*/parseFloat(ArrayData[4].final),
                data:parseFloat(ArrayData[4].score),
            },{
              name: /*'成交量1'*/ArrayData[5].word,
            //   data: /*15*/parseFloat(ArrayData[5].final),
              data:parseFloat(ArrayData[5].score),
          }, {
              name: /*'成交量2'*/ArrayData[6].word,
            //   data: /*35*/parseFloat(ArrayData[6].final),
              data:parseFloat(ArrayData[6].score),
          }, {
              name: /*'成交量3'*/ArrayData[7].word,
            //   data: /*78*/parseFloat(ArrayData[7].final),
              data:parseFloat(ArrayData[7].score),
          }, {
              name: /*'成交量4'*/ArrayData[8].word,
            //   data: /*63*/parseFloat(ArrayData[8].final),
              data:parseFloat(ArrayData[8].score),
          },
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        }
        else{
        pieChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'pie',

          series: [{
            
              name: /*'成交量1'*/ArrayData[0].word,
            //   data: /*15*/parseFloat(ArrayData[0].final),
              data:parseFloat(ArrayData[0].score),
          }, {
              name: /*'成交量2'*/ArrayData[1].word,
            //   data: /*35*/parseFloat(ArrayData[1].final),
              data:parseFloat(ArrayData[1].score),
          }, {
              name: /*'成交量3'*/ArrayData[2].word,
            //   data: /*78*/parseFloat(ArrayData[2].final),
              data:parseFloat(ArrayData[2].score),
          }, {
              name: /*'成交量4'*/ArrayData[3].word,
            //   data: /*?63*/parseFloat(ArrayData[3].final),
              data:parseFloat(ArrayData[3].score),
          },
           {
              name: /*'成交量2'*/ArrayData[4].word,
            //   data: /*35*/parseFloat(ArrayData[4].final),
              data:parseFloat(ArrayData[4].score),
          },{
            name: /*'成交量1'*/ArrayData[5].word,
            // data: /*15*/parseFloat(ArrayData[5].final),
            data:parseFloat(ArrayData[5].score),
        }, {
            name: /*'成交量2'*/ArrayData[6].word,
            // data: /*35*/parseFloat(ArrayData[6].final),
            data:parseFloat(ArrayData[6].score),
        }, {
            name: /*'成交量3'*/ArrayData[7].word,
            // data: /*78*/parseFloat(ArrayData[7].final),
            data:parseFloat(ArrayData[7].score),
        }, {
            name: /*'成交量4'*/ArrayData[8].word,
            // data: /*63*/parseFloat(ArrayData[8].final),
            data:parseFloat(ArrayData[8].score),
        }, {
            name: /*'成交量2'*/ArrayData[9].word,
            // data: /*35*/parseFloat(ArrayData[9].final),
            data:parseFloat(ArrayData[9].score),
        },
          ],
          width: windowWidth,
          height: 300,
          dataLabel: true,
      });
        }
    }
    else if(ArrayData[0].final){
        if(ArrayData.length==1){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, 
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });
          }
          if(ArrayData.length==2){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, {
                  name: /*'成交量2'*/ArrayData[1].word,
                  data: /*35*/parseFloat(ArrayData[1].final),
                //   data:parseFloat(ArrayData[1].score),
              }, 
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });
          }
          if(ArrayData.length==3){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, {
                  name: /*'成交量2'*/ArrayData[1].word,
                  data: /*35*/parseFloat(ArrayData[1].final),
                //   data:parseFloat(ArrayData[1].score),
              }, {
                  name: /*'成交量3'*/ArrayData[2].word,
                  data: /*78*/parseFloat(ArrayData[2].final),
                //   data:parseFloat(ArrayData[2].score),
              }, 
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });
          }
          if(ArrayData.length==4){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, {
                  name: /*'成交量2'*/ArrayData[1].word,
                  data: /*35*/parseFloat(ArrayData[1].final),
                //   data:parseFloat(ArrayData[1].score),
              }, {
                  name: /*'成交量3'*/ArrayData[2].word,
                  data: /*78*/parseFloat(ArrayData[2].final),
                //   data:parseFloat(ArrayData[2].score),
              }, {
                  name: /*'成交量4'*/ArrayData[3].word,
                  data: /*?63*/parseFloat(ArrayData[3].final),
                //   data:parseFloat(ArrayData[3].score),
              },
              
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });  
          }
          if(ArrayData.length==5){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, {
                  name: /*'成交量2'*/ArrayData[1].word,
                  data: /*35*/parseFloat(ArrayData[1].final),
                //   data:parseFloat(ArrayData[1].score),
              }, {
                  name: /*'成交量3'*/ArrayData[2].word,
                  data: /*78*/parseFloat(ArrayData[2].final),
                //   data:parseFloat(ArrayData[2].score),
              }, {
                  name: /*'成交量4'*/ArrayData[3].word,
                  data: /*?63*/parseFloat(ArrayData[3].final),
                //   data:parseFloat(ArrayData[3].score),
              },
               {
                  name: /*'成交量2'*/ArrayData[4].word,
                  data: /*35*/parseFloat(ArrayData[4].final),
                //   data:parseFloat(ArrayData[4].score),
              },
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });
          }
          if(ArrayData.length==6){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, {
                  name: /*'成交量2'*/ArrayData[1].word,
                  data: /*35*/parseFloat(ArrayData[1].final),
                //   data:parseFloat(ArrayData[1].score),
              }, {
                  name: /*'成交量3'*/ArrayData[2].word,
                  data: /*78*/parseFloat(ArrayData[2].final),
                //   data:parseFloat(ArrayData[2].score),
              }, {
                  name: /*'成交量4'*/ArrayData[3].word,
                  data: /*?63*/parseFloat(ArrayData[3].final),
                //   data:parseFloat(ArrayData[3].score),
              },
               {
                  name: /*'成交量2'*/ArrayData[4].word,
                  data: /*35*/parseFloat(ArrayData[4].final),
                //   data:parseFloat(ArrayData[4].score),
              },{
                name: /*'成交量1'*/ArrayData[5].word,
                data: /*15*/parseFloat(ArrayData[5].final),
                // data:parseFloat(ArrayData[5].score),
            },
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });
          }
          if(ArrayData.length==7){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, {
                  name: /*'成交量2'*/ArrayData[1].word,
                  data: /*35*/parseFloat(ArrayData[1].final),
                //   data:parseFloat(ArrayData[1].score),
              }, {
                  name: /*'成交量3'*/ArrayData[2].word,
                  data: /*78*/parseFloat(ArrayData[2].final),
                //   data:parseFloat(ArrayData[2].score),
              }, {
                  name: /*'成交量4'*/ArrayData[3].word,
                  data: /*?63*/parseFloat(ArrayData[3].final),
                //   data:parseFloat(ArrayData[3].score),
              },
               {
                  name: /*'成交量2'*/ArrayData[4].word,
                  data: /*35*/parseFloat(ArrayData[4].final),
                //   data:parseFloat(ArrayData[4].score),
              },{
                name: /*'成交量1'*/ArrayData[5].word,
                data: /*15*/parseFloat(ArrayData[5].final),
                // data:parseFloat(ArrayData[5].score),
            }, {
                name: /*'成交量2'*/ArrayData[6].word,
                data: /*35*/parseFloat(ArrayData[6].final),
                // data:parseFloat(ArrayData[6].score),
            },
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });
          }
          if(ArrayData.length==8){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, {
                  name: /*'成交量2'*/ArrayData[1].word,
                  data: /*35*/parseFloat(ArrayData[1].final),
                //   data:parseFloat(ArrayData[1].score),
              }, {
                  name: /*'成交量3'*/ArrayData[2].word,
                  data: /*78*/parseFloat(ArrayData[2].final),
                //   data:parseFloat(ArrayData[2].score),
              }, {
                  name: /*'成交量4'*/ArrayData[3].word,
                  data: /*?63*/parseFloat(ArrayData[3].final),
                //   data:parseFloat(ArrayData[3].score),
              },
               {
                  name: /*'成交量2'*/ArrayData[4].word,
                  data: /*35*/parseFloat(ArrayData[4].final),
                //   data:parseFloat(ArrayData[4].score),
              },{
                name: /*'成交量1'*/ArrayData[5].word,
                data: /*15*/parseFloat(ArrayData[5].final),
                // data:parseFloat(ArrayData[5].score),
            }, {
                name: /*'成交量2'*/ArrayData[6].word,
                data: /*35*/parseFloat(ArrayData[6].final),
                // data:parseFloat(ArrayData[6].score),
            }, {
                name: /*'成交量3'*/ArrayData[7].word,
                data: /*78*/parseFloat(ArrayData[7].final),
                // data:parseFloat(ArrayData[7].score),
            },
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });
          }
          if(ArrayData.length==9){
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
    
              series: [{
                
                  name: /*'成交量1'*/ArrayData[0].word,
                  data: /*15*/parseFloat(ArrayData[0].final),
                //   data:parseFloat(ArrayData[0].score),
              }, {
                  name: /*'成交量2'*/ArrayData[1].word,
                  data: /*35*/parseFloat(ArrayData[1].final),
                //   data:parseFloat(ArrayData[1].score),
              }, {
                  name: /*'成交量3'*/ArrayData[2].word,
                  data: /*78*/parseFloat(ArrayData[2].final),
                //   data:parseFloat(ArrayData[2].score),
              }, {
                  name: /*'成交量4'*/ArrayData[3].word,
                  data: /*?63*/parseFloat(ArrayData[3].final),
                //   data:parseFloat(ArrayData[3].score),
              },
               {
                  name: /*'成交量2'*/ArrayData[4].word,
                  data: /*35*/parseFloat(ArrayData[4].final),
                //   data:parseFloat(ArrayData[4].score),
              },{
                name: /*'成交量1'*/ArrayData[5].word,
                data: /*15*/parseFloat(ArrayData[5].final),
                // data:parseFloat(ArrayData[5].score),
            }, {
                name: /*'成交量2'*/ArrayData[6].word,
                data: /*35*/parseFloat(ArrayData[6].final),
                // data:parseFloat(ArrayData[6].score),
            }, {
                name: /*'成交量3'*/ArrayData[7].word,
                data: /*78*/parseFloat(ArrayData[7].final),
                // data:parseFloat(ArrayData[7].score),
            }, {
                name: /*'成交量4'*/ArrayData[8].word,
                data: /*63*/parseFloat(ArrayData[8].final),
                // data:parseFloat(ArrayData[8].score),
            },
              ],
              width: windowWidth,
              height: 300,
              dataLabel: true,
          });
          }
          else{
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
  
            series: [{
              
                name: /*'成交量1'*/ArrayData[0].word,
                data: /*15*/parseFloat(ArrayData[0].final),
                // data:parseFloat(ArrayData[0].score),
            }, {
                name: /*'成交量2'*/ArrayData[1].word,
                data: /*35*/parseFloat(ArrayData[1].final),
                // data:parseFloat(ArrayData[1].score),
            }, {
                name: /*'成交量3'*/ArrayData[2].word,
                data: /*78*/parseFloat(ArrayData[2].final),
                // data:parseFloat(ArrayData[2].score),
            }, {
                name: /*'成交量4'*/ArrayData[3].word,
                data: /*?63*/parseFloat(ArrayData[3].final),
                // data:parseFloat(ArrayData[3].score),
            },
             {
                name: /*'成交量2'*/ArrayData[4].word,
                data: /*35*/parseFloat(ArrayData[4].final),
                // data:parseFloat(ArrayData[4].score),
            },{
              name: /*'成交量1'*/ArrayData[5].word,
              data: /*15*/parseFloat(ArrayData[5].final),
            //   data:parseFloat(ArrayData[5].score),
          }, {
              name: /*'成交量2'*/ArrayData[6].word,
              data: /*35*/parseFloat(ArrayData[6].final),
            //   data:parseFloat(ArrayData[6].score),
          }, {
              name: /*'成交量3'*/ArrayData[7].word,
              data: /*78*/parseFloat(ArrayData[7].final),
            //   data:parseFloat(ArrayData[7].score),
          }, {
              name: /*'成交量4'*/ArrayData[8].word,
              data: /*63*/parseFloat(ArrayData[8].final),
            //   data:parseFloat(ArrayData[8].score),
          }, {
              name: /*'成交量2'*/ArrayData[9].word,
              data: /*35*/parseFloat(ArrayData[9].final),
            //   data:parseFloat(ArrayData[9].score),
          },
            ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
          }
  
    }
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