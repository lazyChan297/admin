<!-- 客户主页 -->
<template lang="html">
  <div class="custom-wrapper">
    <div class="avatar">
      <img :src="customerInfo.avatar" alt="">
      <div>
        <p class="userName">{{customerInfo.nickname}}</p>
        <p class="bindTime">绑定时间{{customerInfo.beStatusAt}}</p>
      </div>
    </div>
    <section class="box">
      <div class="layout-tow-columns">
        <span class="column-left">手机号</span>
        <span class="column-right">{{customerInfo.mobile}}</span>
      </div>
    </section>
    <section class="box mt10">
      <div class="layout-tow-columns" @click="orderlistView">
        <span class="column-left">订单数量</span>
        <div class="column-right"><span class="num">{{customerInfo.ordersCount}}</span><i class="icon-jiantou"></i></div>
      </div>
      <div class="layout-tow-columns">
        <span class="column-left">成交金额</span>
        <span class="column-right">{{customerInfo.boughtAmount}}</span>
      </div>
    </section>
    <section class="box mt10">
      <div class="layout-tow-columns">
        <span class="column-left">首次登陆时间</span>
        <div class="column-right">{{customerInfo.firstLoginAt}}</div>
      </div>
      <div class="layout-tow-columns">
        <span class="column-left">最近访问时间</span>
        <span class="column-right">{{customerInfo.lastVisitedAt}}</span>
      </div>
    </section>
    <div class="singleColor-button-blue" @click="showDialog = true" v-show="customerInfo.status==0">
      指定为分销员
    </div>
    <x-dialog v-model="showDialog">
      <div class="dialog">
        <p class="dialog-title">确认指定该用户成为分销员吗</p>
        <div class="dialog-button-group">
          <div class="gradient-botton-blue">
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
import { XDialog } from 'vux'
export default {
  data() {
    return {
      showDialog:false,
      customerInfo: {}
    }
  },
  created() {
    
  },
  mounted() {
    let sn = this.$route.params.userSn
    this.userSn = sn
    this.getCustomer(sn)
  },
  components: {
    XDialog
  },
  methods: {
    orderlistView() {
      this.$router.push(`/customOrderList/${this.userSn}`)
    },
    getCustomer(sn) {
      this.$axios.get('/agent/customerInfo', {
        params: {
          sn: sn
        }
      }).then((res) => {
        this.customerInfo = res.data.customerInfo
      })
    }
  },
  computed: {
    
  }
}
</script>

<style lang="stylus">
  .custom-wrapper
    .avatar
      height: 100px
      display: flex
      align-items: center
      background: #fff
      padding: 0 15px
      border-bottom:1px solid #e2e2e2
      img
        width:50px
        height:50px
        border-radius:50%
        margin-right:10px
      .userName
        text-align: left
        font-size: 24px
        font-weight: bold
        line-height:33px
      .bindTime
        color: #4F5054
        font-size: 12px
    .box
      border-bottom: 1px solid #e2e2e2
      background:#fff
      .layout-tow-columns
        &:last-child
          border:none
        .column-right
          .num
            margin-right:5px
</style>
