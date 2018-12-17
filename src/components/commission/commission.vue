<!-- 总收益明细 - 总佣金 - 佣金明细 -->
<template lang="html">
  <div class="commission-wrapper">
    <div class="total">
      <p class="title">总佣金</p>
      <p class="number">￥99.00</p>
    </div>
    <div class="mt10">
      <div class="layout-tow-columns">
        <div class="column-left">
          分销佣金
        </div>
        <div class="column-right">
          ￥50.00
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  .commission-wrapper
    .total
      height:100px
      background:#fff
      padding:20px 0
      box-sizing: border-box
    .title
      color:#b9b9b9
      margin-bottom:7px
    .number
      font-weight:bold
      color:#6DA6FE
      font-size:24px
    .layout-tow-columns
      border:none
    .column-left
     color:#9b9b9b
    .column-right
      font-weight:bold
</style>
