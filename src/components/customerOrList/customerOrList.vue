<template lang="html">
  <div class="custom-orderlist-wrapper">
    <div class="orderNum layout-tow-columns">
      <div class="column-left">
        订单数量
      </div>
      <div class="column-right">
        <span class="big">{{orderTotal}}</span>笔
      </div>
    </div>
    <order-list :list="list"></order-list>
  </div>
</template>

<script>
import OrderList from '@/base/order-list/order-list'
export default {
  data() {
    return {
      userSn: null,
      orderTotal: 0,
      list: []
    }
  },
  created() {
    this.userSn = this.$route.params.userSn
    this.getlist(this.userSn)
  },
  components: {
    OrderList
  },
  methods: {
    getlist(sn) {
      this.$axios.get('/agent/customerOrders', {
        params: {
          sn: sn
        }
      }).then((res) => {
        this.orderTotal = res.data.ordersCount
        this.list = res.data.orders
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .custom-orderlist-wrapper
    .orderNum.layout-tow-columns
      box-shadow: 0 2px 6px rgba(0,0,0,.2)
      height:45px
      line-height:45px
      background: #6DA6FE
      color:#fff
      font-size:16px
      .big
        font-size:24px
        font-weight:bold
</style>
