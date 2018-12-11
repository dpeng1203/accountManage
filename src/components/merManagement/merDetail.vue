<template>
    <div class="mer-audit">
        <div class="mer-ct">
            <div class="title">
                <img src="../../assets/img/ic_back.png" alt="" @click="$router.push('/home/merManage')" class="go-back">
                <span>商户信息</span>
            </div>
            <div class="basic-wrapper">
                <div class="basic-info">
                    <h2>基本信息</h2>
                    <div class="item">
                        <span class="name">商户名称：</span>
                        <el-input placeholder="请输入内容" v-model="list.mch_name" clearable></el-input>
                    </div>
                    <div class="item">
                        <span class="name">商户简称：</span>
                        <el-input placeholder="请输入内容" v-model="list.nick_name" clearable></el-input>
                    </div>
                    <div class="item">
                        <span class="name">法人姓名：</span>
                        <el-input placeholder="请输入内容" v-model="list.legal_name" clearable></el-input>
                    </div>
                    <div class="item">
                        <span class="name">法人手机号：</span>
                        <el-input placeholder="请输入内容" v-model="list.legal_phone" clearable></el-input>
                    </div>
                    <div class="item">
                        <span class="name">邮箱地址：</span>
                        <el-input placeholder="请输入内容" v-model="list.email" clearable></el-input>
                    </div>
                    <div class="item">
                        <span class="name">其他联系人姓名：</span>
                        <el-input placeholder="请输入内容" v-model="list.link_name" clearable></el-input>
                    </div>
                    <div class="item">
                        <span class="name">其他联系人手机号：</span>
                        <el-input placeholder="请输入内容" v-model="list.link_phone" clearable></el-input>
                    </div>
                    <div class="item">
                        <span class="name">统一社会信用代码：</span>
                        <el-input placeholder="请输入内容" v-model="list.org_code" clearable></el-input>
                    </div>
                    <div class="item">
                        <span class="name">状态</span>
                        <el-select v-model="list.state" placeholder="请选择">
                            <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                
            </div>
            
            <div class="mer-info">
                <h2>商户资质</h2>
                <div class="photo-wrapper" v-if="list.license_images">
                    <div class="item">
                        <span class="name">营业执照</span>
                        <div class="img-ct">
                            <img :src='"http://47.99.180.135:8088/files/" + list.license_images[0]' alt="">
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">开户许可证</span>
                        <div class="img-ct">
                            <img :src='"http://47.99.180.135:8088/files/" + list.license_images[1]' alt="">
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">手持营业执照</span>
                        <div class="img-ct">
                            <img :src='"http://47.99.180.135:8088/files/" + list.license_images[2]' alt="">
                        </div>
                    </div>
                </div>
                

                <div class="photo-wrapper" v-if="list.card_images">
                    <div class="item">
                        <span class="name">身份证（正面）</span>
                        <div class="img-ct">
                            <img :src='"http://47.99.180.135:8088/files/" + list.card_images[0]' alt="">
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">身份证（反面）</span>
                        <div class="img-ct">
                            <img :src='"http://47.99.180.135:8088/files/" + list.card_images[1]' alt="">
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">手持身份证（正面）</span>
                        <div class="img-ct">
                            <img :src='"http://47.99.180.135:8088/files/" + list.card_images[2]' alt="">
                        </div>
                    </div>
                </div>
                <div class="photo-wrapper" v-if="list.other_images && list.other_images != []">
                    <div class="item">
                        <span class="name">其他资质照片</span>
                        <div class="img-ct">
                            <img alt="" v-for="imgItem in list.other_images" :key="imgItem" :src='"http://47.99.180.135:8088/files/" + imgItem'>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="btn" @click="save">提交</div>
            <!-- <div class="btn err" @click="save">审核失败</div> -->
        </div>
    </div>
</template>

<script>
import { changeMerDetail } from '../../config/api'
export default {
    data() {
        return{
            list: {},
            options1: [{
                value: '0',
                label: '待审核'
                }, {
                value: '1',
                label: '审核通过'
                }, {
                value: '2',
                label: '审核拒绝'
            }],
        }
    },
    methods: {
        save() {
            let data = this.list
            delete data.id
            delete data.create_time
            delete data.modify_time
            if(data.card_images) {
                delete data.card_images
            }
            if(data.license_images) {
                delete data.license_images
            }
            if(data.other_images) {
                delete data.other_images
            }
            if(data.state == '待审核') {
                data.state = 0
            }else if(data.state == '审核通过') {
                data.state = 1
            }else {
                data.state = 2
            }
            changeMerDetail(data).then( res => {
                 this.$message({
                    message: '修改成功！',
                    type: 'success'
                });
                this.$router.push({path: '/home/merRate',query: {merId: this.list.mch_id}})
            })
        },
    },
    mounted() {
        this.list = this.$route.query.detail
    }
}
</script>

<style lang="sass" scoped>
.mer-audit
    color: #3D4060
    .mer-ct 
        width: 850px
        .title 
            text-align: left
            font-size: 24px
            font-weight: bold
            margin-left: 30px
            padding-bottom: 30px
            border-bottom: 1px solid #ccc
            .go-back
                width: 35px
                height: 35px

        .basic-wrapper
            margin: 0 70px 0 30px
            padding-bottom: 30px
            width: 850px
            border-bottom: 1px solid #ccc
            .basic-info
                margin-right: 70px
                margin-top: 30px
                h2
                    font-size: 18px
                    font-weight: bold
                    margin-bottom: 10px
                .item 
                    margin-top: 10px
                    font-size: 16px
                    .name
                        color: #7E8196
                        display: inline-block
                        width: 180px
                    .el-input
                        width: 220px
                    
        
        .mer-info
            margin: 30px 0 0 30px
            h2
                font-size: 18px
                font-weight: bold
            .photo-wrapper
                display: flex
                .item 
                    margin-top: 20px
                    font-size: 16px
                    .name
                        color: #7E8196
                        display: inline-block
                    .img-ct    
                        margin: 10px 30px 0 0
                        width: 186px
                        height: 120px
                
        .btn 
            display: inline-block
            font-size: 14px
            background: #00BFA6
            border-radius: 20px
            color: #fff
            width: 150px    
            height: 40px 
            line-height: 40px
            margin-left: 30px 
            margin: 50px 0 100px 30px
            text-align: center
        .err
            background: red
    
</style>