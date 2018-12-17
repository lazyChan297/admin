<template lang="html">
  <div class="visitor-wrapper">
    <ul class="list">
      <p class="title">今天</p>
      <ul>
        <li class="item">
          <div class="item-img">
            <img src="../../common/images/prod.jpg" alt="" width="50" height="50">
          </div>
          <div class="item-right">
            <p class="name">张三</p>
            <p class="time"><span>访问时间：</span><span>2018年8月31日 14:32</span> </p>
            <div class="interval">
              <span>距离失效</span><span>23:02:11</span>
            </div>
            <div class="disable">

            </div>
          </div>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getVisitor()
  },
  methods: {
    getVisitor() {
      this.$axios.get('/agent/viewers').then( res => {
        this.list = res
      })
    }
  }
}
</script>

<style lang="stylus">
  .visitor-wrapper
    .list
      background: #fff;
      .title
        color:#9b9b9b
        font-size:12px
        line-height:30px
        text-align: left;
        padding-left: 12px
        background:#f7f7f7
      .item
        display: flex;
        height: 100px;
        align-items: center;
        padding-left: 15px;
        text-align:left
        position:relative
        border-bottom: 1px solid #e2e2e2;
        margin: 0 15px
        .item-img
          img
            border-radius:50%
        .item-right
          flex:1
          margin-left:10px
        .time
            font-size:12px
            margin-top:5px
          .interval
            right:-15px
            top:10px
            position: absolute;
            border-top-left-radius: 100px;
            border-bottom-left-radius: 100px;
            font-size: 12px;
            color: #fff;
            height: 20px;
            line-height: 20px;
            padding: 0 14px
            background-image: linear-gradient(-180deg, #7ED6FF 0%, #2690EB 100%)
          .disable
            position:absolute
            right:-21px
            top:15px
            background-image:url('../../common/svg/disable.svg')
            background-size:100%
            width:60px
            height:60px
</style>
