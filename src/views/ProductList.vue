<template>
  <Header></Header>

  <div class="content clearfix">
    <!--排行榜-->
    <ul class="rank-list">
      <li v-for="(item, index) in rank" :key="item.phone">
        <img src="@/assets/image/list-rank1.png" alt="" v-if="index == 0">
        <img src="@/assets/image/list-rank2.png" alt="" v-else-if="index == 1">
        <img src="@/assets/image/list-rank3.png" alt="" v-else>
        <p class="rank-list-phone">{{item.phone}}</p>
        <span>{{item.money}}元</span>
      </li>
<!--      <li>
        <img src="@/assets/image/list-rank2.png" alt="">
        <p class="rank-list-phone">13704213880</p>
        <span>90000.0元</span>
      </li>-->
<!--      <li>
        <img src="@/assets/image/list-rank3.png" alt="">
        <p class="rank-list-phone">13704213890</p>
        <span>2000.0元</span>
      </li>-->
    </ul>
    <!--产品列表-->
    <ul class="preferred-select clearfix">
      <li v-for="product in productList" :key="product.id">
        <h3 class="preferred-select-title">
          <span>{{product.productName}}</span>
          <img src="@/assets/image/1-bg1.jpg" alt="" v-if="product.productName == '满月宝'">
          <img src="@/assets/image/1-bg2.jpg" alt="" v-else-if="product.productName == '年度宝'">
          <img src="@/assets/image/1-bg3.jpg" alt="" v-else-if="product.productName == '双季宝'">
          <img src="@/assets/image/1-bg4.jpg" alt="" v-else-if="product.productName == '季度宝'">
          <img src="@/assets/image/1-bg1.jpg" alt="" v-else>
        </h3>
        <div class="preferred-select-number">
          <p><b>{{product.rate}}</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>{{product.cycle}}</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p><b>{{product.leftProductMoney}}</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
<!--          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。-->
          {{product.productDesc}}
        </p>
        <a href="javascript:void(0)" @click="goLink('/page/product/detail', {productId : product.id})" class="preferred-select-btn">立即投资</a>
      </li>
<!--      <li>
        <h3 class="preferred-select-title">
          <span>季度宝</span>
          <img src="@/assets/image/1-bg2.jpg" alt="">
        </h3>
        <div class="preferred-select-number">
          <p><b>6.2</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>1</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p class="preferred-select-date-no"><b>0.0</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" target="_blank" class="preferred-select-btn">立即投资</a>
      </li>-->
<!--      <li>
        <h3 class="preferred-select-title">
          <span>双季宝</span>
          <img src="@/assets/image/1-bg3.jpg" alt="">
        </h3>
        <div class="preferred-select-number">
          <p><b>7.1</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>1</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p><b>250000.0</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" target="_blank" class="preferred-select-btn">立即投资</a>
      </li>-->
<!--      <li>
        <h3 class="preferred-select-title">
          <span>年度宝</span>
          <img src="@/assets/image/1-bg4.jpg" alt="">
        </h3>
        <div class="preferred-select-number">
          <p><b>4.9</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>1</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p><b>250000.0</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" target="_blank" class="preferred-select-btn">立即投资</a>
      </li>-->
<!--      <li>
        <h3 class="preferred-select-title">
          <span>满月宝</span>
          <img src="@/assets/image/1-bg1.jpg" alt="">
        </h3>
        <div class="preferred-select-number">
          <p><b>4.9</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>1</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p><b>250000.0</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" target="_blank" class="preferred-select-btn">立即投资</a>
      </li>-->
<!--      <li>
        <h3 class="preferred-select-title">
          <span>季度宝</span>
          <img src="@/assets/image/1-bg2.jpg" alt="">
        </h3>
        <div class="preferred-select-number">
          <p><b>6.2</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>1</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p class="preferred-select-date-no"><b>0.0</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" target="_blank" class="preferred-select-btn">立即投资</a>
      </li>-->
