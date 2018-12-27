<template>
    <div class="bill-detail">
        <div class="title">
            <span>交易管理</span>
        </div>
        
        <div class="search">
            <div class="search-ct">
                <div class="search-name">状态</div>
                <el-select v-model="data.status" placeholder="请选择" class="pay-state">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-ct">
                <div class="search-name">商户号</div>
                <el-input class="inline-input" v-model="data.mch_id" placeholder="请输入系统订单号" clearable></el-input>
            </div>
            <div class="search-ct">
                <div class="search-name">商户名称</div>
                <el-autocomplete
                    class="inline-input"
                    v-model="state2"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                ></el-autocomplete>
                <!-- <el-input class="inline-input" v-model="data.mch_name" placeholder="请输入商户订单号" clearable></el-input> -->
            </div>
             <div class="search-ct">
                <div class="search-name">系统订单号</div>
                <el-input class="inline-input" v-model="data.sys_order_id" placeholder="请输入系统订单号" clearable></el-input>
            </div>
        </div>
        <div class="search">
            <div class="search-ct">
                <div class="search-name">支付类型</div>
                <el-select v-model="data.pay_type" placeholder="请选择" class="pay-state">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-ct">
                <div class="search-name">选择日期范围</div>
                <el-date-picker
                    v-model="value7"
                    type="daterange"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                </el-date-picker>
                <div class="rapid-btn" @click="searchToday">今日</div>
                <div class="rapid-btn" @click="searchYest">昨日</div>
                <div class="rapid-btn" @click="searchWeek">本周</div>
                <div class="rapid-btn" @click="searchLastWeek">上周</div>
                <div class="rapid-btn" @click="searchMonth">本月</div>
                <div class="rapid-btn" @click="searchLastMonth">上月</div>
                <div class="search-btn" @click="searchBtn">搜索</div>
            </div>
        </div>
        <div class="num-wrapper">
            <div class="num">成交总金额：<span>{{ total }}</span> 元</div>
            <div class="num">成交总手续费：<span>{{ mchCharge }}</span> 元</div>
            <div class="num">成交总笔数：<span>{{ count }}</span> 笔</div>
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
                    prop="mch_name"
                    label="商户名称"
                    width="140">
                </el-table-column>
                
                <el-table-column
                    prop="sys_order_id"
                    label="系统订单号"
                    width="210">
                </el-table-column>
                <el-table-column
                    prop="pay_type"
                    label="支付类型"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="channel"
                    label="通道"
                    width="110">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="金额"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="mch_charge"
                    label="手续费"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    width="100">
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    <el-button @click="handleClickReissue(scope.row)" type="text" size="small">{{scope.row.state == '待支付' || scope.row.state == '超时关闭' ? '补单' : ''}}</el-button>
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
                    :total="total_count">
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>

