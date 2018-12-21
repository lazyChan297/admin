<template lang="html">
  <div class="payment-wrapper">
    <div class="address">
      <i class="icon-address">
        <svg class="icon" aria-hidden="true" height="14px" width="14px">
          <use xlink:href="#icon-weizhi"></use>
        </svg>
      </i>
      <div class="txt">
        <p class="userInfo">{{address.reciever}}，{{address.mobile}}</p>
        <p class="addressInfo">{{address.details}}</p>
      </div>
      <i class="icon-jiantou"></i>
    </div>
    <div class="product">
      <p class="prod-title">商品</p>
      <ul class="prod-list">
        <li class="prod-item" v-for="(item,index) in cart">
          <div class="prod-item-left">
            <img :src="item.img" alt="">
          </div>
          <div class="prod-item-center">
            <p class="prodName">{{item.name}}</p>
            <p class="old-price">￥{{item.retailPrice}}</p>
            <p class="new-price">￥{{item.tradePrice}}</p>
          </div>
          <div class="prod-item-right">
            x{{item.num}}
          </div>
        </li>
      </ul>
      <p class="layout-tow-columns">
        <span class="column-left">总计</span>
        <span class="column-right">￥{{getTotal()}}</span>
      </p>
      <!-- <p class="layout-tow-columns">
        <span class="column-left">运费</span>
        <span class="column-right">￥0.00</span>
      </p> -->
      <p class="layout-tow-columns">
        <span class="column-left">实付款</span>
        <span class="blue column-right">￥{{getTotal()}}</span>
      </p>
    </div>
    <div class="gradient-botton-blue" @click="showDialog=!showDialog">
      {{submitBtnTxt}}
    </div>
    <!-- 进货确认支付弹窗 -->
    <x-dialog v-model="showDialog" :hide-on-blur="true">
      <!-- 进货 -->
      <div class="dialog-validCode" v-if="type!=='replenish'">
        <div class="dialog-head">
          <span>支付金额</span>
          <h4 class="total-price">¥{{getTotal()}}</h4>
        </div>
        <div class="dialog-body">
          <p class="verify-tips">请进行手机验证：</p>
          <div class="form-container">
            <div class="input-item">
              <input type="text" class="mobile" disabled v-model="userInfo.mobile">
              <span @click="sendCode" class="send-code" :class="{ success: canSendCode}">{{ codeText }}</span>
            </div>
            <div class="input-item">
              <input type="text" v-model="code" placeholder="请输入验证码">
            </div>
          </div>
          <div @click="validCode" class="submit">确认</div>
          <div @click="showDialog = false" class="cancel">取消</div>
        </div>
      </div>
      <!-- 补货 -->
      <div class="dialog-choose" v-else>
        <p class="dialog-title">您确定补货吗</p>
        <div class="dialog-button-group">
          <div class="gradient-botton-blue" @click="validCode">
            确认
          </div>
          <div class="cancel" @click="showDialog = false">
            取消
          </div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, Toast} from 'vux'
