<template>

  <Header></Header>

  <div class="content clearfix">
    <div class="detail-left">
      <div class="detail-left-title">{{product.productName}}（{{product.productNo}}）</div>
      <ul class="detail-left-number">
        <li>
          <span>历史年化收益率</span>
          <p><b>{{product.rate}}</b>%</p>
          <span>历史年化收益率</span>
        </li>
        <li>
          <span>募集金额（元）</span>
          <p><b>{{product.productMoney}}</b>元</p>
          <span v-if="product.leftProductMoney > 0">募集中&nbsp;&nbsp;剩余募集金额{{product.leftProductMoney}}元</span>
          <span v-else>已满标</span>
        </li>
        <li>
          <span>投资周期</span>
          <p v-if="product.productName == '新手宝'"><b>{{product.cycle}}</b>天</p>
          <p v-else><b>{{product.cycle}}</b>个月</p>
        </li>

      </ul>
      <div class="detail-left-way">
        <span>收益获取方式</span>
        <span>收益返还：<i>到期还本付息</i></span>
      </div>
      <!--投资记录-->
      <div class="datail-record">
        <h2 class="datail-record-title">投资记录</h2>
        <div class="datail-record-list">
          <table align="center" width="880" border="0" cellspacing="0" cellpadding="0">
            <colgroup>
              <col style="width: 72px" />
              <col style="width: 203px" />
              <col style="width: 251px" />
              <col style="width: 354px" />
            </colgroup>
            <thead class="datail_thead">
            <tr>
              <th>序号</th>
              <th>投资人</th>
              <th>投资金额（元）</th>
              <th>投资时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(invest, index) in investList" :key="invest.id">
              <td>{{index + 1}}</td>
              <td class="datail-record-phone">{{invest.phone}}</td>
              <td>{{invest.bidMoney}}</td>
              <td>{{invest.bidTime}}</td>
            </tr>
<!--            <tr>
              <td>2</td>
              <td class="datail-record-phone">13712345601</td>
              <td>1500.0</td>
              <td>2021-08-19 09:47:14</td>
            </tr>-->
<!--            <tr>
              <td>3</td>
              <td class="datail-record-phone">13712345602</td>
              <td>1500.0</td>
              <td>2021-08-19 09:47:14</td>
            </tr>-->
<!--            <tr>
              <td>4</td>
              <td class="datail-record-phone">13712345603</td>
              <td>1500.0</td>
              <td>2021-08-19 09:47:14</td>
            </tr>-->
<!--            <tr>
              <td>5</td>
              <td class="datail-record-phone">13712345604</td>
              <td>1500.0</td>
              <td>2021-08-19 09:47:14</td>
            </tr>-->

            </tbody>
          </table>
        </div>
      </div>

    </div>
    <!--右侧-->
    <div class="detail-right">
      <div class="detail-right-title">立即投资</div>
      <div class="detail-right-mode">
        <h3 class="detail-right-mode-title">收益方式</h3>
        <p class="detail-right-mode-p"><span>到期还本付息</span></p>
        <h3 class="detail-right-mode-title">我的账户可用</h3>
        <div class="detail-right-mode-rmb" v-if="logined == false">
          <p>资金（元）：******</p>
          <a href="javascript:void(0)" @click="goLink('/page/user/login')">请登录</a>
        </div>
        <div class="detail-right-mode-rmb" v-else>
          <p>资金（元）：{{accountMoney}}</p>
        </div>
        <h3 class="detail-right-mode-title">预计本息收入 {{this.income}}（元）</h3>
        <form action="" id="number_submit">
          <p>请在下方输入投资金额</p>
          <input type="text" placeholder="请输入日投资金额，应为100元整倍数" v-model="investMoney" @blur="checkInvestMoney()" class="number-money" >
          <div class="err">{{this.investMoneyErr}}</div>
          <input type="button" value="立即投资" @click="investProduct()" class="submit-btn">
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

export default {
  name: "ProductDetail.vue",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header,
    // eslint-disable-next-line vue/no-unused-components
    Footer
  },

  data() {
    return {
      product: {
        id: 0,
        productName: "",
        rate: 0,
        cycle: 0,
        releaseTime: 0,
        productType: 0,
        productNo: "0",
        productMoney: 0,
        leftProductMoney: 0,
        bidMinLimit: 0,
        bidMaxLimit: 0,
        productStatus: 0,
        productFullTime: 0,
        productDesc: ""
      },
      investList:[{
        id: 0,
        phone: "",
        bidTime: "",
        bidMoney: 0.00
      }],
      logined: false,
      accountMoney: 0.0,
      investMoney: 0.0,
      investMoneyErr: "",
      income: ""
    }
  },

  methods: {

    goLink(url, param) {
      this.$router.push({
        path: url,
        query: param
      })
    },

    checkInvestMoney() {
      if (isNaN(this.investMoney)) {
        this.investMoneyErr = "请输入正确的金额";
      } else if (parseInt(this.investMoney) < 100) {
        this.investMoneyErr = "投资金额不能小于 100元";
      } else if (parseFloat(this.investMoney) % 100 != 0) {
        this.investMoneyErr = "投资金额应为 100 的整数倍";
      } else {
        this.investMoneyErr = "";

        // 计算利息
        // 利息 = 本金 * 周期 * 利率
        // 日利率
        let dayRate = this.product.rate / 365 / 100;
        let incomeMoney = 0.0;
        if (this.product.productType == 0) {
          incomeMoney = this.investMoney * dayRate * this.product.cycle;
        } else {
          incomeMoney = this.investMoney * (this.product.cycle * 30) * dayRate;
        }
        this.income = incomeMoney.toFixed(2);
      }
    },

    investProduct() {
      // 检查是否登录、实名验证
      let userInfo = window.localStorage.getItem("userInfo");
      if (userInfo) {
        // 实名登记
        if (userInfo.name != "") {
          // 检查投资金额
          this.checkInvestMoney();
          if (this.investMoneyErr == "") {
            // 投资
            doPost("/v1/invest/product", {
              productId: this.product.id,
              money: this.investMoney
            }).then(resp => {
              if (resp && resp.data.code == 1000) {
                // 更新页面
                this.initPage();
              }
            })
          }
        }
      }
    },

    initPage() {
      // 查询资金
      doGet("/v1/user/usercenter").then(resp => {
        if (resp && resp.data.code == 1000) {
          this.accountMoney = resp.data.data.money;
        }
      })

      // 获取参数
      let productId = this.$route.query.productId;
      // 加载数据
      doGet("/v1/product/info", {productId}).then(resp => {
        if (resp) {
          this.product = resp.data.data;
          this.investList = resp.data.list;
        }
      })
    }

  },

  mounted() {

    // 判断是否已经登录
    if (window.localStorage.getItem("userInfo")) {
      this.logined = true;
    }

    this.initPage();
  }
}
</script>

<style scoped>
.err{
  color: red;
  font-size: 10px;
}
</style>