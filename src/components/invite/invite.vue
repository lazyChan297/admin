<template>
    <div class="invite-wrapper">
        <h1 class="title">邀请卡</h1>
        <p class="desc">长按保存图片至相册</p>
        <div class="bgImage">
            <img :src="qrCode" alt="">
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                qrCode: ''
            }
        },
        created() {
            this.getCode()
        },
        methods: {
            getCode() {
                this.$axios.get('/distributor/qrcode').then((res) => {
                    if (res.status == 1) {
                        this.qrCode =res.data.qrCode
                    }
                })
            }
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        }
    }
</script>
<style lang="stylus" scoped>
    .invite-wrapper
        .title
            font-size: 24px
            margin:20px 0 10px
        .desc
            margin-bottom:20px
            color:#666666
        .bgImage
            margin: 0 30px
            img
                width:100%
</style>