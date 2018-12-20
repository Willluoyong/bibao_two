<template>
  <el-container>
    <el-main >
      <div class="bigbox">
        <div class="biaoti"></div>
        <div class="welc">欢迎登陆</div>
        <input
          type="text"
          class="publicInput user"
          placeholder="手机号或邮箱号"
          v-model="userName"
          autocomplete="off"
        >
        <span ></span>
        <input
          type="password"
          class="publicInput password"
          placeholder="密码"
          v-model="password"
          autocomplete="off"
        >
        <div class="login_button" @click.prevent.enter="loginWay">立即登陆</div>
        <div class="loginMsg">{{loginMsg}}</div>
        <p class="copyright">
          打造基于区块链去中心化的自治全生态社区
          <a href="https://www.cococo.org">前往官网></a>
        </p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import{login,autologin}from'@/server/userApi'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      userName:'',
      password:'',
      loginMsg:'',
      uuid:'',//客户端惟一标识符。
      type:'',// 终端的类型。
      userId:'',// 用户id
      token:''// 首次登陆成功后的token
    };
  },
  methods: {
    //登录
    loginWay: function() {
      this.loginMsg = "";
      let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
      let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      let condition = /Android|iPhone|webOs|iPod|BlackBerry/i.test(window.navigator.userAgent);
      const self=this;
      if (!this.userName || !this.password){
        this.loginMsg = "账号或密码不能为空";
        return;
      }
      if(this.userName.length != 11&&!emailReg.test(this.userName)){
        this.loginMsg ='请输入正确的手机号或邮箱'
        return;
      }
      if(!phoneReg.test(this.userName)&&!emailReg.test(this.userName)){
        this.loginMsg ='请输入有效的手机号邮箱'
        return;
      }
      if (condition) {
        this.type='ANDROID';
      } else {
        this.type='PC';
      }
      let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
      let form = new FormData();
      form.append("loginName", this.userName);
      form.append("password", this.$md5(s + this.password));
      form.append("clientId", this.uuid);
      form.append("clientType",this.type);
      login(form).then(res => {
        if (res.data.status == 200) {
          // console.log("写登陆成功后处理逻辑！");
          let loginName=res.data.data.loginName;
          let exdays=res.data.data.timeout/(24*60*60*1000);
          let token=res.data.data.token;
          let userId=res.data.data.userId;
          // console.log("天数："+exdays)
          Cookies.set('gsUseId',userId,{expires:exdays});
          Cookies.set('gsToken',token,{expires:exdays});
        }else{
          this.loginMsg = res.data.message
        }
      }).catch(err => {
        console.log(err);
      })
    },

    //自动登录
    autologinWay: function() {
      let condition = /Android|iPhone|webOs|iPod|BlackBerry/i.test(window.navigator.userAgent);
      const self=this;
      if (condition) {
        this.type='ANDROID';
      } else {
        this.type='PC';
      }
      let form = new FormData();
      form.append("userId", this.userId);
      form.append("token", this.token);
      form.append("clientId", this.uuid);
      form.append("clientType",this.type);
      autologin(form).then(res => {
        if (res.data.status == 200) {
          console.log("自动登陆成功！");
          // this.$router.push(
          //   {path:"/",query: {token:token}}
          // )
        }else{
          this.loginMsg = res.data.message
        }
      }).catch(err => {
        console.log(err);
      })
    },


  },
  mounted(){
    // console.log("获取cookies："+Cookies.get('useId'));
    // console.log("获取token："+Cookies.get('token'));
    this.userId=Cookies.get('gsUseId');
    this.token=Cookies.get('gsToken');
    console.log("名子："+this.userId)
    if (this.userId!=null && this.userId !== ""&&this.token!=null && this.token !== "") {
      this.autologinWay();
    }
  },
  created(){
      this.uuid = localStorage.getItem('uuid')
      console.log('====================================');
      console.log(this.uuid);
      console.log('====================================');
      if (this.uuid == '' || this.uuid == null) {
         var d = new Date().getTime();
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
          });
          this.uuid =  uuid

          localStorage.setItem('uuid',this.uuid)
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background: url("../assets/title_banner.png") no-repeat;
  color: #333;
  text-align: center;
  width: 100%;
  height: 1080px;
  min-width: 1300px;
  .bigbox {
    width: 450px;
    height: 500px;
    margin-left: 55%;
    margin-top: 235px;
    // border: salmon solid 1px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    .biaoti {
      width: 169px;
      height: 40px;
      background: url("../assets/icon_home_logo.png") no-repeat;
    }
    .welc {
      width: 92px;
      // height: 23px;
      height: 5%;
      margin-top: 86px;
      margin-bottom: 48px;
      font-size: 23px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #322f32;
      background-color: rgba(0, 0, 0, 0);
    }
    .publicInput {
      box-sizing: border-box;
      // width: 434px;
      width: 94.4%;
      height: 56px;
      border: 1px solid rgba(165, 172, 187, 1);
      opacity: 0.8;
      border-radius: 28px;
      margin-bottom: 27px;
      outline: none;
      padding-left: 55px;
      font-size: 17px;
      color: rgba(78, 86, 103, 1);
    }
    .publicInput:hover {
      // width: 434px;
      width: 94.4%;
      height: 56px;
      border: 1px solid rgba(101, 110, 170, 1);
      opacity: 0.8;
      border-radius: 28px;
    }
    .user {
      background: url("../assets/user.png") no-repeat 16px center;
    }
    .password {
      background: url("../assets/password.png") no-repeat 16px center;
    }
    .login_button {
      // width: 434px;
      width: 94.4%;
      height: 56px;
      line-height: 56px;
      border: 1px solid #656eaa;
      opacity: 0.8;
      border-radius: 28px;
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 1);
      background-color: #656eaa;
    }
    .login_button:hover {
      background-color: #717ab6;
    }
    .loginMsg{
      color: #34c3fe;
      margin-bottom: 5px;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0);
    }
    .copyright {
      // width: 349px;
      width: 94.4%;
      height: 12px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(101, 110, 170, 1);
      background-color: rgba(0, 0, 0, 0);
      a {
        color: #34c3fe;
        text-decoration: none;
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
