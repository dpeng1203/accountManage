<template>
    <div class="login">
        <div class="img-wrapper">
            <img src="../assets/img/login.png" alt="">    
        </div>    
        <div class="wrapper">
            <div class="title">Alian后台管理系统</div>
            <div><input type="text" placeholder="账号" v-model="account"></div>
            <div><input type="password" placeholder="密码" v-model="pw" @keyup.enter="login"></div>
            <validate @success="SetToken" class="verify"></validate>
            <div class="btn" @click="login">登录</div>
        </div>
    </div>    
</template>

<script>
import Validate from "./Nc.vue"
import {login} from '../config/api'
export default {
    name: 'adminLogin',
    data() {
        return{ 
            account: '',
            pw: '',
            form: {
                token: ""
            },
            submit: false
        }
    },
    components: {
        Validate
    },
    methods: {
        login() {
            // if (!this.ncVerify()) {
            //     this.$Message.error({ message: "请重新验证" });
            //     return;
            // }
            localStorage.clear()
            let data = {
                phone: this.account,
                password: this.pw
            }
            login(data).then((res) => {
                console.log(res)
                localStorage.id = res.id
                localStorage.nickname = res.nickname
                if(res.base.mch_name) {
                    localStorage.name = res.base.mch_name
                }
                this.$router.push('/home')
            })
        },
        ncVerify() {
            if (!this.form.token) {
                this.ResetValidate();
                return false;
            }
            return true;
        },
        ResetValidate() {
            this.form.token = "";
            // eslint-disable-next-line
            LUOCAPTCHA && LUOCAPTCHA.reset();
        },
        SetToken(resp) {
            console.log(resp)
            this.form.token = resp;
        }
    }
}
</script>

<style lang="sass" scoped>
.login
    background: #00BFA6
    min-width: 1500px
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
        padding: 40px 30px
        text-align: center
        .title 
            font-size: 20px
            font-weight: bold
            padding-bottom: 10px
        input
            border: 1px solid #B1B3C1;
            border-radius: 2px;
            font-size: 16px
            width: 100%
            height: 40px
            line-height: 40px
            margin-top: 20px
            padding-left: 20px
        .verify
            margin-top: 20px
        .btn
            margin-top: 10px
            background: #00BFA6
            border: 1px solid #B1B3C1;
            border-radius: 2px;
            color: #fff
            height: 40px
            font-size: 16px
            line-height: 40px
</style>
