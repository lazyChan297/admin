<template lang="html">
  <div class="orderDetail-wrapper">
    <div class="layout-tow-columns">
      <div class="column-left statu">
        状态
      </div>
      <div class="column-right pink">
        {{orderInfo.status}}
      </div>
    </div>
    <div class="mt10 delivery" @click="deliveryView">
      <div class="icon">
        <i class="icon-delivery"></i>
      </div>
      <div class="center">
        <p class="pink">已揽件</p>
        <p class="gray">2018-09-11 12:09:10</p>
      </div>
      <div class="icon">
        <i class="icon-jiantou"></i>
      </div>
    </div>
    <div class="address mt10">
        <p>
          <span class="receiver">收件人：</span>
          <span class="name">{{orderInfo.reciever}}</span>
          <span class="phone">{{orderInfo.mobile}}</span>
        </p>
        <p>
          <span class="receivedAddr">收货地址：</span>
          <span class="addr">{{orderInfo.address}}</span>
        </p>
    </div>
    <div class="prod-item mt10" v-for="(item,index) in orderInfo.goods">
      <div class="prod-item-left">
        <img :src="item.img" alt="">
      </div>
      <div class="prod-item-center">
        <p class="prodName">{{item.name}}</p>
        <p class="old-price"></p>
        <p class="new-price">￥{{item.price}}</p>
      </div>
      <div class="prod-item-right">
        x{{item.quantity}}
      </div>
    </div>
    <div class="layout-tow-columns">
      <span class="column-left">实付款</span>
      <span class="column-right pink">￥{{orderInfo.amount}}</span>
    </div>
    <div class="orderInfo mt10">
      <p>
        <span>订单号：</span>
        <span>{{orderInfo.orderNo}}</span>
        <span class="copy"></span>
      </p>
      <p>
        <span>下单时间：</span>
        <span>{{orderInfo.orderCreatedAt}}</span>
      </p>
      <p v-show="orderInfo.orderFinishedAt">
        <span>成交时间：</span>
        <span>{{orderInfo.orderFinishedAt}}</span>
      </p>
      <p >
        <span>发货时间：</span>
        <span>2018-09-10 12:12:01</span>
      </p>
    </div>
    <router-link to="/orderDetail/express" class="gradient-botton-pink" tag="div" v-show="orderType=='order'">
      我要发货
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderInfo: {},
      orderType: null
    }
  },
  activated() {
    let orderNo = this.$route.params.orderNo
    this.orderType = this.$route.params.type
    this.getDetail(orderNo,this.orderType)
  },
  methods: {
    getDetail(orderNo, orderType) {
      let url = orderType == 'customer' ? '/agent/customerOrderDetails' : '/orders/details'
      this.$axios.get(url, {
        params: {
          no: orderNo
        }
      }).then((res) => {
        this.orderInfo = res.data
        console.log(this.orderInfo)
      })
    },
    deliveryView() {
      this.$router.push('delivery')
    }
  }
}
</script>

<style lang="stylus">
  .orderDetail-wrapper
    .layout-tow-columns
      height:40px
      font-size:16px
      border:none
      .column-left.statu
        &:after
          content:'客户订单'
          display:inline-block
          font-size:10px
          background:#FF7584
          height: 16px
          vertical-align: middle
          line-height: 16px
          color: #fff
          border-top-right-radius: 100px
          border-bottom-right-radius: 100px
          padding: 0 4px
          margin-left: 5px
      .column-right
        color:#9b9b9b
      .pink
        color:#FF7584
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
    .address
      p
        display:flex
        background:#fff
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
    .delivery
      background:#fff
      display:flex
      align-items: center
      padding:10px 15px
      .center
       text-align:left
       flex:1
       margin-left:10px
       .pink
        margin-bottom:5px
        font-size:14px
        color:#FF7584
      .gray
        font-size:12px
        color:#9b9b9b
    .orderInfo
      background:#fff
      padding:10px 15px
      color:#9b9b9b
      font-size:12px
      text-align:left
      line-height:17px
</style>