<!--      <li>
        <h3 class="preferred-select-title">
          <span>双季宝</span>
          <img src="@/assets/image/1-bg3.jpg" alt="">
        </h3>
        <div class="preferred-select-number">
          <p><b>7.1</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>1</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p><b>250000.0</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" target="_blank" class="preferred-select-btn">立即投资</a>
      </li>-->
<!--      <li>
        <h3 class="preferred-select-title">
          <span>年度宝</span>
          <img src="@/assets/image/1-bg4.jpg" alt="">
        </h3>
        <div class="preferred-select-number">
          <p><b>4.9</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>1</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p><b>250000.0</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" target="_blank" class="preferred-select-btn">立即投资</a>
      </li>-->
<!--      <li>
        <h3 class="preferred-select-title">
          <span>满月宝</span>
          <img src="@/assets/image/1-bg1.jpg" alt="">
        </h3>
        <div class="preferred-select-number">
          <p><b>4.9</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>1</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p><b>250000.0</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
          优选计划项目，投资回报周期1个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" target="_blank" class="preferred-select-btn">立即投资</a>
      </li>-->
    </ul>

    <!--分页-->
    <div class="page_box">
      <ul class="pagination">
        <li><a href="javascript:void(0)" @click="frist()"><span>首页</span></a></li>
        <li><a href="javascript:void(0)" @click="pre()">上一页</a></li>
        <li class="active"><span>{{page.pageNo}}</span></li>
        <li><a href="javascript:void(0)" @click="next()">下一页</a></li>
        <li><a href="javascript:void(0)" @click="last()">尾页</a></li>
        <li class="totalPages"><span>共{{page.totalPage}}页</span></li>
      </ul>
    </div>

  </div>

  <Footer></Footer>
</template>

<script>
import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer";
import {doGet} from "@/api/httpRequest";
import layx from "vue-layx";

// 定义参数
let productType = 0;

export default {
  name: "ProductList.vue",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header,
    // eslint-disable-next-line vue/no-unused-components
    Footer
  },

  data() {
    return {
      rank: [{
        money: 0,
        phone: ""
      }],

      productList: [{
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
      }],

      page: [{
        pageNo: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecord: 0
      }]
    }
  },

  mounted() {

    // 排行榜
    // 从服务器获取数据
    doGet("/v1/invest/rank", {}).then(resp => {
      if (resp) {
        this.rank = resp.data.list;
      }
    });


    // 获取参数
    productType = this.$route.query.pType;

    // 加载完成获取数据
    this.initPage(productType, 1, 9);

  },

  methods: {

    goLink(url, param) {
      this.$router.push({
        path: url,
        query: param
      })
    },

    initPage(productType, pNo, pSize) {


      // 从服务器获取产品列表信息
      doGet("/v1/product/list", {pType: productType, pageNo: pNo, pageSize: pSize}).then(resp => {
        if (resp) {
          this.productList = resp.data.list;
          this.page = resp.data.page;
        }
      })
    },

    // 第一页
    frist() {
      if (this.page.pageNo == 1) {
        /*alert("已经是第一页数据");*/
        layx.msg("已经是第一页数据", {dialogIcon: "warn", position: "ct", });
      } else {
        this.initPage(productType, 1, 9);
      }
    },

    // 最后一页
    last() {
      if (this.page.pageNo == this.page.totalPage) {
        layx.msg("已经是最后一页数据", {dialogIcon: "warn", position: "ct"});
      } else {
        this.initPage(productType, this.page.totalPage, 9);
      }
    },

    // 上一页
    pre() {
      if (this.page.pageNo - 1 < 1) {
        layx.msg("已经是第一页数据", {dialogIcon: "warn", position: "ct"});
      } else {
        this.initPage(productType, this.page.pageNo - 1, 9);
      }
    },

    // 下一页
    next() {
      if (this.page.pageNo + 1 > this.page.totalPage) {
        layx.msg("已经是最后一页数据", {dialogIcon: "warn", position: "ct"});
      } else {
        this.initPage(productType, this.page.pageNo + 1, 9);
      }
    }




  }



}

</script>

<style scoped>

</style>