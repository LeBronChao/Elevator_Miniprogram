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
    userName:"",
    password:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    login(){
      wx.reLaunch({
        url: '/pages/Elevator/Elevator',
        success:()=>{
          console.log("页面跳转成功！")
        },
        fail:(error)=>{
          console.log(error)
        }
      })
    },
    register(){
        wx.navigateTo({
          url: '/pages/Register/Register',
          success:()=>{
            console.log("页面跳转成功！")
          },
          fail:(error)=>{
            console.log(error)
          }
        })
    }
  }
})
