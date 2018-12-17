<template lang="html">
  <div class="purchase-wrapper">
    <!-- 余额 -->
    <div class="header">
      <div class="detail">
        <p class="detail-title">充值余额 (元)</p>
        <div class="detail-content">
          <p class="detail-number">{{purchaseInfo.balance}}</p>
          <router-link to="/purchaseList" tag="div" class="detail-link">明细</router-link>
        </div>
      </div>
    </div>
    <!-- 进货记录 -->
    <div class="purchase-record">
      <i class="icon-purchase"></i>
      <router-link to="/purchaseList" tag="span">进货记录</router-link>
      <i class="icon-jiantou"></i>
    </div>
    <!-- tips -->
    <p class="tips">温馨提示：订单总额满3000元包邮，未满3000元不包邮</p>
    <!-- 进货列表 -->
    <ul class="prod-list">
      <li class="prod-item" v-for="(item, index) in purchaseInfo.goods" :key="index">
        <div class="prod-item-content">
          <div class="prod-item-left">
            <img :src="item.img" alt="">
          </div>
          <div class="prod-item-right">
            <p class="prodName">{{item.name}}</p>
            <p class="old-price">￥{{item.retailPrice}}</p>
            <p class="new-price">￥{{item.tradePrice}}</p>
          </div>
          <div class="inventory">
            库存: (9999)
          </div>
        </div>
        <div class="prod-item-count">
            <div class="total">￥{{item.num * item.tradePrice}}</div>
            <cart-control :goods="item"></cart-control>
        </div>
      </li>
    </ul>
    <!-- 结算 -->
    <div class="settlement">
      <div class="total">
        <span class="black">合计:</span>
        <span class="blue">{{total}}</span>
      </div>
      <div class="submit" @click="submit">结算</div>
    </div>
  </div>
</template>

<script>
import CartControl from '@/base/cartcontrol/cartcontrol'
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      purchaseInfo: {}
    }
  },
  created() {
    this.getlist()
    this.getAddr()
  },
  methods: {
    getlist() {
      this.$axios.get('/agent/stock/goods').then((res) => {
        let goods = res.data.goods
        goods.forEach((item, index) => {
          item.num = 0
        })
        this.purchaseInfo = {
          balance: res.data.balance,
          goods: goods
        }
      })
    },
    submit() {
      if (!this.selectGoods.length) {
        return false
      }
      this.saveToCart(this.selectGoods)
      this.$router.push('/payment')
    },
    // 获取收货地址
    getAddr() {
      this.$axios.get('/users/addrInfo').then((res) => {
        this.saveUserAddr(res.data.addr)
      })
    },
    ...mapMutations({
      saveToCart: 'SAVE_TO_CART',
      saveUserAddr: 'SAVE_USER_ADDR'
    })
  },
  components: {
    CartControl
  },
  computed: {
    total() {
      let goods = this.purchaseInfo.goods
      let total = 0
      if (!goods) {
        return
      }
      goods.forEach((item, index) => {
        if (item.num > 0) {
          total += item.num * item.tradePrice
        }
      })
      return total
    },
    selectGoods() {
      let ret = []
      let goods = this.purchaseInfo.goods
      if (!goods) {
        return
      }
      goods.forEach((item, index) => {
        if (item.num > 0) {
          ret.push(item)
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus">
  .purchase-wrapper
    .header
      padding: 11px 15px 4px;
      height:100px
      background: linear-gradient(#3E94E9,#72C6F6)
      .detail
        color:#fff
        background-size: 100%
        height: 100%
        border-radius: 8px
        text-align:left
        .detail-title
          margin-left:20px
          padding-top:15px
          font-size:14px
        .detail-content
          display:flex
          align-items: center
          margin-left:20px
          line-height:50px
          .detail-number
            flex: 1
            font-weight: bold
            font-size:36px
          .detail-link
            background: #6CC1F4
            color: #fff
            width:58px
            height:26px
            line-height:26px
            font-size:12px
            border-radius: 100px
            text-align:center
            margin-right:20px
    .purchase-record
      color: #4a4a4a
      font-size: 16px
      height: 50px
      display: flex
      align-items: center
      background: #fff
      padding: 0 15px
      box-shadow: 0 5px 6px #DDEBFF
      text-align:left
      .icon-purchase
        &:before{
          content:''
          background:url('purchase.png') no-repeat center
          display:inline-block
          width:22px
          height:30px
          margin-right:6px
          background-size:100%
        }
      span
        flex:1
    .tips
      color: #9B9B9B
      height: 30px
      font-size: 10px
      line-height: 30px
      text-align: center
      border-bottom: 1px solid #e2e2e2
    .prod-list
      margin-bottom: 45px
      .prod-item
        margin-bottom:11px
        .prod-item-content
          position:relative
          display: flex
          background: #fff
          padding: 0 15px
          .prod-item-left
           margin:10px 0
           img
            width:80px
            height:80px
          .prod-item-right
            margin-top:15px
            margin-left:9px
            .prodName
              color:#38393C
              font-size:16px
              font-weight:bold
            .old-price
              margin: 10px 0 5px
              text-decoration: line-through
              color: #9B9B9B
              font-size: 12px
              text-align:left
            .new-price
              color: #38393C
              font-size: 12px
              text-align:left
          .inventory
            position: absolute
            color: #9b9b9b
            font-size: 12px
            bottom: 15px
            right: 15px
    .settlement
      position: fixed
      display: flex
      bottom: 0
      width: 100%
      height: 45px
      line-height: 45px
      background: #fff
      padding-left: 15px
      box-sizing: border-box
      .total
        text-align:left
        flex:1
        .black
          font-size: 14px
          color: #4F5054
        .blue
          color:#71ABFD
          font-size:16px
          font-weight:bold
      .submit
        width:130px
        text-align:center
        color:#fff
        background:linear-gradient(left,#407CE6,#00ACFC)
</style>
