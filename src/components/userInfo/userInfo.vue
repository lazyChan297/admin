<template lang="html">
  <div class="userInfo-wrapper">
    <p class="title">基本信息</p>
    <div class="layout-tow-columns">
      <span class="column-left">头像</span>
      <div class="column-right">
        <img :src="userInfo.avatarUrl" alt="" width="36" height="36">
      </div>
    </div>
    <div class="layout-tow-columns">
      <span class="column-left">昵称</span>
      <div class="column-right">
        {{userInfo.nickName}}
      </div>
    </div>
    <router-link to="/bindPhone" class="layout-tow-columns" tag="div">
      <span class="column-left">手机号</span>
      <div class="column-right">
        <span>{{userInfo.mobile}}</span>
        <i class="icon-jiantou"></i>
      </div>
    </router-link>
    <div class="layout-tow-columns">
      <span class="column-left">代理登记</span>
      <div class="column-right">
        {{getAgent()}}
      </div>
    </div>
    <div class="layout-tow-columns" v-show="userInfo.invitor != 0">
      <span class="column-left">邀请人</span>
      <div class="column-right">
        {{userInfo.invitorName}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  methods: {
    getAgent() {
      let obj = this.userInfo.agent, level = ''
      for (let k in obj) {
        level = k
      }
      return level == 1 ? '省级' : level== 2 ? '市级' : '县级'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style lang="stylus">
  .title
    height: 40px;
    text-align: left;
    line-height: 40px;
    padding-left: 15px
  .layout-tow-columns
    &:last-child
      border:none
    .column-right
      color:#9b9b9b
      img
        border-radius: 50%
        margin: 9px 0 0
</style>
