<template lang="html">
  <div class="apply-wrapper">
    <div class="header">
      <p>代理商申请</p>
      <div class="return" @click="back">
        返回
      </div>
    </div>
    <div class="layout-tow-columns" @click="showPopupPicker = true">
      <span class="column-left">申请级别</span>
      <span class="column-right">县级</span>
    </div>
    <div class="layout-tow-columns">
      <span class="column-left">姓名</span>
      <input type="text" class="column-right" name="" v-model="userName" placeholder="请输入姓名">
    </div>
    <div class="layout-tow-columns">
      <span class="column-left">选择地区</span>
      <div class="column-right area" :class="{selected:districtInfo!=''}" @click="showAddress = !showAddress">
        <span v-if="districtInfo">{{ districtInfo }}</span>
			  <span v-else>地区</span>
      </div>
      
    </div>
    <div class="gradient-botton-blue" @click="submit">
      提交申请
    </div>
    <x-address style="display: none;" title="选择地区" v-model="district" raw-value :list="areaList" :show.sync="showAddress"></x-address>
    <popup-picker 
      ref="picker" 
      @on-change="filterAddr" 
      :data="levelList" 
      :columns="columns" 
      :show-name="true" 
      v-model="level" 
      v-show="showPopupPicker" 
      :show-cell="false" 
      :show.sync="showPopupPicker">
    </popup-picker>
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
import { PopupPicker,
         XAddress, 
         XDialog,
         Value2nameFilter as value2name,
         Toast } from 'vux'
import Qs from 'qs'
let addressArr = []
export default {
  data() {
    return {
      columns: 1,
      showPopupPicker: false,
      areaList: [],
      currentArea: [],
      showAddress: false,
      showDialog: false,
      levelList: [],
      district: [],
      level: [],
      userName: ''
    }
  },
  created() {
    this.getAgent()
  },
  components: {
    PopupPicker,
    XAddress,
    XDialog,
    Toast
  },
  computed: {
    districtInfo: {
      get() {
        return this.areaDetail(this.district)
      },
      set() {
        return ''
      }
    }
  },
  methods: {
    getAgent() {
      let levelList = []
      this.$axios.get('/agent/forApplication').then( res => {
        this.areaList = res.data.districts
        let arr = res.data.levels
        addressArr = res.data.districts
        arr.forEach((item,index) => {
          levelList.push(item.name)
        })
        this.levelList = levelList
      })
    },
    filterAddr(level) {
      // 清空已选区域
      this.district = []
      let areaList = []
      if (level[0] === '省级') {
        addressArr.forEach((item, index) => {
          if (item.parent == 0) {
            areaList.push(item)
          }
        })
        this.areaList = areaList
      } else if (level[0] === '市级') {
        addressArr.forEach((item, index) => {
          if (item.parent != 2) {
            areaList.push(item)
          }
        })
        this.areaList = areaList
      } else {
        this.areaList = addressArr
      }
    },
    back() {
      this.$router.go(-1)
    },
    areaDetail(value) {
      this.addressArr = (value2name(value, this.areaList)).split(' ')
    	return value2name(value, this.areaList)
    },
    // 提交申请
    submit() {
      if (!this.userName) {
        this.$vux.toast.show({
          text: '请输入姓名',
          type: 'warn'
        })
        return
      }
      if (!this.districtInfo) {
        this.$vux.toast.show({
          text: '请选择地区',
          type: 'warn'
        })
        return
      }
      let data = Qs.stringify({district: this.district[this.district.length - 1], name: this.userName})
      this.$axios.post('/agent/apply', data).then( res => {
        if (res.status == 1) {
          this.$vux.toast.show({
            text: '提交成功',
            time: 500
          })
          this.$router.go(-1)
        }
      })
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
