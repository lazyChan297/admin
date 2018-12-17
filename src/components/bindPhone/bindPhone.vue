<template lang="html">
  <div class="bindPhone-wrapper">
    <p class="title">修改手机号码</p>
    <div class="">
      <div class="layout-tow-columns">
        <div class="column-left">
          <input type="number" class="column-left" placeholder="请输入手机号码" name="" value="mobile" ref="input" v-model="mobile">
        </div>
      </div>
      <div class="layout-tow-columns">
        <div class="column-left">
          <input type="number" class="column-left" placeholder="请输入新的手机号码" name="" value="">
        </div>
        <div class="column-right">
          <span class="getCode" @click="sendCode">{{codeText}}</span>
        </div>
      </div>
    </div>
    <div class="gradient-botton-blue" @click="validCode">
      确认
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {Toast} from 'vux'
import Qs from 'qs'
export default {
  data() {
    return {
      mobile: '',
      codeText: '发送验证码',
      canSendCode: null,
      bindingWay: 'add'
    }
  },
  mounted() {
    // 用户已绑定有手机号,修改原有手机
    if (this.userInfo.mobile && !this.mobile) {
      this.bindingWay = 'change'
      this.mobile = Number(this.userInfo.mobile)
      this.$refs.input.setAttribute('disabled', false)      
      this.canSendCode = true
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 发送验证码
    sendCode() {
      if (!this.canSendCode) {
        return false;
      }
      if (!this.mobile) {
        this.$vux.toast.show({
          text: '请输入手机号码',
          type: 'warn'
        })
        return
      }
      // 修改绑定手机发送第一次验证码
      let data = Qs.stringify({mobile: this.userInfo.mobile, type: this.bindingWay === 'change' ? 2 : 3})
      this.$axios.post('/users/sendSMS', data).then((res) => {
        // 发送成功
        if (res.status == 1) {
          let reset = 10
          this.canSendCode = false
          let timer = setInterval(()=> {
            reset--;
            this.codeText = `${reset}秒后重新发送`
            if(reset == 0) {
              clearInterval(timer)
              this.codeText = '发送验证码'
              this.canSendCode = true
            }
          }, 1000)
        }
      })
    },
    // 验证code
    validCode() {
      let data = Qs.stringify({phone: this.mobile, code: this.code})
      this.$axios.post('/users/mobile', data).then((res) => {
        if (res.status == 1) {
          // return Promise.resolve(res)
          if (this.bindingWay === 'change') {
            this.mobile = null
            this.canSendCode = false
            this.bindingWay = 'add'
          } else {
            this.$vux.toast.show({
              text: '绑定成功',
              time: '1s'
            })
            let timer = setTimeout((res) => {
              this.$router.go(-1)
            }, 1000)
          }
        }
      })
    }
  },
  components: {
    Toast
  }
}
</script>

<style lang="stylus">
  .bindPhone-wrapper
    .title
      height: 40px;
      text-align: left;
      line-height: 40px;
      padding-left: 15px
    .layout-tow-columns
      &:last-child
        border:none
    .column-left
      color:#9b9b9b
    .getCode
      color:#9b9b9b
</style>
