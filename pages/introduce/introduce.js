// pages/introduce/introduce.js
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
    Temperature:0,
    Humidity:0,
    Lux:0,
    acc:{
      x:0,
      y:0,
      z:0
    },
    smoke:false,
    human:false,
    LED:false,
    ELE:false,
    BEE:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    control1(e){
      wx.request({
        url: '',
        data: {
          "alarm": e.detail.value,
          "led": this.data.LED,
          "motor":this.data.ELE
        },
        method: "POST",
        success: (res) => {
          console.log('Success Control!')
          console.log(this.data.BEE, this.data.LED,this.data.ELE)
          wx.showToast({
            title: 'Success Control!',
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
        }
      })
    },
    control2(e){
      wx.request({
        url: '',
        data: {
          "alarm": this.data.BEE,
          "led": e.detail.value,
          "motor":this.data.ELE
        },
        method: "POST",
        success: (res) => {
          console.log('Success Control!')
          console.log(this.data.BEE, this.data.LED,this.data.ELE)
          wx.showToast({
            title: 'Success Control!',
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
        }
      })
    },
    control3(e){
      wx.request({
        url: '',
        data: {
          "alarm": this.data.BEE,
          "led": this.data.LED,
          "motor":e.detail.value
        },
        method: "POST",
        success: (res) => {
          console.log('Success Control!')
          console.log(this.data.BEE, this.data.LED,this.data.ELE)
          wx.showToast({
            title: 'Success Control!',
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
        }
      })
    },
    getData(){
      wx.request({
        url: '',
        method: "GET",
        success: (res) => {
          this.setData({
            Temperature:res.data.temp,
            Humidity:res.data.hum,
            Lux:res.data.lux,
            acc:res.data.ac,
            human:res.data.ray,
            smoke:res.data.smog
          })
        },
        fail: (res) => {
          console.log('请求失败'),
          console.log(res.errMsg)
        },
        complete: (res) => {
          console.log('数据已更新')
        },
      }),
      wx.request({
        url: '',
        method: "GET",
        success: (res) => {
          this.setData({
            LED:res.data.led,
            BEE:res.data.alarm,
            ELE:res.data.motor
          })
        },
        fail: (res) => {
          console.log('请求失败'),
          console.log(res.errMsg)
        },
      })
    }
  },
  attached:function(){
    setInterval(()=>{
      this.setDate();
      this.getData();
    },1000);
  }
})
