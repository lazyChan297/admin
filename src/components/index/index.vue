<template lang="html">
  <div class="index-wrapper" v-show="isLoading">
    <!-- 明细 -->
    <div class="header">
      <div class="detail" v-cloak>
        <p class="detail-title">总收益 (元)</p>
        <div class="detail-content">
          <p class="detail-number">{{info.totalIncome}}</p>
          <router-link to="/incomeList" tag="div" class="detail-link">明细</router-link>
        </div>
      </div>
    </div>
    <!-- 待发货数、访客 -->
    <div class="deliveryAndVisitor">
      <div class="delivery">
        <router-link :to="{ name: '', params: {} }" tag="p" class="title">待发货数</router-link>
        <span>{{info.ordersCount}}</span>
      </div>
      <div class="visitor">
        <router-link to="/visitor" tag="p" class="title">今日访客数</router-link>
        <span>{{info.viewersCount}}</span>
      </div>
    </div>
    <!-- 进货、补货、邀请好友 -->
    <ul class="list">
      <li class="list-item" @click="gotoPage('purchase')">
        <i class="icon-jinhuo"></i>
        <div class="list-item-right">
          进货
        </div>
        <i class="icon icon-jiantou"></i>
      </li>
      <li class="list-item" @click="gotoPage('replenish')">
        <i class="icon-buhuo">
        </i>
        <div class="list-item-right">
          <span>补货</span>
        </div>
        <i class="icon icon-jiantou"></i>
      </li>
    </ul>
    <!-- 邀请好友 -->
    <ul class="list">
      <router-link to="/invite" class="list-item" tag="li">
        <i class="icon-invite"></i>
        <div class="list-item-right">
          <span>邀请好友</span>
        </div>
        <i class="icon icon-jiantou"></i>
      </router-link>
    </ul>
    <tab-bar :currentTabIndex="currentTabIndex"></tab-bar>
    <router-view/>
  </div>
</template>

<script>
import TabBar from '@/base/tabBar/tabBar'
export default {
  data() {
    return {
      currentTabIndex: 0,
      info: {},
      isLoading: false
    }
  },
  mounted() {
    this._getIndex()
  },
  methods: {
    gotoPage(n) {
      this.$router.push(n)
    },
    _getIndex() {
      this.$axios.get('/agent/index').then( res => {
        if (res.status == 1) {
          this.info = res.data
          this.isLoading = true
        }
      })
    }
  },
  components: {
    TabBar
  }
}
</script>

<style lang="stylus">
  [v-cloak] 
    display: none;
  .index-wrapper
    .header
      padding: 11px 15px 4px;
      background:#fff
      border-radius:8px
      height:130px
      .detail
        color:#fff
        background: url('index_bgimg.png') no-repeat center
        box-shadow: 0px 1px 7px #71ABFD
        background-size: 100%
        height: 100%
        border-radius: 8px
        text-align:left
        .detail-title
          margin-left:20px
          padding-top:30px
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
            background: #FDDA00
            color: #fff
            width:58px
            height:26px
            line-height:26px
            font-size:12px
            border-radius: 100px
            text-align:center
            margin-right:20px
    .deliveryAndVisitor
      display: flex
      align-items: center
      height: 64px
      box-sizing:border-box
      background:#fff
      .delivery,.visitor
        flex:1
        text-align:center
        .title
          color:#9B9B9B
          font-size: 12px
        span
         color:#38393C
         font-weight:bold
         font-size:20px
         line-height:28px
    .list
      margin-top: 10px
      .list-item
        height:50px
        background: #fff
        display: flex
        align-items: center
        padding: 0 15px
        &>i
          margin-right: 10px
        .icon-jiantou
          margin-left: -15px
        .list-item-right
          color: #535353
          text-align:left
          font-size: 14px
          flex: 1
          height: 100%
          line-height: 50px
          border-bottom: 2px solid #E2E2E2
        &:last-child
          .list-item-right
            border:none
</style>
