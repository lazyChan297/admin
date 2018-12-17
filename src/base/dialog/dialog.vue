<template lang="html">
  <div class="dialog-wrapper">
    <x-dialog v-model="isShowDialog" :hide-on-blur="true">
      <slot></slot>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog } from 'vux'
export default {
  props: {
    showDialog: {
      type: Boolean
    }
  },
  components: {
    XDialog
  },
  data() {
    return {
      isShowDialog: this.showDialog
    }
  },
  watch: {
    showDialog(newVal) {
      console.log(newVal)
    }
  }
}
</script>

<style lang="stylus">
  .dialog-wrapper
    .dialog-title
      height: 100px
      line-height: 100px
      color: #4F5054
      font-size: 14px
    .dialog-button-group
      .gradient-botton-blue
        margin:0 28px 15px
      .cancel
        margin-bottom: 20px
        font-size: 14px
        color: #9b9b9b
</style>
