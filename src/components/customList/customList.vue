<!-- 客户列表 -->
<template lang="html">
  <div class="customList-wrapper">
    <div class="search-box">
      <search 
        auto-scroll-to-top 
        @on-focus="onFocus" 
        @on-cancel="onCancel"
        v-model="query">
      </search>
    </div>

    <ul class="list">
      <!-- 客户列表 -->
      <li v-for="(item,index) in customerList" :key="index">  
        <!-- 首字母 -->
        <p class="list-title">{{item.title}}</p>
        <router-link class="item" v-for="customer in item.items" :to="{path:`/custom/${customer.userSn}`}">
          <img :src="customer.avatar" alt="" width="50" height="50px">
          <div class="userInfo">
            <div class="txt">
              <p class="userName">{{customer.nickname}}</p>
              <p class="business">成交额: ￥{{customer.amount}}</p>
            </div>
            <div :class="['canOper',customer.status==0?'':'disable']" @click.stop="isShowDialog(customer)">{{customer.status==1?'分销员':'指定为分销员'}}</div>
          </div>
        </router-link>
      </li>
    </ul>
    <!-- 搜索列表 -->
    <ul class="searchList" v-show="isSearch">
      <div class="item" v-for="customer in searchList">
          <img :src="customer.avatar" alt="" width="50" height="50px">
          <div class="userInfo">
            <div class="txt">
              <p class="userName">{{customer.nickname}}</p>
              <p class="business">成交额: ￥{{customer.amount}}</p>
            </div>
            <div :class="['canOper',customer.status==0?'':'disable']" @click.stop="isShowDialog(customer)">{{customer.status==1?'分销员':'指定为分销员'}}</div>
          </div>
        </div>
    </ul>
    <tab-bar :currentTabIndex="currentTabIndex"></tab-bar>
    <x-dialog v-model="showDialog">
      <div class="dialog">
        <p class="dialog-title">确认指定该用户成为分销员吗</p>
        <div class="dialog-button-group">
          <div class="gradient-botton-blue" @click.stop="submit">
            确认
          </div>
          <div class="cancel" @click="showDialog = false">
            取消
          </div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, Search} from 'vux'
import TabBar from '@/base/tabBar/tabBar'
import Qs from 'qs'
export default {
  data() {
    return {
      currentTabIndex: 1,
      isDistributor: false,
      showDialog: false,
      query: '',
      customerList: [],
      searchList: [],
      currentCustomer: null,
      isSearch: false
    }
  },
  created() {
    this.getCustomerList()
  },
  components: {
    XDialog,
    TabBar,
    Search
  },
  methods: {
    // 获取用户列表
    getCustomerList() {
      let customerList = this.customerList
      this.$axios.get('/agent/customers').then(res => {
        console.log(res)
        let data = res.data
        this.customerList = this.normalizeList(data)
      })
    },
    // 根据关键词搜索客户
    searchCustomer(keyword) {
      this.$axios.get('/agent/searchCustomers', {
        params: {
          keyword: keyword
        }
      }).then(res => {
        if (!res.data) {
          this.searchList = []
          return
        }
        this.searchList = res.data
      })
    },
    // 格式化客户列表
    normalizeList(list) {
      let ret = [], other = [], map = {}
      list.forEach((item, index) => {
        let key = item.firstLetter
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(item)
      })
      for (let k in map) {
        if (map[k].title.match(/[a-zA-z]/)) {
          ret.push(map[k])
        } else {
          other.push(map[k])
        }
      }
      // 字母排序 返回一个从A-Z的数组
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return ret.concat(other)
    },
    // 打开弹窗
    isShowDialog(customer) {
      if (customer.status == 1) {
        return false
      }
      this.showDialog = true
      this.currentCustomer = customer.userSn
    },
    appoint() {
      this.showDialog = true
    },
    submit() {
      let data = {
        userSn: this.currentCustomer
      }
      this.$axios.post('/distributor/setDistributor', Qs.stringify(data)).then((res) => {
        this.showDialog = false
        this.getCustomerList()
      })
    },
    onFocus() {
      this.isSearch = true
    },
    onCancel() {
      this.searchList = []
      this.isSearch = false
    }
  },
  watch: {
    query(newVal) {
      this.searchCustomer(newVal)
    }
  }
}
</script>

<style lang="stylus">
  .customList-wrapper
    .search-box
      background: #ffffff 
      border-bottom: 1px solid #e2e2e2
      width: 100%
      box-sizing: border-box
      z-index: 99
      .search
        position: relative
        border-radius: 5px
        border:1px solid #dadada
        height:100%
        color:#9b9b9b
        line-height:36px
    .searchList
      position: fixed
      width: 100%
      top: 44px
      bottom: 0
      background:#f7f7f7
    .list,
    .searchList
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
        .business
          font-size:12px
          color:#9b9b9b
        .canOper
          background:#6DA6FE
          border-radius:100px
          color:#fff
          width:90px
          height:26px
          line-height:26px
          font-size:12px
          margin-right:15px
          &.disable
            color:#9b9b9b
            background:#fff
            text-align:right
        &:last-child
          .userInfo
            border:none
            .dialog-title
              height: 100px
              line-height: 100px
              color: #4F5054
              font-size: 14px
</style>
