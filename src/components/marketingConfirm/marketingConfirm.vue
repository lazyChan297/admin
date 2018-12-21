<template>
    <div class="marketingConfirm-wrapper">
        <img :src="user.avatar" alt="" width="50" height="50" class="avatar">
        <p class="title">{{user.nickname}} 邀请你加入氢链</p>
        <div class="bgimg">
            <img src="../../common/images/marketimg_img.png" alt="">
        </div>
        <div class="submit" @click="submit">接受邀请</div>
    </div>
</template>
<script>
    import Qs from 'qs'
    export default {
        data() {
            return {
                user: null
            }
        },
        mounted() {
            this.getShareInfo()
        },
        methods: {
            getShareInfo() {
                let data = Qs.stringify({userSn: 'fhsxNO'})
                this.$axios.post('/users/getSharerInfo', data).then((res) => {
                    if (res.status == 1) {
                        this.user = res.data
                    }
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .marketingConfirm-wrapper
        .avatar
            display: block
            margin: 30px auto 10px
            border-radius: 50%
        .title
            font-size: 14px;
            color: #4A4A4A;
            padding-top: 8px;
            line-height: 18px;
        .bgimg
            margin:15px 50px 0
            img
             width:100%
        .submit
            margin: 20px 50px;
            height: 45px;
            color: #fff;
            background-image: linear-gradient(90deg, #FF7EA8 0%, #FFB57D 97%);
            box-shadow: 0 7px 10px -5px rgba(234,3,3,0.50);
            border-radius: 3px;
            text-align: center;
            line-height: 45px;
</style>