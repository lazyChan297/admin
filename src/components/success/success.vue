<template lang="html">
  <div class="success-wrapper">
    <div class="icon replenish"></div>
    <div class="txt">
      发货成功
    </div>
    <p class="waiting">等待资料审核</p>
    <div class="return">
      返回发货管理
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable.styl"
  .success-wrapper
    &.valid
      background:#fff
    padding-top: 30px;
    padding-bottom: 30px
    .icon
      width:50px
      height:50px
      margin:0 auto 5px
      &.delivery
        background-image:url('../../common/svg/radio.svg')
        background-size:100%
      &.replenish,&.purchase
        background-image:url('../../common/svg/radioblue.svg')
        background-size:100%
    .txt
      font-size:20px
      line-height: 28px
    .return
      margin:280px auto 0
      border-radius:100px
      border:1px solid $color-gray
      display: inline-block;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      color:$color-gray
    .waiting
      color: #9b9b9b
      margin-top: 5px
</style>
