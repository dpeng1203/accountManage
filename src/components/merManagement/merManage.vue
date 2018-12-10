<template>
    <div class="mer-manage">
        <div class="title">
            <span>商户管理</span>
        </div>  
        <div class="search">
            <div class="search-ct">
                <div class="search-name">状态</div>
                <el-select v-model="data.state" placeholder="请选择">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-ct">
                <div class="search-name">商户名称</div>
                <el-input class="inline-input" v-model="data.mch_name" placeholder="请输入内容" clearable></el-input>
            </div>
             <div class="search-ct">
                <div class="search-name">商户号</div>
                <el-input class="inline-input" v-model="data.mch_id" placeholder="请输入内容" clearable></el-input>
            </div>
        </div>
        <div class="search">
            <div class="search-ct">
                <div class="search-name">法人姓名</div>
                <el-input class="inline-input" v-model="data.name" placeholder="请输入内容" clearable></el-input>
            </div>
            <div class="search-ct">
                <div class="search-name">法人手机号</div>
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
                <!-- <el-table-column
                    prop="mch_id"
                    label="序号"
                    width="100">
                </el-table-column> -->
                <el-table-column
                    prop="mch_id"
                    label="商户号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="mch_name"
                    label="商户名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="legal_name"
                    label="法人姓名"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="legal_phone"
                    label="法人手机号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    width="150">
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,20,50,100, 200, 300, 400]"
                    :page-size="data.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { merList } from '../../config/api'
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
                label: '审核通过'
                }, {
                value: '2',
                label: '审核拒绝'
                }],
            data: {
                phone: null,
                name: null,
                mch_name: null,
                state: null,
                mch_id: null,
                offset: 0,
                limit: 5
            }
        }
    },
    methods: {
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
                    if(ele.state == 0) {
                        ele.state = '待审核'
                    }else if(ele.state == 1) {
                        ele.state = '审核通过'
                    }else {
                        ele.state = '审核拒绝'
                    }
                })
                console.log(res)
            })
        },

        searchBtn() {
            this.getList()
        },

        handleClick(row) {
            console.log(row);
            // this.$router.push({path: '/home/accountDetail',query: {detail: row}})
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
        width: 1002px
        .block
            padding: 30px 0
            text-align: center 
</style>
