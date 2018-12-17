<template lang="html">
  <div class="replenish-wrapper">
    <div class="bgImg"></div>
    <ul class="recode-list">
      <li class="recode-item">
        <i class="icon-buhuo"></i>
        <span>补货记录</span>
        <i class="icon-jiantou"></i>
      </li>
      <router-link tag="li" to="/deliveryList" class="recode-item">
        <i class="icon-fahuo"></i>
        <span>我的发货记录</span>
        <i class="icon-jiantou"></i>
      </router-link>
    </ul>
    <ul class="prod-list">
      <p class="layout-tow-columns list-title">
        <span class="column-left">产品</span>
        <span class="column-right">数量</span>
      </p>
      <div class="empty" v-show="isEmpty">
        <img src="../../common/images/empty.png" alt="">
        <span class="txt">数据空空</span>
      </div>
      <li class="prod-item">
        <div class="prod-item-left">
          <img src="../../common/images/prod.jpg" alt="">
        </div>
        <div class="prod-item-center">
          <p class="prodName">每日复活苏</p>
          <p class="price">￥298.00</p>
        </div>
        <div class="prod-item-right">
          X10
        </div>
      </li>
      <li class="prod-item">
        <div class="prod-item-left">
          <img src="../../common/images/prod.jpg" alt="">
        </div>
        <div class="prod-item-center">
          <p class="prodName">每日复活苏</p>
          <p class="price">￥298.00</p>
        </div>
        <div class="prod-item-right">
          X10
        </div>
      </li>
      <li class="prod-item">
        <div class="prod-item-left">
          <img src="../../common/images/prod.jpg" alt="">
        </div>
        <div class="prod-item-center">
          <p class="prodName">每日复活苏</p>
          <p class="price">￥298.00</p>
        </div>
        <div class="prod-item-right">
          X10
        </div>
      </li>
    </ul>
    <div class="replenishBtn" @click="submit">
      立即补货
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prodList: [],
      isEmpty: false
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      this.$axios.get('/agent/unreplenish').then((res) => {
        console.log(res)
      })
    },
    submit() {
      this.$router.push({path: '/payment', query:{type:'replenish'}})
    }
  }
}
</script>

<style lang="stylus">
  .replenish-wrapper
    .bgImg
      background:url('../../common/images/replenishBgimg.png') no-repeat center
      background-size: 100%
      height:180px
      max-height:180px
    .recode-list
      border-radius: 8px
      background: #fff
      margin: -45px 15px
      padding: 0 15px
      box-shadow: 0px 2px 4px rgba(0,0,0,.1)
      text-align:left
      .recode-item
        display: flex
        height: 53px
        line-height: 53px
        border-bottom:1px solid #e2e2e2
        &:last-child
         border:none
        .icon-buhuo
          &:before
           content:''
           display:inline-block
           background-image:url('../../common/svg/buhuo.png')
           background-size:100%
           width:20px
           height:22px
           vertical-align: middle
           margin-right:11px
        .icon-fahuo
          &:before
            content:''
            display:inline-block
            background-image:url('../../common/svg/fahuo.png')
            background-size:100%
            width:20px
            height:22px
            vertical-align: middle
            margin-right:11px
        span
         flex:1
    .prod-list
      margin: 63px 15px 0
      background:#fff
      border-bottom-left-radius: 8px
      border-bottom-right-radius: 8px
      box-shadow: 0px 2px 4px rgba(0,0,0,.1)
      .empty
       text-align:center
       padding-bottom:70px
       img
        display: block
        width:121px
        height:81px
        margin: 60px auto 0
      .txt
        display:inline-block
        margin-top:20px
        color:#b9b9b9
        font-size:10px
      .list-title
       background:rgba(201,224,255,.4)
       border:none
       border-top-left-radius:8px
       border-top-right-radius:8px
      .prod-item
        display: flex
        height:100px
        align-items: center
        padding-left:15px
        .prod-item-left
          img
           width:80px
           height:80px
        .prod-item-center
          height:80px
          margin-left:10px
          border-right: 2px solid #C9E0FF
          text-align:left
          flex:1
          .prodName
            font-size:16px
            font-weight:bold
            margin-top:16px
            margin-bottom:10px
          .price
            font-size:12px
            color:#9b9b9b
        .prod-item-right
          width:70px
          text-align:center
          color:#3484FF
          font-weight:bold
    .replenishBtn
      height:45px
      background:#BDBFC1
      color:#fff
      text-align:center
      line-height:45px
      margin:20px 15px 20px
      font-size:14px
      border-radius: 3px
      box-shadow: 0px 2px 4px rgba(0,0,0,.1)
</style>
