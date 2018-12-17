<template lang="html">
  <div class="tabBar-wrapper">
    <router-link to="/" tag="div" class="tabBar-item" :class="['tabBar-item', currentTabIndex===0?'active':'']">
      <i class="icon icon-index"></i>
      <p class="txt">首页</p>
    </router-link>
    <router-link to="/customList" tag="div" class="tabBar-item" :class="['tabBar-item', currentTabIndex===1?'active':'']">
      <i class="icon icon-customer"></i>
      <p class="txt">客户</p>
    </router-link>
    <router-link to="/orderList" tag="div" class="tabBar-item" :class="['tabBar-item', currentTabIndex===2?'active':'']">
      <i class="icon icon-order"></i>
      <p class="txt">订单</p>
    </router-link>
    <router-link to="/my" tag="div" class="tabBar-item" :class="['tabBar-item', currentTabIndex===3?'active':'']">
      <i class="icon icon-user"></i>
      <p class="txt">我的</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    currentTabIndex: Number,
    default: 0
  }
}
</script>

<style lang="stylus">
 @import "../../common/stylus/mixin"

  .tabBar-wrapper
    position: fixed
    bottom: 0
    display: flex
    width: 100%
    align-items: center
    height:50px
    background: #fff
    .tabBar-item
      flex: 1
      text-align:center
      color: #38393C
      font-size: 10px
      .icon-index
        &:before
         bg-image()
         background-image: url('index.svg')
      .icon-customer
       &:before
         bg-image()
         background-image: url('customer.svg')
      .icon-order
       &:before
         bg-image()
         background-image: url('order.svg')
      .icon-user
        &:before
          bg-image()
          background-image: url('user.svg')
      &.active
        color: #6DA6FE
        .icon-index
          &:before
           bg-image()
           background-image: url('index1.svg')
        .icon-customer
         &:before
           bg-image()
           background-image: url('customer1.svg')
        .icon-order
          &:before
             bg-image()
             background-image: url('order1.svg')
        .icon-user
          &:before
            bg-image()
            background-image: url('user1.svg')
</style>
