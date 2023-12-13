<template>

  <Header></Header>

  <div class="login-content">
    <div class="login-flex">
      <div class="login-left"></div>
      <!---->
      <div class="login-box">
        <h3 class="login-title">实名认证</h3>
        <form action="" id="renZ_Submit">
          <div class="alert-input">
            <input type="text" class="form-border user-name" v-model="name" @blur="checkName()" name="username" placeholder="请输入您的真实姓名">
            <div class="err">{{nameErr}}</div>
            <p class="prompt_name"></p>
            <input type="text" class="form-border user-sfz" v-model="idCard" @blur="checkIdCard()" name="sfz" placeholder="请输入15位或18位身份证号">
            <div class="err">{{idCardErr}}</div>
            <p class="prompt_sfz"></p>
            <input type="text" class="form-border user-num" name="mobile" v-model="phone" @blur="checkPhone()"  placeholder="请输入11位手机号">
            <div class="err">{{phoneErr}}</div>
            <p class="prompt_num"></p>
            <div class="form-yzm form-border">
              <input class="yzm-write" v-model="code" @blur="checkCode()" type="text" placeholder="输入短信验证码">
              <input class="yzm-send" type="button" v-bind:value="yzmText" @click="requestSmsCode()" id="yzmBtn">
            </div>
            <div class="err">{{codeErr}}</div>
            <p class="prompt_yan"></p>
          </div>
          <div class="alert-input-agree">
            <input type="checkbox" v-model="agree">我已阅读并同意<a href="javascript:;">《动力金融网注册服务协议》</a>
          </div>
          <div class="alert-input-btn">
            <input type="button" @click="requestRealName" class="login-submit" value="认证">
          </div>
        </form>
        <div class="login-skip">
          暂不认证？ <a href="javascript:;" @click="goLink('/page/user/userCenter')">跳过</a>
        </div>
      </div>

    </div>
  </div>

  <Footer></Footer>
</template>

<script>
import Footer from "@/components/commons/Footer";
import Header from "@/components/commons/Header";
import {doPost, doPostJson} from "@/api/httpRequest";
import layx from "vue-layx";

export default {
  name: "RealNameView.vue",
  components: {Header, Footer},

  data() {
    return{
      phone: "13700000000",
      phoneErr: "",
      name: "",
      nameErr: "",
      idCard: "",
      idCardErr: "",
      code: "",
      codeErr: "",
      yzmText: "获取验证码",
      isSend: false,
      agree: false
    }
  },

  methods: {

    // 登录
    goLink(url, param) {
      this.$router.push({
        path: url,
        query: param
      })
    },

    // 发送认证请求
    requestRealName() {
      // 确认请求参数
      this.checkName();
      this.checkIdCard();
      this.checkCode();
      this.checkPhone();

      if (this.nameErr == "" && this.idCardErr == "" && this.idCardErr == "" && this.phoneErr == "") {
        if (this.agree) {
          console.log("发送请求");
          // 发送请求
          let param = {
            phone: this.phone,
            name: this.name,
            idCard: this.idCard,
            code: this.code
          };
          doPostJson("/v1/user/realname", param).then(resp => {
            if (resp && resp.data.code == 1000) {
              // 跳转
              this.$router.push({
                path: "/page/user/userCenter"
              });
            } else {
              layx.msg(resp.data.msg, {dialogIcon: "warn", position: "ct"});
            }
          })
        } else {
          layx.msg("请阅读协议", {dialogIcon: "warn", position: "ct"});
        }
      }
    },

    // 发送验证码请求
    requestSmsCode() {
      // isSend: true 正在发送请求，false 可以重新发送请求
      if (this.isSend == false) {
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
          }, 1000);

        doPost("/v1/sms/code/realname", {phone: this.phone}).then(resp => {
          if (resp && (resp.data.code == 1000 || resp.data.code == 1004)) {
            layx.msg("短信发送成功", {dialogIcon: "success", position: "ct"});
          }
        })
      }
    },

    // 检查手机号
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

    // 检查身份证号是否正确
    checkIdCard() {
      if (this.idCard == "" || this.idCard == null) {
        this.idCardErr = "请输入身份证号码";
      } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idCard)) {
        this.idCardErr = "身份证号格式不正确";
      } else {
        this.idCardErr = "";
      }
    },

    // 检查姓名是否正确
    checkName() {
      if (this.name == "" || this.name == null) {
        this.nameErr = "请输入姓名";
      } else if (this.name.length < 2 || !/^[\u4e00-\u9fa5]{0,}$/.test(this.name)) {
        this.nameErr = "姓名应为长度不下于 2 的中文字符";
      } else {
        this.nameErr = "";
      }
    },

  },

  mounted() {
    // 获取 localStorage 中的数据
    let userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      this.phone = JSON.parse(userInfo).phone;
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