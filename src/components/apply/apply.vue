<template lang="html">
  <div class="apply-wrapper">
    <div class="header">
      <p>代理商申请</p>
      <div class="return" @click="back">
        返回
      </div>
    </div>
    <div class="layout-tow-columns">
      <span class="column-left">申请基本</span>
      <span class="column-right">县级</span>
    </div>
    <div class="layout-tow-columns">
      <span class="column-left">姓名</span>
      <input type="text" class="column-right" name="" value="" placeholder="请输入姓名">
    </div>
    <div class="layout-tow-columns">
      <span class="column-left">选择地区</span>
      <span class="column-right area" :class="{selected:currentArea.length}" @click="showPopupPicker = !showPopupPicker">{{currentArea[0] || '地区信息'}}</span>
    </div>
    <div class="gradient-botton-blue" @click="showDialog = true">
      提交申请
    </div>
    <popup-picker ref="picker" @on-change="onChange" :data="areaList" :columns="columns" :show-name="true" v-model="currentArea" v-show="showPopupPicker" :show-cell="false" :show.sync="showPopupPicker"></popup-picker>
    <!-- <x-address style="display: none;" title="选择地区" v-model="district" raw-value :list="addressData" :show.sync="showAddress"></x-address> -->
    <x-dialog v-model="showDialog" :hide-on-blur="true">
      <p class="dialog-title">对不起，您所选择的区域已有代理商请重新选择</p>
      <div class="dialog-button-group">
        <div class="gradient-botton-blue" @click="showDialog = false">
          确认
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { PopupPicker,XAddress, XDialog} from 'vux'
export default {
  data() {
    return {
      columns: 1,
      showPopupPicker: false,
      areaList: ['青秀区', '西乡塘区', '兴宁区'],
      currentArea: [],
      showAddress: false,
      showDialog: false
    }
  },
  components: {
    PopupPicker,
    XAddress,
    XDialog
  },
  methods: {
    onChange(e) {
      if (e) {
      }
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
  .apply-wrapper
    .header
      background: #fff;
      height: 90px;
      display: flex;
      align-items: center;
      padding: 0 15px
      p
        font-size: 24px;
        font-weight: bold;
        flex: 1;
        text-align: left
      .return
        width: 70px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #c7c7c7;
        border-radius: 100px;
        box-shadow: 0 3px 8px rgba(56,57,60,0.15)
    .layout-tow-columns
      margin-top:10px
      border:none
      .column-right
        color:#4a4a4a
        &.area
          color:#9b9b9b
        &.selected
         color:#4a4a4a
      input::-webkit-input-placeholder
        color:#9b9b9b
    .dialog-title
      margin: 30px 15px 0
</style>
