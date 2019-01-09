<template>
        <el-row class="tac">
            <el-col >
                <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#34395D"
                    text-color="#fff"
                    unique-opened
                    router
                    active-text-color="#00B7AD">
                    <el-menu-item index="/home">
                        <i class="el-icon-menu"></i>
                        <span slot="title">主页</span>
                    </el-menu-item>
                     <el-menu-item index="/home/merManage">
                        <i class="el-icon-setting"></i>
                        <span slot="title">商户管理</span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-goods"></i>
                            <span>交易管理</span>
                        </template>
                        <el-menu-item index="/home/billList">
                            <i class="el-icon-goods"></i>
                            <span slot="title">充值交易</span>
                        </el-menu-item>
                        <el-menu-item index="/home/payList">
                            <i class="el-icon-goods"></i>
                            <span slot="title">代付交易</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/home/sysApp">
                        <i class="el-icon-picture-outline"></i>
                        <span slot="title">产品管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/cashList">
                        <i class="el-icon-printer"></i>
                        <span slot="title">提现管理</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/home/agentList">
                        <i class="el-icon-document"></i>
                        <span slot="title">代理管理</span>
                    </el-menu-item> -->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-goods"></i>
                            <span>通道管理</span>
                        </template>
                        <el-menu-item index="/home/channel">
                            <span slot="title">充值通道</span>
                        </el-menu-item>
                        <el-menu-item index="/home/payBank">
                            <span slot="title">代付通道</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- <el-menu-item index="/home/merchant">
                        <i class="el-icon-document"></i>
                        <span slot="title">商户审核</span>
                    </el-menu-item> -->
                </el-menu>
            </el-col>
        </el-row>
</template>

<script>
export default {
    name: 'tabs',
    data() {
        return{

        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style lang="sass" scoped>
    .tac 
        width: 287px
        flex-shrink: 0
    .el-menu-vertical-demo:not(.el-menu--collapse) 
        height: calc(100vh - 111px)
</style>


