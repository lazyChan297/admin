<template lang="html">
  <div class="order-list-wrapper">
    <ul class="order-list">
      <router-link class="order-item" v-for="item in list" :to="{path: `/orderDetail/customer/${item.orderNo}/`}" tag="li">
        <div class="layout-tow-columns">
          <span class="column-left statu">状态</span>
          <span class="column-right">{{item.status}}</span>
        </div>
        <div class="prod-item" v-for="goods in item.goods">
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
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem() {
      this.$router.push('orderDetail')
    }
  }
}
</script>

<style lang="stylus">
  .order-list-wrapper
    .order-item
      margin-top:10px
      &:first-child
        margin-top:0
      &>.layout-tow-columns
        height:40px
        font-size:16px
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
        &:last-child
          border-bottom:none
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
</style>
