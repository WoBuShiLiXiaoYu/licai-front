<template>
  <!--头部-->
  <div class="public-head">
    <div class="public-head-nav">
      <div class="public-head-left">
        <h1 class="public-head-logo"><a href="javascript:;">
          <img src="@/assets/image/logo.png" alt="">
        </a></h1>
        <ul class="public-head-list">
          <li><a href="javascript:void(0)" @click="goLink('/', {})">主页</a></li>
          <li class="public-head-hover">
            <a href="javascript:void(0);">我要投资</a>
            <!--二级导航-->
            <div class="two-title">
              <a href="javascript:void(0)" @click="goLink('/page/product/list', {pType: 1})">优选类产品</a>
              <a href="javascript:void(0)" @click="goLink('/page/product/list', {pType: 2})">散标类产品</a>
            </div>
          </li>
          <li><a href="javascript:void(0)" target="_blank">借款人信息</a></li>
          <li><a href="javascript:void(0)" target="_blank">信息披露</a></li>
          <li><a href="javascript:void(0)" target="_blank">安全计划</a></li>
        </ul>
      </div>
      <div class="public-head-right" v-if="logined">
        <a href="javascript:void(0)" @click="goLink('/page/user/userCenter')">用户中心</a>
      </div>

      <div class="public-head-right" v-else>
        <a href="javascript:void(0)" @click="goLink('/page/user/login')">登录</a>
        <a href="javascript:void(0)" @click="goLink('/page/user/register')">注册</a>
        <a href="javascript:void(0)" @click="goLink('/page/user/realName')">实名验证</a>
      </div>

    </div>
  </div>
  <!--end-->
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",

  data() {
    return{
      logined: false
    }
  },

  mounted() {
    // 判断是否登录
    if(window.localStorage.getItem("userInfo")) {
      this.logined = true;
    }
  },

  methods:{

    // 主页跳转
    goLink(url, param) {
      // 使用 router
      this.$router.push({
        path : url,
        query : param
      })
    }


  }
}
</script>

<style scoped>

</style>