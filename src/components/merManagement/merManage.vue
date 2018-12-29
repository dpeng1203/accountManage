<template>
    <div class="mer-manage">
        <div class="title">
            <span>商户管理</span>
        </div>  
        <div class="search">
            <div class="search-ct">
                <div class="search-name">审核状态</div>
                <el-select v-model="data.audit_state" placeholder="请选择" class="inline-input">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-ct">
                <div class="search-name">账户状态</div>
                <el-select v-model="data.mch_state" placeholder="请选择" class="inline-input">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-ct">
                <div class="search-name">商户号</div>
                <el-input class="inline-input" v-model="data.mch_id" placeholder="请输入内容" clearable></el-input>
            </div>
        </div>
        <div class="search">
            <div class="search-ct">
                <div class="search-name">商户名称</div>
                <el-input class="inline-input" v-model="data.mch_name" placeholder="请输入内容" clearable></el-input>
            </div>
            <div class="search-ct">
                <div class="search-name">手机号</div>
                <el-input class="inline-input" v-model="data.phone" placeholder="请输入内容" clearable></el-input>
                <div class="search-btn" @click="searchBtn">搜索</div>
            </div>
        </div>


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
                    prop="mch_id"
                    label="商户号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="mch_name"
                    label="商户名称"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="注册手机号"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="账户余额"
                    width="100">
                </el-table-column>
                 <el-table-column
                    prop="reservoir"
                    label="代付余额"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="audit_state"
                    label="审核状态"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="mch_state"
                    label="账户状态"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="channel_name"
                    label="通道"
                    width="120">
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    <el-button @click="handleClickCutState(scope.row)" type="danger" size="small">{{scope.row.mch_state == '激活' ? '冻结' : '激活'}}</el-button>
                    <el-button @click="handleClickCutChannel(scope.row)" type="text" size="small">切换通道</el-button>
                    <el-button @click="handleClickResetPw(scope.row)" type="warning" size="small">重置密码</el-button>
                    <el-button @click="handleClickVecharge(scope.row)" type="success" size="small">代付充值</el-button>
                </template>
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
        <el-dialog title="切换通道" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="通道名称" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option  v-for="item in channelList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureChangeChannel">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <div class="tip">交易金额（元）:<span>{{mchMoney.recharge}}</span></div> 
            <div class="tip">分润金额（元）:<span>{{mchMoney.bonus}}</span></div> 
            <div class="tip">在途金额（元）:<span>{{mchMoney.pending}}</span></div> 
            <div class="tip">账户余额（元）:<span>{{mchMoney.total}}</span></div> 
            <div class="tip">代付金额（元）:<span>{{mchMoney.reservoir}}</span></div> 
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { merList,cutMchState,channelList,changeMchChannel,resetMchPW,recharge } from '../../config/api'
export default {
    name: 'accountManage',
    data() {
        return{
            tableData: [],
            currentPage: 1,
            total: 0,
            options1: [{
                value: null,
                label: '请选择'
                },{
                value: '0',
                label: '待审核'
                }, {
                value: '1',
                label: '审核成功'
                }, {
                value: '2',
                label: '审核失败'
                }],
            options2: [{
                value: null,
                label: '请选择'
                },{
                value: 'enable',
                label: '激活'
                }, {
                value: 'disable',
                label: '冻结'
                }],
            data: {
                phone: null,
                mch_name: null,
                mch_state: null,
                mch_id: null,
                audit_state: null,
                offset: 0,
                limit: 10
            },
            dialogVisible: false,
            mchMoney: {},
            dialogFormVisible: false,
            form: {
                region: ''
            },
            formLabelWidth: '120px' ,
            channelList: [] ,
            mch_id: ''
        }
    },
    methods: {
        //商户列表
        getList() {
            for(var key in this.data) {
                if(this.data[key] === '') {
                    delete this.data[key]
                }
            }
            merList(this.data).then((res) => {
                this.total = res.data.total_count
                this.tableData = res.data.data_list
                this.tableData.forEach( ele => {
                    if(ele.money) {
                        ele.money = ele.money/100
                    }
                    if(ele.reservoir) {
                        ele.reservoir = ele.reservoir/100
                    }
                    if(ele.mch_state == 'enable') {
                        ele.mch_state = '激活'
                    } else{
                        ele.mch_state = '冻结'
                    }
                    if(ele.audit_state == 0) {
                        ele.audit_state = '待审核'
                    }else if(ele.audit_state == 1) {
                        ele.audit_state = '审核成功'
                    }else {
                        ele.audit_state = '审核失败'
                    }
                })
            })
        },
        // 通道列表
        getChannelList() {
            let data = {
                offset: 0,
                limit: 10000
            }
            channelList(data).then((res) => {
                this.channelList = res.data.data_list
                this.channelList = this.channelList.filter( ele => {
                    return ele.state 
                })
            })
        },
        //切换通道
        handleClickCutChannel(row) {
            this.dialogFormVisible = true
            this.getChannelList()
            this.mch_id = row.mch_id
        },
        sureChangeChannel() {
            this.dialogFormVisible = false
            if(this.form.region != '') {
                let data = {
                    mch_id: this.mch_id,
                    channel_id: this.form.region
                }
                changeMchChannel(data).then( res => {
                    this.getList()
                })
            }
        },
        // 切换商户状态
        handleClickCutState(row) {
            this.$confirm('确定切换通道状态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    mch_id: row.mch_id,
                    open: row.mch_state == '激活' ? false : true
                }
                cutMchState(data).then( res => {
                    this.$message({
                        type: 'success',
                        message: '切换成功!'
                    });
                    this.getList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        //  重置密码
        handleClickResetPw(row) {
            this.$prompt('请输入新密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                let data ={
                    mch_id: row.mch_id,
                    password: value
                }
                resetMchPW(data).then( res => {
                    this.$message({
                        type: 'success',
                        message: '设置成功！'
                    });
                })
                
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        },
        searchBtn() {
            this.getList()
        },
        //代付充值
        handleClickVecharge(row) {
            this.$prompt('请输入需要转入的金额(元)', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                let data = {
                    mch_id: row.mch_id,
                    money: value * 100
                }
                recharge(data).then( res => {
                    this.dialogVisible = true
                    this.mchMoney = res
                    this.mchMoney.recharge = this.mchMoney.recharge/100
                    this.mchMoney.bonus = this.mchMoney.bonus/100
                    this.mchMoney.total = this.mchMoney.total/100
                    this.mchMoney.pending = this.mchMoney.pending/100
                    this.mchMoney.reservoir = this.mchMoney.reservoir/100

                    this.getList()
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消！'
                });       
            });
        },
        handleClick(row) {
            this.$router.push({path: '/home/merDetail',query: {mch_id: row.mch_id}})
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
        }

    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang='sass' scoped>
.mer-manage
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
    .search
        display: flex
        margin-top: 20px
        .search-ct
            margin-left: 60px
            .search-name
                font-size: 14px
                line-height: 18.2px
                padding-bottom: 10px
            .inline-input
                width: 220px
            .search-btn
                display: inline-block
                width: 100px
                height: 35px
                margin-top: 60px
                line-height: 35px
                text-align: center
                color: #fff
                background: #00BFA6;
                border-radius: 25px;
                font-size: 14px
                margin: 0 0 0 60px
        .search-ct:first-child
            margin-left: 0
    .table
        margin-top: 40px
        width: 1350px
        .block
            padding: 30px 0
            text-align: center 
    .tip
        margin-top: 10px
        span
            margin-left: 30px
            color: red
</style>
