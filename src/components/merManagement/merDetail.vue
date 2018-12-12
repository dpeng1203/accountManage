<template>
    <div class="mer-audit">
        <div class="mer-ct">
            <div class="title">
                <img src="../../assets/img/ic_back.png" alt="" @click="$router.push('/home/merManage')" class="go-back">
                <span>商户管理</span>
            </div>
            <div class="tabs">
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="基础信息" name="first">
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
                                        <img alt="" v-for="imgItem in list.other_images" :key="imgItem" :src='"http://47.99.180.135:8088/files/" + imgItem' >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn" @click="save">提交</div>
                    </el-tab-pane>
                    <el-tab-pane label="应用信息" name="second">
                        <div class="basic-wrapper">
                            <div class="basic-info">
                                <h2>应用信息</h2>
                                <div class="table">
                                    <el-table
                                        :data="tableData1"
                                        border
                                        >
                                        <el-table-column
                                            type="index"
                                            width="30">
                                        </el-table-column>
                                        <el-table-column
                                            prop="mch_id"
                                            label="商户号"
                                            width="120">
                                        </el-table-column>
                                        <el-table-column
                                            prop="app_name"
                                            label="应用名称"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="mch_name"
                                            label="商户名称"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="is_default"
                                            label="是否默认"
                                            width="100">
                                        </el-table-column>
                                        <el-table-column
                                            prop="rate"
                                            label="费率（%）"
                                            width="100">
                                        </el-table-column>
                                        <el-table-column
                                            label="操作"
                                            >
                                            <template slot-scope="scope">
                                                <el-button @click="handleDel(scope.row)" type="text" size="small">移除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="提现列表" name="third">角色管理</el-tab-pane>
                </el-tabs>
            </div>
            
            
            
            <!-- <div class="btn err" @click="save">审核失败</div> -->
        </div>
    </div>
</template>

<script>
import { changeMerDetail,merAppRate,delAppRate } from '../../config/api'
export default {
    data() {
        return{
            activeName2: 'first',
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
            tableData1: []
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
        getMerAppRate() {
            let data = {
                mch_id: this.list.mch_id
            }
            merAppRate(data).then( res => {
                this.tableData1 = res.data
                this.tableData1.forEach(ele => {
                    if(ele.rate) {
                        ele.rate = ele.rate/100
                    }
                    if(ele.is_default == 1) {
                        ele.is_default = '是'
                    } else{
                        ele.is_default = '否'
                    }
                })
            })
        },
        handleClick(tab, event) {
            console.log(tab.index)
            if(tab.index == 1) {
                this.getMerAppRate()
            }
        },
        handleDel(row) {
            console.log(row)
            let data = {
                app_id: row.app_id,
                mch_id: row.mch_id
            }
            delAppRate(data).then( res => {
                this.getMerAppRate()
            })
        }
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
        width: 900px
        .title 
            text-align: left
            font-size: 24px
            font-weight: bold
            margin-left: 30px
            padding-bottom: 30px
            .go-back
                width: 35px
                height: 35px
        .tabs 
            margin-left: 30px
            .basic-wrapper
                margin: 0 70px 0 30px
                padding-bottom: 30px
                width: 900px
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
                        .table
                            margin-top: 10px
                            padding-bottom: 30px
                            border-bottom: 1px solid #ccc 
                    
        
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
                            img
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