<template>

  <Header></Header>

  <div class="login-content">
    <div class="login-flex">
      <div class="login-left">
        <h3>加入动力金融网</h3>
        <p>坐享<span>{{platInfo.historyAvgRate}}%</span>历史年化收益</p>
        <p>平台用户<span>{{platInfo.registerUser}}</span>位  </p>
        <p>累计成交金额<span>{{platInfo.sumBidMoney}}</span>元</p>
      </div>
      <!---->
      <div class="login-box">
        <h3 class="login-title">欢迎登录</h3>
        <form action="" id="login_Submit">
          <div class="alert-input">
            <!--<input class="form-border user-name" name="username" type="text" placeholder="您的姓名">
            <p class="prompt_name"></p>-->
            <input type="text" class="form-border user-num" v-model="phone" @blur="checkPhone" name="mobile" placeholder="请输入11位手机号">
            <div class="err">{{phoneErr}}</div>
            <p class="prompt_num"></p>
            <input type="password" placeholder="请输入登录密码" v-model="password" @blur="checkPassword()" class="form-border user-pass" autocomplete name="password">
            <div class="err">{{passwordErr}}</div>
            <p class="prompt_pass"></p>
            <div class="form-yzm form-border">
              <input class="yzm-write" type="text" v-model="code" @blur="checkCode()"  placeholder="输入短信验证码">
              <input class="yzm-send" type="button" v-bind:value="yzmText" @click="requestSmsCode()" id="yzmBtn">
            </div>
            <div class="err">{{codeErr}}</div>
            <p class="prompt_yan"></p>
          </div>
          <div class="alert-input-btn">
            <input type="button" @click="userLogin()" class="login-submit" value="登录">
          </div>
        </form>

      </div>

    </div>
  </div>

  <Footer></Footer>
</template>

<script>
import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer";
import {doGet, doPost} from "@/api/httpRequest";
import layx from "vue-layx";
import md5 from "js-md5";

export default {
  name: "LoginView.vue",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header,
    // eslint-disable-next-line vue/no-unused-components
    Footer
  },

  data() {
    return{
      platInfo:{
        historyAvgRate: 0.00,
        sumBidMoney: 0.00,
        registerUser: 0
      },
      phone: "13700000000",
      phoneErr: "",
      password: "123aaa",
      passwordErr: "",
      code: "",
      codeErr: "",
      yzmText: "获取验证码",
      isSend: false
    }
  },

  methods: {

    // 登录
    userLogin() {
      // 检查参数是否正确
      this.checkPhone();
      this.checkPassword();
      this.checkCode();

      if (this.phoneErr == "" && this.passwordErr == "" && this.codeErr == "") {
        // 密码加密
        let newPassword = md5(this.password);
        // 发送登录请求
        doPost("/v1/user/login", {
          phone: this.phone,
          pword: newPassword,
          scode: this.code
        }).then(resp => {
          if (resp && resp.data.code == 1000) {
            // 登录成功，存储数据至 localStorage(字符串形式， Json对象需转换)
            console.log("登录成功");
            window.localStorage.setItem("token", resp.data.accessToken);
            window.localStorage.setItem("userInfo", JSON.stringify(resp.data.data));
            // 跳转 如果 name 为空跳转至实名认证页面，不为空跳转至用户页面
            if (resp.data.data.name == "") {
              this.$router.push({
                path: "/page/user/realName"
              })
            } else {
              this.$router.push({
                path: "/page/user/userCenter"
              })
            }
          } else {
            layx.msg(resp.data.msg, {dialogIcon: "warn", position: "ct"});
          }
        })
      }

    },

    // 发送验证码请求
    requestSmsCode() {

      // isSend: true 正在发送请求，false 可以重新发送请求
      if (this.isSend == false) {
        // 判断手机号是否为空
        this.checkPhone();
        if (this.phoneErr == "") {
          this.isSend = true;
          // 改变按钮样式
          let btn = document.getElementById("yzmBtn");
          btn.style.color = "red";
          // 执行倒计时
          let second = 5;
          // eslint-disable-next-line no-unused-vars
          clearInterval(this.timer);
          this.timer = setInterval(() => {
            if (second <= 1) {
              btn.style.color = "#688EF9";
              this.yzmText = "获取验证码";
              this.isSend = false;
            } else {
              second = second - 1;
              this.yzmText = second + "秒后重新获取";
            }
          }, 1000)
        }

        // 发送请求
        /*doPostJson("/v1/sms/code/register", {phone: this.phone}).then(resp => {
          if (resp && (resp.data.code == 1000 || resp.data.code == 1004)) {
            layx.msg("短信发送成功", {dialogIcon: "success", position: "ct"});
          }
        })*/


        doPost("/v1/sms/code/login", {phone: this.phone}).then(resp => {
          if (resp && (resp.data.code == 1000 || resp.data.code == 1004)) {
            layx.msg("短信发送成功", {dialogIcon: "success", position: "ct"});
          }
        })
      }
    },

    // 检查验证码是否正确
    checkCode() {
      if (this.code == undefined || this.code == "") {
        this.codeErr = "请输入验证码";
      } else if (this.code.length != 4) {
        this.codeErr = "请输入有效的4位验证码";
      } else if (!/^[0-9]\d{1,4}$/.test(this.code)) {
        this.codeErr = "验证码为 4 为含 0 整数";
      } else {
        this.codeErr = "";
      }
    },

    // 检查密码是否合法
    checkPassword() {
      if (this.password == undefined || this.password == "") {
        this.passwordErr = "请输入密码";
      } else if (this.password.length < 6 || this.password.length > 20) {
        this.passwordErr = "密码长度为 6-20";
      } else if (!/^(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))[a-zA-Z0-9]*/.test(this.password) || !/^[0-9a-zA-Z]+$/.test(this.password)) {
        this.passwordErr = "密码应同时包含英文和数字，并且密码字符只可使用数字和大小写英文字母";
      } else {
        this.passwordErr = "";
      }
    },

    // 检查手机号是否正确
    checkPhone() {
      if (this.phone == "" || this.phone == null) {
        this.phoneErr = "请输入手机号";
      } else if (this.phone.length != 11) {
        this.phoneErr = "请输入正确的 11 位手机号";
      } else if (!/^1[1-9]\d{9}$/.test(this.phone)) {
        this.phoneErr = "手机号格式不正确";
      } else {
        this.phoneErr = "";
      }
    }

  },

  mounted() {
    doGet("/v1/plat/info").then(resp => {
      if (resp) {
        this.platInfo = resp.data.data;
      }
    })
  }
}
</script>

<style scoped>
.err {
  color: red;
  font-size: 10px;
}
</style>