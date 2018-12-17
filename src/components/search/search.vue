<template lang="html">
  <div class="search-wrapper">
    <div class="search-box">
      <div class="search" tag="div" to="">
        <i class="icon-search"></i>
        <input type="text" name="" value="" placeholder="搜索" ref="input">
      </div>
      <span class="cancel" @click="cancel">取消</span>
    </div>
    <ul class="list">
      <p class="list-title">A</p>
      <li class="item">
        <img src="../../common/images/prod.jpg" alt="" width="50" height="50px">
        <div class="userInfo">
          <div class="txt">
            <p class="userName">张三</p>
          </div>
        </div>
      </li>
      <router-link class="item" to="/custom" tag="li">
        <img src="../../common/images/prod.jpg" alt="" width="50" height="50px">
        <div class="userInfo">
          <div class="txt">
            <p class="userName">张三</p>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
  .search-wrapper
    .search-box
      display:flex
      align-items:center
      position: fixed;
      background:#fff
      border-bottom:1px solid #e2e2e2
      width: 100%;
      top: 0;
      padding:10px 0 10px 20px
      height: 54px
      box-sizing: border-box
      .search
        flex:1
        position:relative
        border-radius:5px
        border:1px solid #dadada
        height:100%
        color:#9b9b9b
        line-height:36px
        overflow: hidden
        input
          margin-left: 34px
          height: 100%
          width: 100%
          outline:none
        .icon-search
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 10px
      .cancel
          color:#6DA6FE
          margin:0 10px
    .list
      margin-top:54px
      .list-title
        color:#000
        font-weight:bold
        text-align:left
        line-height:20px
        padding-left:10px
      .item
        display:flex
        align-items:center
        padding: 10px 0px 10px 15px
        background: #fff
        height: 80px;
        box-sizing: border-box;
        img
          border-radius:50%
          margin-right:10px
        .userInfo
          flex:1
          height: 80px;
          border-bottom: 1px solid #e2e2e2;
          display: flex;
          align-items: center
          box-sizing: border-box;
          .txt
            flex:1
            text-align:left
        .userName
          font-weight:bold
          font-size:16px
          text-align:left
          margin-bottom:5px
        &:last-child
          .userInfo
            border:none
            .dialog-title
              height: 100px
              line-height: 100px
              color: #4F5054
              font-size: 14px
</style>
