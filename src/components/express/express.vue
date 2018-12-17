<template lang="html">
  <div class="express-wrapper">
    <div class="radio-box">
      <span>发货方式</span>
      <div class="radio">
        <div class="radio-item">
          <input type="radio" name="delivery" value="1">
          <label for="">快递公司</label>
        </div>
        <div class="radio-item">
          <input type="radio" name="delivery" id="delivery">
          <label for="">送货上门</label>
        </div>
      </div>
    </div>
    <div class="select-box layout-tow-columns" @click="showPopupPicker = true">
      <span class="column-left">快递公司</span>
      <span class="column-right">快递公司信息</span>
    </div>
    <div class="expressNo">
      <input type="text" name="" value="" placeholder="请输入物流单号">
    </div>
    <!-- 物流公司选择框 -->
    <popup-picker ref="picker" @on-change="onChange" :data="exCompanys" :columns="columns" v-model="expressCompany" v-show="showPopupPicker" :show-cell="false" :show.sync="showPopupPicker"></popup-picker>
  </div>
</template>

<script>
import { PopupPicker } from 'vux'
export default {
  data() {
    return {
      showPopupPicker: false,
      expressCompany: [],
      exCompanys: [
        {
          name:  "申通",
          value: "shentong"
        },
        {
          name:  "中通",
          value: "shentong"
        }
      ],
      columns: 1
    }
  },
  methods: {
    onChange() {

    }
  },
  mounted() {

  },
  components: {
    PopupPicker
  }
}
</script>

<style lang="stylus">
  .express-wrapper
    .radio-box
      display:flex
      align-items: center
      line-height: 45px
      height: 45px
      font-size:16px
      padding:0 15px
      span
        margin-right:30px
      .radio
        display:flex
        flex: 1
        height: 100%
        .radio-item
          position: relative
          flex: 1
          text-align: left
          input
            position:absolute
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            opacity: 0
    label
      &:before
        content:''
        display:inline-block
        vertical-align: sub
        box-sizing: border-box
        width:20px
        height:20px
        border-radius:50%
        border:1px solid #9b9b9b
        margin-right:7px
    input[type="radio"]:checked + label
      &:before
        content:''
        display:inline-block
        vertical-align: sub
        width:20px
        height:20px
        background-image:url('../../common/svg/radio.svg')
        background-size: 100%
        border: none
        margin-right:7px
    .input-box
      padding: 7px 15px;
      background: #fff
      input
        height: 32px;
        border: 1px solid #9b9b9b;
        border-radius: 3px;
        width: 100%;
        padding-left: 6px
</style>
