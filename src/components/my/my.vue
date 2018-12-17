<template lang="html">
  <div class="my-wrapper">
    <div class="header">
      <div class="detail">
        <div class="">
          <div class="img-box">
            <img :src="userInfo.avatarUrl" alt="" width="60" height="60">
          </div>
          <div class="user-box">
            <p class="name">{{userInfo.nickName}}</p>
            <p class="already">今天是你来到氢链的第{{userInfo.days}}天</p>
          </div>
          <router-link tag="div" class="icon" to="/userInfo">
            <i class="icon-setting"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="layout-tow-columns mt10">
      <span class="column-left">代理区域</span>
      <span class="column-right area">{{getAgent()}}</span>
    </div>
    <div class="layout-tow-columns">
      <span class="column-left">代理商数据报告</span>
      <span class="column-right"><i class="icon-jiantou"></i></span>
    </div>
    <router-link tag="div" class="layout-tow-columns" to="/apply">
      <span class="column-left">申请其它区域代理商</span>
      <span class="column-right"><i class="icon-jiantou"></i></span>
    </router-link>
    <tab-bar :currentTabIndex="currentTabIndex"></tab-bar>
  </div>
</template>

<script>
import TabBar from '@/base/tabBar/tabBar'
import {mapMutations, mapGetters} from 'vuex'
export default {
  data() {
    return {
      currentTabIndex: 3
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$axios.get('/users/info').then((res) => {
        this.saveUserInfo(res.data.userInfo)
        console.log(res)
      })
    },
    // 获取代理区域
    getAgent() {
      let obj = this.userInfo.agent, agent = ''
      for (let k in obj) {
        agent = obj[k]
      }
      return agent
    },
    ...mapMutations({
      saveUserInfo: 'SAVE_USERINFO'
    })
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    TabBar
  }
}
</script>

<style lang="stylus">
  .my-wrapper
    .header
      background:#fff
      height:130px
      .detail
        color:#fff
        background: url('userBgImg.jpg') no-repeat center
        background-size: 100%
        height: 100%
        text-align:left
        &>div
          display: flex
          margin: auto
          padding: 35px 15px
          .img-box
           img
            border-radius: 50%
          .user-box
            margin-left: 10px
            flex:1
            .name
              font-size: 16px
              margin-top: 8px
            .already
              font-size: 12px
              margin-top: 6px
    .area
      color:#9b9b9b
      font-size:16px
</style>
