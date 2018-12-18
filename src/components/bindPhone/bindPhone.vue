<template lang="html">
  <div class="bindPhone-wrapper">
    <p class="title">{{userInfo.mobile?'修改手机号码':'绑定手机号码'}}</p>
    <div class="">
      <div class="layout-tow-columns">
        <div class="column-left">
          <input type="number" class="column-left" :placeholder="placeholder" name="" value="mobile" ref="input" v-model="mobile">
        </div>
      </div>
      <div class="layout-tow-columns">
        <div class="column-left">
          <input type="number" class="column-left" placeholder="请输入验证码" name="" v-model="code">
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
      bindingWay: 'add',
      isNext: null,
      placeholder: '请输入手机号码',
      code: null
    }
  },
  mounted() {
    // 用户已绑定有手机号,修改原有手机
    if (this.userInfo.mobile && !this.mobile) {
      this.bindingWay = 'change'
      this.mobile = Number(this.userInfo.mobile)
      this.$refs.input.setAttribute('disabled', true)
      this.canSendCode = true
      this.isNext = true
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
      let valid = this.validPhone()
      if (!valid) {
        this.$vux.toast.show({
          text: '请输入正确的手机号码',
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
    // 验证手机号码
    validPhone() {
      let reg = /^1[345789][0-9]{9}$/
      if (!reg.test(this.mobile)) {
        this.$vux.toast.show({
          text: '请输入正确的手机号码',
          type: 'warn'
        })
        return false
      }
      return true
    },
    // 验证code
    validCode() {
      // 手机和验证码是否为空
      let valid = this.validPhone() && this.code.length === 4
      if (!valid) {
        return 
      }
      let data = Qs.stringify({mobile: this.mobile, code: this.code})
      this.$axios.post('/users/mobile', data).then((res) => {
        if (res.status == 0) {
          this.$vux.toast.show({
              text: res.info,
              time: 1000,
              type: 'warn'
            })
        }
        if (res.status == 1) {
          if (this.isNext) {
            this.mobile = ''
            this.code = ''
            this.isNext = false
            this.$refs.input.removeAttribute('disabled') 
          } else {
            this.$vux.toast.show({
              text: '绑定成功',
              time: 500
            })
            let timer = setTimeout((res) => {
              this.$router.go(-1)
            }, 500)
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
