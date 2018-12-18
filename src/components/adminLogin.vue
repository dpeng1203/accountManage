<template>
    <div class="login">
        <div class="img-wrapper">
            <img src="../assets/img/login.png" alt="">    
        </div>    
        <div class="wrapper">
            <div class="title">Alian后台管理系统</div>
            <div><input type="text" placeholder="账号" v-model="account"></div>
            <div><input type="password" placeholder="密码" v-model="pw" @keyup.enter="login"></div>
            <div class="btn" @click="login">登录</div>
        </div>
    </div>    
</template>

<script>
import {login} from '../config/api'
export default {
    data() {
        return{ 
            account: '',
            pw: ''
        }
    },
    methods: {
        login() {
            localStorage.clear()
            let data = {
                phone: this.account,
                password: this.pw
            }
            login(data).then((res) => {
                console.log(res)
                localStorage.id = res.id
                localStorage.nickname = res.nickname
                localStorage.name = res.base.mch_name
                this.$router.push('/home')
            })
        },
    }
}
</script>

<style lang="sass" scoped>
.login
    background: #00BFA6
    width: 100vw
    height: 100vh
    display: flex
    align-items: center
    .img-wrapper
        flex: 1
        text-align: center
    .wrapper
        width: 350px
        height: 350px
        background: #fff
        margin-right: 250px
        border-radius: 5px
        padding: 50px 30px
        text-align: center
        .title 
            font-size: 20px
            font-weight: bold
            padding-bottom: 20px
        input
            border: 1px solid #B1B3C1;
            border-radius: 2px;
            font-size: 16px
            width: 100%
            height: 40px
            line-height: 40px
            margin-top: 20px
            padding-left: 20px
        .btn
            margin-top: 50px
            background: #00BFA6
            border: 1px solid #B1B3C1;
            border-radius: 2px;
            color: #fff
            height: 40px
            font-size: 16px
            line-height: 40px
</style>
