<template>
    <div class="control">
        <span class="minus" @click="minus">-</span>
        <span class="num">{{goods.num}}</span>
        <span class="plus" @click="plus">+</span>
    </div>
</template>
<script>
    export default {
        props: {
            goods: {
                type: Object,
                default: null
            }
        },
        methods: {
            plus() {
                if (!this.goods.num) {
                    this.goods.num = 1
                } else {
                    this.goods.num++
                }
                this.$emit('change', this.goods)
            },
            minus() {
                if (!this.goods.num) {
                    return
                } else {
                    this.goods.num--
                    this.$emit('change', this.goods)
                }
            }
        }
    }
</script>
<style lang="stylus">
.prod-item-count
    background: #fff
    margin-top: 1px
    line-height:50px
    border-bottom: 1px solid #e2e2e2
    border-top: 1px solid #e2e2e2
    display: flex
    padding: 0 15px
    box-sizing: border-box
    .total
        flex:1
        color:#71ABFD
        font-size:14px
        font-weight:bold
        text-align:left
    .minus,.plus
        border: 1px solid #BDBFC1
        width: 22px
        height: 22px
        display: inline-block
        vertical-align: middle
        line-height: 22px
        text-align: center
        border-radius: 3px
        color: #BDBFC1
    .num
        display: inline-block;
        width: 40px
        height: 22px
        border: 1px solid #bdbfc1
        vertical-align: middle
        line-height: 22px
        text-align: center
        font-size: 14px
        border-radius: 3px
        color: #BDBFC1
</style>