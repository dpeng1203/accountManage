<template>
    <div class="mer-manage">
        <div class="title">
            <span>代理管理</span>
        </div>  
        <div class="add-btn" @click="addBtn">新增</div>
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
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号"
                    width="150">
                </el-table-column>
                <el-table-column label="费率（%）">
                    <el-table-column
                        v-for="(item,index) in rateList"
                        :key="item.app_id"
                        :prop="String(index)"
                        :label="item.app_name"
                        width="100">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="warning" size="small">修改</el-button>
                    <el-button @click="handleCheckChild(scope.row)" type="success" size="small">子账户</el-button>
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

    </div>
</template>

<script>
import changeData from '../../config/formatData'
import { agentList } from '../../config/api'
export default {
    name: 'accountManage',
    data() {
        return{
            tableData: [],
            rateList: [],
            currentPage: 1,
            total: 0,
            data: {
                offset: 0,
                limit: 10
            }
        }
    },
    methods: {
        getList() {
            agentList(this.data).then((res) => {
                this.total = res.data.total_count
                this.tableData = res.data.data_list
                this.tableData.forEach( ele => {
                    if(ele.user_app_detail) {
                        this.rateList = ele.user_app_detail
                        for( let i = 0 ; i < this.rateList.length; i++) {
                            ele[i] = this.rateList[i].rate/100
                        }
                    }
                })
            })
        },

        //修改
        handleClick(row) {
            this.$router.push({path: '/home/addAgent',query: {detail: row}})
        },
        //查看子账户
        handleCheckChild(row) {
            this.$router.push({path: '/home/childAgent',query: {id: row.mch_id}})
        },
        handleSizeChange(val) {
            this.data.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.data.offset = (val - 1) * this.data.limit
            this.getList()
        },
        addBtn() {
            this.$router.push('/home/addAgent')
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
            
        .search-ct:first-child
            margin-left: 0
    .add-btn
        width: 120px
        height: 40px
        margin-top: 60px
        line-height: 40px
        text-align: center
        color: #fff
        background: #00BFA6;
        border-radius: 25px;
        font-size: 14px
        margin-top: 30px 
    .table
        margin-top: 40px
        width: 1002px
        .block
            padding: 30px 0
            text-align: center 
</style>

