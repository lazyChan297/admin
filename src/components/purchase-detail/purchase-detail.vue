<template lang="html">
  <div class="purchaseDetail-wrapper">
    <p class="account">134.00</p>
    <ul>
      <li class="layout-tow-columns">
        <div class="column-left">
          付款方式
        </div>
        <div class="column-right">
          余额
        </div>
      </li>
      <li class="layout-tow-columns">
        <div class="column-left">
          商品说明
        </div>
        <div class="column-right">
          每日复活苏
          <i class="icon-jiantou">
          </i>
        </div>
      </li>
      <li class="layout-tow-columns address">
        <div class="column-left">
          收货地址
        </div>
        <div class="column-right">
          <span>南宁市青秀区航洋国际B座2301</span>
        </div>
      </li>
      <li class="layout-tow-columns">
        <div class="column-left">
          收货人
        </div>
        <div class="column-right">
          <span>张三</span>
        </div>
      </li>
      <li class="layout-tow-columns">
        <div class="column-left">
          物流信息
        </div>
        <div class="column-right">
          <span>已签收</span>
        </div>
      </li>
      <li class="layout-tow-columns mt10">
        <div class="column-left">
          创建时间
        </div>
        <div class="column-right">
          <span>2018年11月1日 15:41</span>
        </div>
      </li>
      <li class="layout-tow-columns">
        <div class="column-left">
          订单号
        </div>
        <div class="column-right">
          123456789
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  .purchaseDetail-wrapper
    .account
      height: 95px
      font-size: 32px
      text-align: center
      line-height: 95px
      font-weight: bold
      background: #fff
      color:#38393C
    .layout-tow-columns
      border:none
      &.address
        padding-top:15px
        padding-bottom:15px
        .column-right
          line-height:22px
      .column-left
        color:#9B9B9B
      .column-right
        color:#4A4A4A
</style>
