<template lang="html">
  <div class="orderList-wrapper">
    <div class="search-box">
      <search 
        auto-scroll-to-top 
        @on-focus="onFocus" 
        @on-cancel="onCancel" 
        position="fixed" 
        v-model="query"
        auto-fixed>
      </search>
    </div>
    <div class="category">
      <div>
        <div class="currentType" @click="showType = !showType">
          {{currentTypeTxt}}
          <i class="icon-jiantou-down"></i>
        </div>
        <ul class="type-list">
          <li class="type-item" @click="selectType(1)" :class="currentType===1?'active':''"><span>全部</span></li>
          <li class="type-item" @click="selectType(2)" :class="currentType===2?'active':''"><span>待发货</span></li>
          <li class="type-item" @click="selectType(3)" :class="currentType===3?'active':''"><span>待收货</span></li>
          <li class="type-item" @click="selectType(4)" :class="currentType===4?'active':''"><span>已完成</span></li>
        </ul>
      </div>
    </div>
    <!-- 订单列表 -->
    <ul class="search-result">
      <li class="order-item" @click="selectItem(item.orderNo)" v-for="(item,index) in orderList">
        <div class="layout-tow-columns">
          <span class="column-left statu">状态</span>
          <span class="column-right">{{getStatus(item.status)}}</span>
        </div>
        <div class="prod-item" v-for="(goods, gIndex) in item.goods">
          <div class="prod-item-left">
            <img :src="goods.img" alt="">
          </div>
          <div class="prod-item-center">
            <p class="prodName">{{goods.name}}</p>
            <p class="old-price"></p>
            <p class="new-price">￥{{goods.price}}</p>
          </div>
          <div class="prod-item-right">
            x{{goods.quantity}}
          </div>
        </div>
        <div class="layout-tow-columns">
          <span class="column-left">实付款</span>
          <span class="column-right pink">￥{{item.amount}}</span>
        </div>
        <div class="address">
          <p>
            <span class="receiver">收件人：</span>
            <span class="name">{{item.reciever}}</span>
            <span class="phone">{{item.mobile}}</span>
          </p>
          <p>
            <span class="receivedAddr">收货地址：</span>
            <span class="addr">{{item.address}}</span>
          </p>
        </div>
      </li>
    </ul>
    <ul class="orderType" v-show="showType" @click="toggleType">
      <li class="all" :data-index="index" v-for="(item,index) in typeList">{{item}}</li>
    </ul>
    <tab-bar :currentTabIndex="currentTabIndex"></tab-bar>
    <div class="mask" @click="showType = false" v-show="showType"></div>
  </div>
</template>

