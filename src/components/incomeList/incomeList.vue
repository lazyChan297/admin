<template lang="html">
  <div class="incomeList-wrapper">
    <ul class="monthList">
      <li class="month-item" v-for="(item,index) in incomeList">
        <p class="timeLine">
          <span>{{item.month}}</span>
        </p>
        <ul class="prod-list">
          <li class="prod-item" v-for="order in item.items">
            <p class="prod-num">订单编号:{{order.no}}</p>
            <div class="prod-item-content" v-for="goods in order.goods">
              <div class="prod-item-left">
                <img :src="goods.img" alt="">
              </div>
              <div class="prod-item-center">
                <p class="prodName">{{goods.name}}</p>
                <p class="price">￥{{goods.amount}}</p>
              </div>
              <div class="prod-item-right">
                X{{goods.quantity}}
              </div>
            </div>
            <div class="layout-tow-columns">
              <span class="column-left">订单总价</span>
              <span class="column-right">￥{{order.amount}}</span>
            </div>
            <div class="layout-tow-columns">
              <span class="column-left">总佣金</span>
              <div class="column-right">
                <span class="blue">￥{{order.income}}</span>
                <i class="icon-jiantou"></i>
              </div>
            </div>
            <div class="layout-tow-columns">
              <span class="column-left">付款人</span>
              <div class="column-right">
                <span>
                  <img :src="order.avatar" alt="" class="avatar">
                  <span>{{order.payer}}</span>
                </span>
                <i class="icon-jiantou"></i></div>
            </div>
          </li>
        </ul>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      incomeList: []
    }
  },
  mounted() {
    this.getIncomeList()
  },
  methods: {
    getIncomeList() {
      this.$axios.get('/agent/incomeList',{
        params: {
          page: 1,
          number: 15
        }
      }).then( res => {
        this.incomeList = this.formatList(res.data.orders)
        console.log(this.incomeList)
      })
    },
    formatList(list) {
      let map = {}, ret = [], arr = []
      list.forEach((item,index) => {
        let month = item.createdAt
        if (!map[month]) {
          map[month] = [item]

        } else {
          map[month].push(item)
        } 
      })
      for (let k in map) {
        ret.push({
          month: k,
          items: map[k]
        })
      }
      return ret
    }
  }
}
</script>

<style lang="stylus">
  .incomeList-wrapper
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
    .prod-item
      background:#fff
      margin-bottom:10px
      .prod-num
        line-height: 30px
        padding-left:15px
        border-top: 1px solid #e2e2e2
        border-bottom: 1px solid #e2e2e2
        font-size: 12px
        color: #9b9b9b
      .prod-item-content
        display: flex
        height:80px
        align-items: center
        padding-left:15px
        .prod-item-left
          img
           width:60px
           height:60px
        .prod-item-center
          margin-left:10px
          flex:1
          text-align:left
          .prodName
            font-size:14px
            font-weight:bold
            margin-bottom:10px
          .price
            font-size:12px
            color:#9b9b9b
        .prod-item-right
          font-size:14px
          text-align:center
          margin-right:20px
    .layout-tow-columns
      .column-left
        color:#b9b9b9
      .blue
        color:#0091FF
        font-weight:bold
      .avatar
        display:inline-block
        height:24px
        width:24px
        border-radius:50%
        vertical-align: middle
</style>