<script>
import changeData from '../../config/formatData'
import { moneySum,billList,reissue,getMch } from '../../config/api'
export default {
    name: "billDetail",
    data() {
        let that = this
        return{
            state2: '',
            mchList: [],         //查询商户列表
            total_count: 0,
            currentPage: 1,
            total: '',
            mchCharge: '',
            count: '',
            options1: [{
                value: '',
                label: '请选择'
                },{
                value: '1',
                label: '待支付'
                }, {
                value: '2',
                label: '交易进行中'
                }, {
                value: '3',
                label: '交易成功'
                }, {
                value: '4',
                label: '交易失败'
                }, {
                value: '9',
                label: '超时关闭'
                }],
            options2: [{
                value: '',
                label: '请选择'
                },{
                value: 'alipay',
                label: '支付宝'
                }, {
                value: 'wx',
                label: '微信'
                }],
            data: {
                mch_id: null,
                status: null,
                mch_name: null,
                sys_order_id: null,
                pay_type: null,
                start_time: null,
                end_time: null,
                offset: 0,
                limit: 10
            },
            tableData: [],
            value7: null
        }
    },
    methods: {
        getSum() {
            moneySum(this.data).then((res) => {
                this.total = Number(res.data.sum)/100 || 0
                this.mchCharge = Number(res.data.mch_charge)/100 || 0
                this.count = res.data.count || 0
            })
        },
        //商户收搜
        handleSelect(item) {
            this.data.mch_name = item.value
            this.getBillList()
            this.getSum()
        },
        //关键字查询
        querySearch(queryString, cb) {
            this.mchList = []
            getMch(queryString).then( res => {
                let list = res.data
                list.forEach( ele => {
                    let obj = {}
                    obj.value = ele
                    this.mchList.push(obj)
                })
            })
            cb(this.mchList)
        },
        //今日
        searchToday() {
            const end = new Date();
            const start = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime())
            this.value7 = [start,end]
            this.searchBtn()
        },
        // 昨日
        searchYest() {
            const start = new Date();
            const end = new Date(new Date().toLocaleDateString())
            end.setTime(end.getTime())
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
            this.value7 = [start,end]
            this.searchBtn()
        },
        //本周
        searchWeek() {
            const end = new Date();
            const start = new Date(new Date().toLocaleDateString())
            const nowDayOfWeek = start.getDay()
            if(nowDayOfWeek == 0) {
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
            }else{
                start.setTime(start.getTime() - 3600 * 1000 * 24 * (nowDayOfWeek - 1));
            }
            this.value7 = [start,end]
            this.searchBtn()
        },
        //上周
        searchLastWeek() {
            const start = new Date()
            const end = new Date(new Date().toLocaleDateString());
            const nowDayOfWeek = end.getDay()
            if(nowDayOfWeek == 0) {
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 6)
            }else{
                end.setTime(end.getTime() - 3600 * 1000 * 24 * (nowDayOfWeek - 1));
            }
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
            this.value7 = [start,end]
            this.searchBtn()
        },
        //本月
        searchMonth() {
            const end = new Date();
            const start = new Date();
            start.setDate(1);
            start.setHours(0);
            start.setSeconds(0);
            start.setMinutes(0);
            start.getTime();
            this.value7 = [start,end]
            this.searchBtn()
        },
        //上月
        searchLastMonth() {
            const start = new Date()
            const end = new Date();
            start.setDate(1);
            start.setHours(0);
            start.setSeconds(0);
            start.setMinutes(0);
            end.setDate(1);
            end.setHours(0);
            end.setSeconds(0);
            end.setMinutes(0);
            end.getTime();
            const month = start.getMonth()
            const year = start.getFullYear()
            if(month == 0) {
                start.setFullYear(year - 1)
                start.setMonth(11)
            }else{
                start.setMonth(month - 1)
            }
            start.getTime()
            this.value7 = [start,end]
            this.searchBtn()
        },
        //搜索
        searchBtn() {
            if(this.value7 != null) {
                this.data.start_time = this.value7[0]
                this.data.end_time = this.value7[1]
            } else{
                this.data.start_time = null
                this.data.end_time = null
            }
            for( var key in this.data) {
                if(this.data[key] === null || this.data[key] === '') {
                    delete this.data[key]
                }
            }
            this.getBillList()
            this.getSum()
        },
        //交易列表
        getBillList() {
            billList(this.data).then((res) => {
                this.tableData = res.data.data_list
                this.tableData.forEach( ele => {
                    if(ele.money && ele.money != '') {
                        ele.money = ele.money/100
                    }
                    if(ele.mch_charge && ele.mch_charge != '') {
                        ele.mch_charge = ele.mch_charge/100
                    }
                    if( ele.create_time ) {
                        ele.create_time = changeData(ele.create_time)
                    }
                    if(ele.state == 1) {
                        ele.state = '待支付'
                    }else if(ele.state == 2) {
                        ele.state = '交易进行中'
                    }else if(ele.state == 3) {
                        ele.state = '交易成功'
                    }else if(ele.state == 4) {
                        ele.state = '交易失败'
                    }else if(ele.state == 9) {
                        ele.state = '超时关闭'
                    }else{
                        ele.state = '状态异常'
                    }
                })
                this.total_count = res.data.total_count
            })
        },
        // 补单
        handleClickReissue(row) {
            this.$confirm('确认补单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    sys_order_id: row.sys_order_id
                }
                reissue(data).then( res => {
                    this.getBillList()
                })
                this.$message({
                    type: 'success',
                    message: '补单成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        // 详情
        handleClick(row) {
            this.$router.push({path: '/home/oneBillDetail',query: {billInfo: row}})
        },
        
        handleSizeChange(val) {
            this.data.limit = val
            this.getBillList()
        },
        handleCurrentChange(val) {
            this.data.offset = (val -1) * this.data.limit
            this.getBillList()
        }
    },
    mounted() {
        this.getSum()
        this.getBillList()
    }

}
</script>

<style lang='sass' scoped>
.bill-detail
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
    .num-wrapper
        margin-top: 30px
        font-size: 18px
        .num
            display: inline-block
            margin-right: 50px
            margin-top: 15px
            font-size: 14px
            span
                color: red
    .search
        display: flex
        margin-top: 20px
        .search-ct
            margin-left: 60px
            .search-name
                font-size: 12px
                line-height: 18.2px
                padding-bottom: 10px
            input
                margin-top: 10px
                border: 1px solid #B1B3C1
                border-radius: 2px
                width: 200px
                height: 40px
                line-height: 40px
                padding: 20px
                font-size: 14px
                background: #fff
            .inline-input
                width: 220px
            .pay-state
                width: 220px
            .rapid-btn
                display: inline-block
                width: 40px
                height: 35px
                line-height: 35px
                text-align: center
                border: 1px solid #00DB00
                color: #00DB00
                border-radius: 5px;
                font-size: 14px
                margin-left: 2px
                cursor: pointer
            .search-btn
                display: inline-block
                width: 100px
                height: 35px
                line-height: 35px
                text-align: center
                color: #fff
                background: #00BFA6;
                border-radius: 25px;
                font-size: 14px
                margin: 0 0 0 30px
        .search-ct:first-child
            margin-left: 0
           
    .table
        margin-top: 40px
        width: 1160px
        .block
            padding: 30px 0
            text-align: center 
</style>