<script>
import TabBar from '@/base/tabBar/tabBar'
import {Search} from 'vux'
// 节流函数，防止input时频繁触发请求
function debounce(func, delay) {
      let timer
      return function(...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    }
export default {
  data() {
    return {
      currentTabIndex: 2,
      currentTypeTxt: '所有订单',
      currentType: 1,
      showType: false,
      typeList: ['所有订单', '补货订单', '进货订单', '客户订单'],
      autoFixed: true,
      query: null,
      orderList: []
    }
  },
  components: {
    TabBar,
    Search
  },
  created() {
    this.getOrderList({})
    this.$watch('query', debounce((newQuery) => {
      if (!newQuery) {
        return
      }
      this.searchOrder(newQuery)
    }, 1000))
  },
  mounted() {

  },
  methods: {
    // 节流函数
    debounce(func, delay) {
      let timer
      return function(...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    // 获取订单列表
    getOrderList({status}) {
      this.$axios.get('/agent/orders',{
        params: {
          status: status
        }
      }).then( res => {
        if (res.status === 1) {
          this.orderList = res.data.orders
        }
      })
    },
    // 搜索订单
    searchOrder(keyword) {
      this.$axios.get('/agent/searchOrders', {
        params: {
          keyword: keyword
        }
      }).then(res => {
        console.log(res)
      })
    },
    // status表示物流状态：0未支付;1确认收货;2已付款(待发货);3已发货(待收货)；4退货;8已评价
    getStatus(statu) {
      let str = ''
      switch(statu) {
        case 0 :
          str = '未支付';
          break;
        case 1 :
          str = '确认收货';
          break;
        case 2 :
          str = '待发货';
          break;
        case 3 :
          str = '待收货';
          break;
      }
      return str;
    },
    selectType(n) {
      this.currentType = n
      let status = ''
      if (n !== 1) {
        status = n
      }
      this.getOrderList({status: status})
    },
    selectItem(orderNo) {
      this.$router.push(`/orderDetail/order/${orderNo}`)
    },
    toggleType(e) {
      let index = e.target.dataset.index
      this.currentTypeTxt = this.typeList[index]
      this.showType = false
    },
    onFocus() {

    },
    onCancel() {

    }
  },
  watch: {
    // query(newVal) {
    //   debounce(() =>{
    //     this.searchOrder(newVal)
    //   }, 200)
    // }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/variable.styl"
.orderList-wrapper
  .search-box
    position: fixed;
    top:0;
    background:#fff
    width: 100%;
    box-sizing: border-box
    z-index: 99;
    .search
      position:relative
      border-radius:5px
      border:1px solid #dadada
      height:100%
      color:#9b9b9b
      line-height:36px
      .icon-search
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px
  .category
    position:fixed
    top:44px
    height: 40px;
    padding: 0 0 10px
    line-height: 40px;
    width: 100%
    z-index: 99
    &>div
      background: #fff
      display: flex
      align-items: center
      width: 100%
    .currentType
      display: inline-block
      padding: 0 5px
      height: 20px
      line-height: 20px
      border-right: 1px solid #e2e2e2
      margin-right: 5px
    .type-list
      display: flex
      flex: 1
      .type-item
        flex:1
        &.active
          span
            display:inline-block
            height:100%
            color: $color-pink
            border-bottom: 2px solid $color-pink
  .search-result
    margin-top: 94px
    margin-bottom:60px
    .order-item
      margin-bottom:10px
      .prod-item
        position:relative
        display: flex
        background: #fff
        padding: 0 15px
        align-items:center
        border-bottom: 1px solid #e2e2e2
        box-sizing: border-box
        .prod-item-left
         margin:10px 0
         img
          width:80px
          height:80px
        .prod-item-center
          flex:1
          margin-left:9px
          text-align:left
          .prodName
            color:#38393C
            font-size:16px
            font-weight:bold
          .old-price
            margin: 10px 0 5px
            text-decoration: line-through
            color: #9B9B9B
            font-size: 12px
          .new-price
            color: #38393C
            font-size: 12px
        .prod-item-right
          color:#9B9B9B
          font-size:14px
      .operator
        height:45px
        background:#fff
        overflow:hidden
        div
          float: right;
          font-size: 14px;
          line-height: 25px;
          border-radius: 3px;
          margin: 9px 10px 9px 0;
          padding: 0 5px;
          box-sizing: border-box;
        .blue
          border: 1px solid #71ABFD;
          color: #71ABFD
        .gray
          border: 1px solid $color-gray;
          color: $color-gray
      .address
        padding-bottom: 10px
        background: #fff
        p
          display:flex
          padding: 15px 15px 0px
          font-size:12px
          .name
          .addr
           flex:1
           text-align:left
          .receiver
          .receivedAddr
            color:#9b9b9b
          .phone
            color:#71ABFD
          .addr
            line-height:15px
  .orderType
    position:fixed
    top: 92px
    left: 30px;
    background: #fff;
    z-index: 10000;
    font-size: 12px;
    line-height: 30px
    border-radius:3px
    box-shadow: 1px 1px 2px rgba(0,0,0,.2)
    li
      border-bottom: 1px solid #e2e2e2
      padding: 0 12px
  .mask
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent;
    z-index: 99
</style>
