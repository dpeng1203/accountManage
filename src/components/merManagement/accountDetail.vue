<template>
    <div class="account-detail"> 
        <div class="title">
            <img src="../../assets/img/ic_back.png" alt="" @click="$router.go(-1)">
            <span>用户详情</span>
        </div>

        <div class="wrapper">
            <div class="item">
                <span class="name">商户利率(%)</span>
                <input type="text"  v-model="rate" >
            </div>
        </div>
        <div class="btn" @click="save">设置</div>

    </div>    
</template>

<script>
import { accountRate } from '../../config/api'
export default {
    data() {
        return{
            rate: ''
        }
    },
    methods: {
        save() {
            let data = {
                "user_id": this.$route.query.detail.mch_id,
                "charge_type": 2,
                "charge_rate": this.rate*100
            }
            accountRate(data).then((res) => {
                console.log(res)
                this.$router.go(-1)
            })
        }
    },
    mounted() {
        this.rate = this.$route.query.detail.charge_rate
    }
    

}
</script>

<style lang='sass' scoped>
.account-detail
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
        img
            width: 35px
            height: 35px
    .wrapper
        padding: 40px 0 0 60px
        .item 
            margin-top: 30px
            font-size: 14px
            .name
                display: inline-block
                width: 180px
                font-weight: bold
            input
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                width: 240px    
                height: 40px
                line-height: 40px
                padding-left: 20px
    .btn
        display: inline-block
        width: 150px
        height: 40px
        line-height: 40px
        background: #00BFA6;
        border-radius: 25px;
        color: #fff
        font-weight: bold
        font-size: 16px
        text-align: center
        margin-top: 100px
        margin-left: 60px
</style>
