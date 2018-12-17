<template lang="html">
  <div class="delivery-wrapper">
    <div class="layout-tow-columns">
      <div class="column-left">
        快递公司
      </div>
      <div class="column-right">
        韵达快递
      </div>
    </div>
    <div class="layout-tow-columns">
      <div class="column-left">
        物流单号
      </div>
      <div class="column-right">
        12345689
      </div>
    </div>
    <div class="progress mt10">
      <ul class="list">
        <li class="item current">
          <div class="icon">
            <i class="icon-delivery1"></i>
          </div>
          <div class="txt">
            <p class="location">正在发往南宁</p>
            <p class="time">2018-09-11 12:09:10</p>
          </div>
        </li>
        <li class="item">
          <div class="icon">
            <i class="icon-dot"></i>
          </div>
          <div class="txt">
            <p class="location">正在发往南宁</p>
            <p class="time">2018-09-11 12:09:10</p>
          </div>
        </li>
        <li class="item">
          <div class="icon">
            <i class="icon-dot"></i>
          </div>
          <div class="txt">
            <p class="location">已揽件</p>
            <p class="time">2018-09-11 12:09:10</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  .delivery-wrapper
    .layout-tow-columns
      border:none
      font-size:16px
      .column-right
        color: $color-pink
    .list
      padding: 10px 15px
      background:#fff
      .item
        display:flex
        align-items: center
        text-align:left
        font-size:14px
        padding-top:10px
        .icon
          margin-right:10px
          width:23px
          position:relative
          &:after
            content:''
            position:absolute
            width:1px
            top: -31px;
            height: 31px;
            background:#c5c5c5
            left: 50%
            margin-left: -.5px
          .icon-dot
            &:before
              content:''
              display: block
              width:10px
              height:10px
              border-radius:50%
              background:$color-gray
              margin:auto
        &.current
          margin-bottom:10px
          padding-top:0
          .location
            color:$color-pink
          .icon
            &:after
              content:''
              position:absolute
              width:1px
              height:15px
              background:#c5c5c5
              left: 50%
              margin-left: -.5px
              top: 20px
        .time
          color: $color-gray
          margin-top:5px
          font-size:12px
</style>
