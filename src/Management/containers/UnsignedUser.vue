<template>
    <div class="unsigned-user" flex="dir:top">
        <div flex-box="0" flex>
            <div flex-box="0" class="search-input">
                <el-input v-model="search" placeholder="输入公司名称、邮箱或联系人，智能搜索所有注册用户状态"></el-input>
            </div>
            <div flex-box="0">
                <el-button type="primary" @click="onSearch">搜索</el-button>
            </div>
        </div>
        <div flex-box="0" class="curt-loca">当前位置：<span>未签用户</span></div>
        <div flex-box="1">
            <div flex>
                <div>按联系人排序</div>
            </div>
            <el-table :data="tableData" border stripe size="small" align="center">
                <el-table-column prop="date" label="序号"></el-table-column>
                <el-table-column prop="name" label="联系人"></el-table-column>
                <el-table-column prop="date" label="电子邮箱（账号）*"></el-table-column>
                <el-table-column prop="date" label="在线记录" width="50">
                    <template slot-scope="scope">
                        <el-button @click="viewLineRecord(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="反馈记录" width="80">
                    <template slot-scope="scope">
                        <el-button @click="viewLineRecord(scope.row)" type="text" size="small">添加</el-button>
                        <el-button type="text" size="small">查询</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="公司名称"></el-table-column>
                <el-table-column prop="date" label="详细信息">
                    <template slot-scope="scope">
                        <el-button @click="viewLineRecord(scope.row)" type="text" size="small">浏览</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="船队" width="50">
                    <template slot-scope="scope">
                        <el-button @click="viewLineRecord(scope.row)" type="text" size="small">管理</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="权限"></el-table-column>
                <el-table-column prop="date" label="注册时间"></el-table-column>
                <el-table-column prop="date" label="截止时间"></el-table-column>
                <el-table-column prop="date" label="角色转换"></el-table-column>
                <el-table-column prop="date" label="转免费"></el-table-column>
                <el-table-column prop="date" label="短信通知"></el-table-column>
                <el-table-column prop="date" label="代理账号"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import '../less/unsigned-user.less';
    export default {
        name: 'unsigned-user',
        data(){
            return {
                search: '',
                tableData: [{
                    num: 1,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    num: 2,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    num: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    num: 2,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    num: 2,
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    num: 2,
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        created(){
        },
        computed: {},
        methods: {
            onSearch(){

            },
            viewLineRecord(){

            }
        },
        destroyed(){

        }
    }
</script>
