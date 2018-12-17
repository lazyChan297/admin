<template lang="html">
  <!-- 我的发货记录 -->
  <div class="deliveryList-wrapper">
    <ul class="month-list">
      <li class="month-item">
        <p class="timeLine complete">
          <span>以下订单已补货</span>
        </p>
        <p class="timeLine">
          <span>10月</span>
        </p>
        <ul class="order-list">
          <li class="order-item">
            <div class="layout-tow-columns">
              <span class="column-left statu">状态</span>
              <span class="column-right">已发货</span>
            </div>
            <div class="prod-item">
              <div class="prod-item-left">
                <img src="../../common/images/prod.jpg" alt="">
              </div>
              <div class="prod-item-center">
                <p class="prodName">每日活肤素</p>
                <p class="old-price"></p>
                <p class="new-price">￥298</p>
              </div>
              <div class="prod-item-right">
                x10
              </div>
            </div>
            <div class="layout-tow-columns">
              <span class="column-left">实付款</span>
              <span class="column-right pink">￥398</span>
            </div>
            <div class="address">
                <p>
                  <span class="receiver">收件人：</span>
                  <span class="name">张三</span>
                  <span class="phone">13877414856</span>
                </p>
                <p>
                  <span class="receivedAddr">收货地址：</span>
                  <span class="addr">广西壮族自治区南宁市青秀区民族大道航洋城B座2310</span>
                </p>
            </div>
          </li>
        </ul>
      </li>
      <li class="month-item">
        <p class="timeLine">
          <span>本月</span>
        </p>
        <ul class="order-list">
          <li class="order-item">
            <div class="layout-tow-columns">
              <span class="column-left statu">状态</span>
              <span class="column-right">已发货</span>
            </div>
            <div class="prod-item">
              <div class="prod-item-left">
                <img src="../../common/images/prod.jpg" alt="">
              </div>
              <div class="prod-item-center">
                <p class="prodName">每日活肤素</p>
                <p class="old-price"></p>
                <p class="new-price">￥298</p>
              </div>
              <div class="prod-item-right">
                x10
              </div>
            </div>
            <div class="layout-tow-columns">
              <span class="column-left">实付款</span>
              <span class="column-right pink">￥398</span>
            </div>
            <div class="address">
                <p>
                  <span class="receiver">收件人：</span>
                  <span class="name">张三</span>
                  <span class="phone">13877414856</span>
                </p>
                <p>
                  <span class="receivedAddr">收货地址：</span>
                  <span class="addr">广西壮族自治区南宁市青秀区民族大道航洋城B座2310</span>
                </p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  .deliveryList-wrapper
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
      &.complete
        &:before
          content:''
          display:inline-block
          width:65%
          height:2px
          vertical-align:middle
          background:#e2e2e2
        &:after
          display:none
      span
        color:#9b9b9b
        font-size:12px
        margin:0 10px
    .order-list
      .order-item
        margin-top:10px
        &:first-child
          margin-top:0
        &>.layout-tow-columns
          height:40px
          font-size:16px
          .column-left.statu
            &:after
              content:'客户订单'
              display:inline-block
              font-size:10px
              background:#FF7584
              height: 16px
              vertical-align: middle
              line-height: 16px
              color: #fff
              border-top-right-radius: 100px
              border-bottom-right-radius: 100px
              padding: 0 4px
              margin-left: 5px
          .column-right
            color:#9b9b9b
          .pink
            color:#FF7584
          &:last-child
            border-bottom:none
        .prod-item
          position:relative
          display: flex
          background: #fff
          padding: 0 15px
          align-items:center
          border-bottom: 1px solid #e2e2e2
          box-sizing: border-box
          .prod-item-left
           margin:10px 0
           img
            width:80px
            height:80px
          .prod-item-center
            flex:1
            margin-left:9px
            text-align:left
            .prodName
              color:#38393C
              font-size:16px
              font-weight:bold
            .old-price
              margin: 10px 0 5px
              text-decoration: line-through
              color: #9B9B9B
              font-size: 12px
            .new-price
              color: #38393C
              font-size: 12px
          .prod-item-right
            color:#9B9B9B
            font-size:14px
        .address
          p
            display:flex
            background:#fff
            padding: 15px 15px 0px
            font-size:12px
            &:last-child
              padding-bottom: 10px
            .name
            .addr
             flex:1
             text-align:left
            .receiver
            .receivedAddr
              color:#9b9b9b
            .phone
              color:#71ABFD
            .addr
              line-height:15px
</style>
