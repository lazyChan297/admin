<template lang="html">
  <div class="purchaseList-wrapper">
    <ul class="monthList">
      <p class="timeLine">
        <span>本月</span>
      </p>
      <ul class="list">
        <li class="layout-tow-columns" @click="checkDetail">
          <div class="column-left">
            <p class="type">进货</p>
            <p class="date">2018年11月1日 15：32</p>
          </div>
          <div class="column-right add">
            134.00
          </div>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    checkDetail() {
      this.$router.push('/purchaseDetail')
    }
  }
}
</script>

<style lang="stylus">
  .purchaseList-wrapper
    .monthList
      .timeLine
        text-align: center
        height: 30px
        line-height: 30px
        &:before
          content:''
          display:inline-block
          width:50px
          height:2px
          vertical-align:middle
          background:#e2e2e2
        &:after
          content:''
          display:inline-block
          width:50px
          height:2px
          vertical-align:middle
          background:#e2e2e2
        span
          color:#9b9b9b
          font-size:12px
          margin:0 10px
      .list
        background:#fff
      .layout-tow-columns
        padding: 15px 0
        margin:0 15px
        .type
          color: #38393C
          font-size: 16px
          line-height: 22px
          height: 22px
          margin-bottom: 5px
        .date
          font-size: 12px
          color: #9b9b9b
          height: 17px
          line-height: 17px
        .add
         color:#71ABFD
</style>
