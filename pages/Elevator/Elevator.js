
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    Year:"",
    Month:"",
    Day:"",
    Hour:"",
    Min:"",
    Second:"",
    Target:[],
    currentFloor:0,
    usrFloor:0,
    beaconStatus:1,
    direction:0,
    pickerArray:[0,1,2,3,4],
    pickerValue:0
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    pickerChange(e){
      this.setData({
        pickerValue:e.detail.value,
        usrFloor:e.detail.value
      })
    },
    deleteTarget(i){
      let j=this.data.Target.indexOf(i);
      this.data.Target.splice(j,1)
    },
    call(floor){
      if(this.data.Target.includes(floor)){
        this.deleteTarget(floor)
        if(floor==1){
            this.setData({
              floor1:"white"
        })}
        else if(floor==2){
          this.setData({
            floor2:"white"
        })}
        else if(floor==3){
          this.setData({
            floor3:"white"
        })}
        else if(floor==4){
          this.setData({
            floor4:"white"
        })}
      }else{
        this.data.Target.push(floor);
        if(floor==1){
          this.setData({
            floor1:"red"
         })}
        else if(floor==2){
          this.setData({
            floor2:"red"
        })}
        else if(floor==3){
          this.setData({
            floor3:"red"
        })}
        else if(floor==4){
          this.setData({
            floor4:"red"
        })}
      }
      console.log(this.data.Target)
    },
    callone(){
      this.call(1);
    },
    calltwo(){
      this.call(2);
    },
    callthree(){
      this.call(3);
    },
    callfour(){
      this.call(4);
    },
    request(){
      for(let i=0;i<this.data.Target.length;i++){
        let userFloor
        if(this.data.pickerValue!=0){
          userFloor=this.data.pickerValue
        }
        else{
          userFloor=this.data.usrFloor
        }
        wx.request({
          url: '',
          data: {
            "usrcurfloor":userFloor,
            "usrtarfloor":parseInt(this.data.Target[i])
          },
          method: "POST",
          success: (res) => {
            this.setData({
              currentFloor:res.data.usrcurfloor
            }),
            wx.showToast({
              title: 'Success！',
              icon:'success'
            })
          },
          fail: (res) => {
            console.log('请求失败'),
            console.log(res.errMsg)
            wx.showToast({
              title: 'Fail!',
              icon:'none'
            })
          },
          complete: (res) => {
            console.log('请求完成')
          },
        })
      }
    } ,

    begin() {
      var that = this;
      //搜索beacons
      searchBeacon();
      //搜索函数
      function searchBeacon() {
        //检测蓝牙状态
        wx.openBluetoothAdapter({   
          success: function (res) {
            //蓝牙状态：打开
            wx.startBeaconDiscovery({//开始搜索附近的iBeacon设备
              uuids: ['fda50693-a4e2-4fb1-afcf-c6eb07647825'],//参数uuid
              success: function (res) {
                wx.onBeaconUpdate(function (res) {
                  success:{//监听 iBeacon 设备的更新事件 
                  that.setData({
                    beaconStatus:0
                  })
                  //封装请求数据 
                  var beacons = res.beacons;
                  var reqContent = {};
                  var bleArray = [];
                  var bleObj = {};
                  var max=beacons[0].rssi;
                  var a=0;
                  for (var i = 0; i < beacons.length; i++) {
                    bleObj.distance = beacons[i].accuracy;
                    bleObj.rssi = beacons[i].rssi;
                    bleObj.mac = beacons[i].major  + ":" + beacons[i].minor;  
                    bleArray.push(bleObj);
                  }
                    for (var i = 1, ilen = beacons.length; i < ilen; i += 1) {
                      if (beacons[i].rssi > max) {
                        max = beacons[i].rssi,
                        a=i
                      } 
                    }
                    if(that.data.pickerValue==0){
                      that.setData({
                      usrFloor:beacons[a].major
                    })
                    }

                    console.log('用户所在楼层：'+this.data.usrFloor+'F');
                  
                  reqContent.ble = bleArray;
                  //redisSave(reqContent);
                  }
                });
                fail: console.log('无法监听iBeacon设备更新事件');
              },
              fail: function (res) {
                //先关闭搜索再重新开启搜索,这一步操作是防止重复wx.startBeaconDiscovery导致失败
                wx.stopBeaconDiscovery({
                  success: function () {
                  }
                })
                that.setData({
                  beaconStatus:1
                })
              }
            })
          },
          fail: function (res) {//蓝牙状态：关闭
            that.setData({
              beaconStatus:1
            })
            console.log('蓝牙未打开')
            //wx.showToast({ title: "Bluetooth can not work", icon: "none", duration: 2000 })
          }
        })
      }
  },
  Cancel(){
    for(let i=0;i<this.data.Target.length;i++){
      if(this.data.usrFloor==this.data.Target[i]){
        if(this.data.usrFloor==1){
          this.setData({
            floor1:'white'
          })
          this.deleteTarget(1)
        }
        else if(this.data.usrFloor==2){
          this.setData({
            floor2:'white'
          })
          this.deleteTarget(2)
        }
        else if(this.data.usrFloor==3){
          this.setData({
            floor3:'white'
          })
          this.deleteTarget(3)
        }
        else if(this.data.usrFloor==4){
          this.setData({
            floor4:'white'
          })
          this.deleteTarget(4)
        }
      }
    }
  },
  setDate(){
    let d=new Date();
    this.setData({
    Year:d.getFullYear(),
    Month:d.getMonth()<9?"0"+(d.getMonth()+1):(d.getMonth()+1),
    Day:d.getDate()<10?"0"+d.getDate():d.getDate(),
    Hour:d.getHours()<10?"0"+d.getHours():d.getHours(),
    Min:d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes(),
    Second:d.getSeconds()<10? "0"+d.getSeconds():d.getSeconds(),
    })
  },
  getData(){
    if(this.data.beaconStatus){
      this.begin();
    }
    wx.request({
      url: '',
      method: "GET",
      success: (res) => {
        this.setData({
          currentFloor:res.data.elefloor,
          direction:res.data.direction
        })
      },
      fail: (res) => {
        console.log('请求失败'),
        console.log(res.errMsg)
      },
      complete: (res) => {
        console.log('电梯楼层:'+res.data.elefloor+'F')
      },
    })
  }
},
  attached:function(){
    setInterval(()=>{
      this.setDate();
      this.getData();
      this.Cancel();
    },1000);
  }
})
