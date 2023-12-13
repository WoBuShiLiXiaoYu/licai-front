<template>


  <Header></Header>

  <div class="login-content">
    <div class="login-flex">
      <div class="login-left">
        <p>万民用户知心托付&nbsp;&nbsp;&nbsp;&nbsp;<span>{{historyAvgRate}}%</span>历史年化收益</p>
        <p>千万级技术研发投入&nbsp;&nbsp;&nbsp;&nbsp;亿级注册资本平台  </p>
      </div>
      <!---->
      <div class="login-box">
        <h3 class="login-title">用户注册</h3>
        <form action="" id="register_Submit">
          <div class="alert-input">
            <input type="text" class="form-border user-num" name="mobile" v-model="phone" @blur="checkPhone()" placeholder="请输入11位手机号">
            <div class="err">{{phoneErr}}</div>
            <p class="prompt_num"></p>
            <input type="password" placeholder="请输入6-20位英文和数字混合密码"  v-model="password" @blur="checkPassword()" class="form-border user-pass" autocomplete name="password">
            <div class="err">{{passwordErr}}</div>
            <p class="prompt_pass"></p>
            <div class="form-yzm form-border">
              <input class="yzm-write" type="text" v-model="code" @blur="checkCode()" name="" placeholder="输入短信验证码">
              <input class="yzm-send" type="button" v-bind:value="yzmText" @click="requestSmsCode()" id="yzmBtn">
            </div>
            <div class="err">{{codeErr}}</div>
            <p class="prompt_yan"></p>
          </div>
          <div class="alert-input-agree">
            <input type="checkbox" v-model="agree">我已阅读并同意<a href="javascript:;" target="_blank">《动力金融网注册服务协议》</a>
          </div>
          <div class="alert-input-btn">
            <input type="button" class="login-submit" @click="requestUserRegister()" value="注册">
          </div>
        </form>
        <div class="login-skip">
          已有账号？ <a href="javascript:void(0)" @click="goLink('/page/user/login')">登录</a>
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>


</template>

<script>
import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer";
import {doGet, doPost, doPostJson} from "@/api/httpRequest";
import layx from "vue-layx";
import md5 from "js-md5";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register.vue",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header,
    // eslint-disable-next-line vue/no-unused-components
    Footer
  },

  data() {
    return {
      historyAvgRate: 0.00,
      phone: "13800000002",
      phoneErr: "",
      password: "123aaa",
      passwordErr: "",
      code: "",
      codeErr: "",
      yzmText: "获取验证码",
      isSend: false,
      timer: "",
      agree: ""
    }
  },

  mounted() {

    doGet("/v1/plat/info", {}).then(resp => {
      console.log("从服务器获取首页平台基本信息：" + resp);
      if (resp) {
        this.historyAvgRate = resp.data.data.historyAvgRate;
      }
    })
  },

  methods: {

    // 登录
    goLink(url, param) {
      this.$router.push({
        path: url,
        query: param
      })
    },

    // 注册
    requestUserRegister() {
      // 判断参数是否正确
      this.checkPhone();
      this.checkPassword();
      this.checkCode();

      if (this.phoneErr == "" && this.passwordErr == "" && this.codeErr == "") {
        if (this.agree) {
          // 数据正确，提交注册请求
          let newPassword = md5(this.password);
          // 前端请求
          doPost("/v1/user/register", {
            phone: this.phone,
            pword: newPassword,
            scode: this.code
          }).then(resp => {
            if (resp && resp.data.code == 1000) {
              // 跳转至登录页面
              this.$router.push({
                path: "/page/user/login"
              })
            }
          })
        } else {
          layx.msg("请阅读注册协议", {dialogIcon: "warn", position: "ct"});
        }
      }

    },

    // 获取验证码
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

          // 发送请求，给手机发送验证码
          /*doGet("/v1/sms/code/register", {phone: this.phone}).then(resp => {
            if (resp && (resp.data.code == 1000 || resp.data.code == 1004)) {
              layx.msg("短信发送成功", {dialogIcon: "success", position: "ct"});
            }
          })*/
          /*let params = new URLSearchParams();
          params.append("phone", this.phone)*/
          doPostJson("/v1/sms/code/register", {phone: this.phone}).then(resp => {
            if (resp && (resp.data.code == 1000 || resp.data.code == 1004)) {
              layx.msg("短信发送成功", {dialogIcon: "success", position: "ct"});
            }
          })
        }
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

    // 检查密码是否正确
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
      if (this.phone == undefined || this.phone == "") {
        this.phoneErr = "请输入手机号";
      } else if (this.phone.length != 11) {
        this.phoneErr = "请输入正确的 11 位手机号";
      } else if (!/^1[1-9]\d{9}$/.test(this.phone)) {
        this.phoneErr = "手机号格式不正确";
      } else {
        this.phoneErr = "";

        // 向服务器发送请求，查询手机号是否注册
        doGet("/v1/user/phone/exists", {phone: this.phone}).then(resp => {
          if (resp && resp.data.code == 1000) {// 响应成功
            // 可以注册
            console.log("手机号可以注册");
          } else {
            // 已注册，打印错误信息
            this.phoneErr = resp.data.msg;
          }
        })
      }
    }
  }
}

</script>

<style scoped>
.err{
  color: red;
  font-size: 10px;
}
</style>