import {mapGetters} from 'vuex'
import Qs from 'qs'
export default {
  data() {
    return {
      showDialog: false,
      mobile: '',
      canSendCode: false,
      isDisable: false,
      codeText: '发送验证码',
      code: '',
      submitBtnTxt: '立即支付',
      type: null,
      reset: 0
    }
  },
  created() {
    if (this.$route.query.type === 'replenish') this.submitBtnTxt = '立即补货'
    this.type = this.$route.query.type
    this.canSendCode = this.userInfo.mobile ? true : false
  },
  components: {
    XDialog,
    Toast
  },
  methods: {
    // 发送验证码
    sendCode() {
      if (!this.canSendCode) {
        return false
      }
      let data = Qs.stringify({mobile: this.userInfo.mobile, type: 6})
      this.$axios.post('/users/sendSMS', data).then((res) => {
        if (res.info === '短信发送次数太多') {
          this.$vux.toast.show({
            text: '短信发送次数太多',
            type: 'warn'
          })
          return
        }
        if (res.status == 1) {
          this.reset = 60
          this.canSendCode = false
          let timer = setInterval(() => {
            this.reset--;
            this.codeText = `${this.reset}秒后重新发送`
            if (this.reset == 0) {
              clearInterval(timer)
              this.codeText = '发送验证码'
              this.canSendCode = true
            }
          }, 1000)
        }
      })
    },
    // 验证code并提交订单
    validCode() {
      if (!this.code) {
        return 
      }
      let goods = []
      this.cart.forEach((item, index) => {
        goods.push({
          id: item.id,
      		quantity: item.num
        })
      })
      let params = Qs.stringify({code: this.code, goods:JSON.stringify(goods), addr: this.address.id})
      this.$axios.post('/agent/stock', params).then((res) => {
        if (res.status == 1) {
          this.showDialog = false
          this.$vux.toast.show({
            text: res.info,
            time: 500
          })
          let timer = setTimeout(() => {
            this.$router.push({
              path: '/orderList'
            })
          }, 500)
        }
      })

    },
    payment() {

    },
    getTotal() {
      let cart = this.cart, total = 0
      cart.forEach((item) => {
        total += item.num * item.tradePrice
      })
      return total
    },
  },
  computed: {
    ...mapGetters([
      'cart',
      'address',
      'userInfo'
    ])
  }
}
</script>

<style lang="stylus">
  .payment-wrapper
    .address
      display: flex
      background: #fff
      align-items: center
      min-height: 95px
      padding: 0 15px
      border-bottom: 2px solid #71ABFD
      margin-bottom:12px
      text-align:left
      .icon-address
       fill:#71ABFD
      .txt
        flex:1
        padding:0 10px
        .userInfo
          color:#38393C
          font-size:14px
          margin-bottom:10px
        .addressInfo
          color:#38393C
          font-size:12px
    .prod-title
      height:45px
      padding-left:15px
      color:#38393C
      font-size:14px
      background:#fff
      line-height:45px
      border-bottom:1px solid #e2e2e2
      text-align:left
    .prod-list
      .prod-item
        position:relative
        display: flex
        background: #fff
        padding: 0 15px
        align-items:center
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
    .layout-tow-columns
      span
        color:#38393C
        font-size:14px
        &.blue
          color:#71ABFD
          font-size:16px
          font-weight:bold
    .dialog-validCode
      text-align: left
      .dialog-head
        background: #3484FF
        text-align: center
        padding: 15px 0
        color: #fff
        span
         font-size: 14px
        .total-price
          font-size: 24px
          font-weight: 700
      .dialog-body
        padding: 15px
        .verify-tips
          color: #4F5054
          padding-bottom: 8px
        .input-item
          display: flex
          padding-bottom: 10px
          input
            flex: 1
            width: 100%
            background: #F2F2F2
            border-radius: 3px
            height: 45px
            line-height: 45px
            padding-left: 15px
            outline: none
        .send-code
          flex: 0 0 auto
          display: block
          background: #ccc
          border-radius: 3px
          font-size: 12px
          line-height: 45px
          padding: 0 15px
          color: #fff
          margin-left: 10px
          &.success
            background: #71ABFD
        .submit
           margin-top: 5px
           height: 45px
           color: #fff
           background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%)
           box-shadow: 0 7px 10px -5px #71ABFD
           border-radius: 3px
           text-align: center
           line-height: 45px
        .cancel
         font-size: 14px
         color: #9B9B9B
         text-align: center
         line-height: 40px
        .mobile
          color: #999
    .dialog-choose
        .dialog-title
          height: 100px
          line-height: 100px
          color: #4F5054
          font-size: 14px
        .dialog-button-group
          .gradient-botton-blue
            margin:0 28px 15px
          .cancel
            margin-bottom: 20px
            font-size: 14px
            color: #9b9b9b

</style>
