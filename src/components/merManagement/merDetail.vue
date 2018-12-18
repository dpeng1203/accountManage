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
                                <!-- <div class="item">
                                    <span class="name">状态</span>
                                    <el-select v-model="list.state" placeholder="请选择">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div> -->
                            </div>
                        </div>
                        
                        <div class="mer-info">
                            <h2>商户资质</h2>
                            <div class="photo-wrapper" v-if="list.license_images">
                                <div class="item">
                                    <span class="name">营业执照</span>
                                    <div class="img-ct">
                                        <img :src='`${hostName}/files/` + list.license_images[0]' alt="">
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="name">开户许可证</span>
                                    <div class="img-ct">
                                        <img :src='`${hostName}/files/` + list.license_images[1]' alt="">
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="name">手持营业执照</span>
                                    <div class="img-ct">
                                        <img :src='`${hostName}/files/` + list.license_images[2]' alt="">
                                    </div>
                                </div>
                            </div>
                            

                            <div class="photo-wrapper" v-if="list.card_images">
                                <div class="item">
                                    <span class="name">身份证（正面）</span>
                                    <div class="img-ct">
                                        <img :src='`${hostName}/files/` + list.card_images[0]' alt="">
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="name">身份证（反面）</span>
                                    <div class="img-ct">
                                        <img :src='`${hostName}/files/` + list.card_images[1]' alt="">
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="name">手持身份证（正面）</span>
                                    <div class="img-ct">
                                        <img :src='`${hostName}/files/` + list.card_images[2]' alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="photo-wrapper" v-if="list.other_images && list.other_images.length != 0">
                                <div class="item">
                                    <span class="name">其他资质照片</span>
                                    <div class="img-ct">
                                        <img alt="" v-for="imgItem in list.other_images" :key="imgItem" :src='`${hostName}/files/` + imgItem' >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn" @click="succ">审核通过</div>
                        <div class="btn err" @click="fail">审核失败</div>
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
                                            width="50">
                                        </el-table-column>
                                        <el-table-column
                                            prop="mch_id"
                                            label="商户号"
                                            width="150">
                                        </el-table-column>
                                        <el-table-column
                                            prop="app_name"
                                            label="应用名称"
                                            width="200">
                                        </el-table-column>
                                        <el-table-column
                                            prop="mch_name"
                                            label="商户名称"
                                            width="200">
                                        </el-table-column>
                                        <el-table-column
                                            prop="is_default"
                                            label="是否默认"
                                            width="150">
                                        </el-table-column>
                                        <el-table-column
                                            prop="rate"
                                            label="费率（%）"
                                            width="150">
                                        </el-table-column>
                                        <el-table-column
                                            label="操作"
                                            >
                                            <template slot-scope="scope">
                                                <el-button @click="handleDel(scope.row)" type="text" size="small">{{scope.row.is_default == '是' ? '' : '恢复默认'}}</el-button>
                                                <el-button @click="handleChange(scope.row)" type="text" size="small">更新</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="提现列表" name="third">
                        <div class="basic-wrapper">
                            <div class="basic-info">
                                <h2>提现列表</h2>
                                <div class="table">
                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                            type="index"
                                            width="50">
                                        </el-table-column>
                                        <el-table-column
                                            prop="create_time"
                                            label="创建时间"
                                            width="180">
                                        </el-table-column>
                                        <el-table-column
                                            prop="name"
                                            label="姓名"
                                            width="100">
                                        </el-table-column>
                                        <el-table-column
                                            prop="open_bank"
                                            label="开户行"
                                            width="130">
                                        </el-table-column>
                                        <el-table-column
                                            prop="sub_bank"
                                            label="开户支行"
                                            width="220">
                                        </el-table-column>
                                        <el-table-column
                                            prop="bankcard_number"
                                            label="银行卡号"
                                            width="200">
                                        </el-table-column>
                                        <el-table-column
                                            prop="money"
                                            label="金额(元)"
                                            width="100">
                                        </el-table-column>
                                        <el-table-column
                                            prop="state"
                                            label="是否到账"
                                        >
                                        </el-table-column>
                                    </el-table>
                                    <div class="block">
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[10,20,50,100, 200, 300, 400]"
                                            :page-size="data.limit"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- <div class="btn err" @click="save">审核失败</div> -->
        </div>
    </div>
</template>

<script>
import hostName from '../../config/hostName'
import { changeMerDetail,merAppRate,delAppRate,zdyRate,auditList } from '../../config/api'
export default {
    data() {
        return{
            hostName: hostName,
            handle: '',
            activeName2: 'first',
            list: {},
            // options1: [{
            //     value: '0',
            //     label: '待审核'
            //     }, {
            //     value: '1',
            //     label: '审核通过'
            //     }, {
            //     value: '2',
            //     label: '审核拒绝'
            // }],
            tableData1: [],
            currentPage: 1,
            data: {
                app_name: null,
                status: null,
                offset: 0,
                limit: 10
            },
            total: null,
            tableData: [],
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
            changeMerDetail(data).then( res => {
                 this.$message({
                    message: '修改成功！',
                    type: 'success'
                });
                if(this.list.state == 1) {
                    this.$router.push({path: '/home/merRate',query: {merId: this.list.mch_id}})
                }else {
                    this.$router.push('/home/merManage')
                }
                
            })
        },
        // 审核通过
        succ() {
            this.list.state = 1
            this.save()
        },
        // 审核失败
        fail() {
            this.list.state = 2
            this.save()
        },
        //获得费率
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
                    if(ele.is_default) {
                        ele.is_default = '是'
                    } else{
                        ele.is_default = '否'
                    }
                })
            })
        },
        //获得提现列表
        getList() {
            let data = {
                mch_id: this.list.mch_id
            }
            auditList(data).then((res) => {
                this.total = res.data.total_count
                this.tableData = res.data.data_list
                this.tableData.forEach( ele => {
                    if(ele.money && ele.money != '') {
                        ele.money = ele.money/100
                    }
                    if(ele.state == 1) {
                        ele.state = '提现成功'
                    }else if(ele.state == 2){
                        ele.state = '提现失败'
                    }else {
                        ele.state = '提现中'
                    }
                })
            })
        },
        //切换tab
        handleClick(tab, event) {
            if(tab.index == 1) {
                this.getMerAppRate()
            }
            if(tab.index == 2) {
                this.getList()
            }
        },
        handleDel(row) {
            let data = {
                app_id: row.app_id,
                mch_id: row.mch_id
            }
            delAppRate(data).then( res => {
                this.getMerAppRate()
            })
        },
        //设置费率
        handleChange(row) {
            this.$prompt(`请设置${row.app_name}的费率(%)：`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                let data = [{
                    app_id: row.app_id,
                    rate: value*100,
                    mch_id: row.mch_id
                }]
                let postData = {
                    apps: data
                }
                zdyRate(postData).then( res => {
                    this.$message({
                        message: '设置成功！',
                        type: 'success'
                    });
                    this.getMerAppRate()
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.data.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.data.offset = (val - 1) * this.data.limit
            this.getList()
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
    padding-bottom: 100px
    .mer-ct 
        width: 1135px
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
                width: 1135px
                // border-bottom: 1px solid #ccc
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
        .table
            margin-top: 10px
            padding-bottom: 30px
        .block
            padding: 30px 0
            text-align: center 
    
</style>