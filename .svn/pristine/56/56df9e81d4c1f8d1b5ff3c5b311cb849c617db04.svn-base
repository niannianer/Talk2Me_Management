<template>
    <div class="email-receive">
        <div>
            收件箱
        </div>
        <div class="my-table">
            <el-table
                    :data="emailList"
                    style="width: 100%"
                    @row-click="pathTo"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="80"></el-table-column>
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <div class="email-img">
                            <img src="../images/email/email-open.png" v-if="scope.row.readDate">
                            <img src="../images/email/email.png" v-else>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="主题"></el-table-column>
                <el-table-column prop="username" label="发件人"></el-table-column>
                <el-table-column prop="sendDate" label="日期"></el-table-column>
            </el-table>
            <div flex="main:center" class="page-tools" v-if="totals">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page+1"
                        :page-sizes="[5,10, 20, 50]"
                        :page-size="size"
                        layout="total, sizes, prev, pager, next, jumper"
                        background
                        :total="totals">
                </el-pagination>
            </div>
        </div>
        <div style="margin-top: 20px" v-if="emailList.length">
            <el-button @click.stop="deleteList" type="danger" size="small">删除</el-button>
        </div>
    </div>
</template>
<script>
    import $api from '../../Common/tools/api';
    import {session,local} from '../../Common/tools/store.js';
    import '../less/email-receive.less';
    export default {
        name: 'email-receive',
        data(){
            return {
                user:'',
                emailList:[],
                checkList:[],
                page:0,
                size:10,
                totals:0,
            }
        },
        created(){
            this.user = local.getItem('userEmail');
            this.getData()
        },
        computed: {},
        methods: {
            //收件箱列表
            getData(){
                let param = {
                    user:this.user,
                    page:this.page,
                    size:this.size,
                }
                $api.get('/user/message/list/query/receivebox',param).then(res => {
                    if(res.status == 1){
                        this.emailList = res.content || [];
                        this.totals = Number(res.extraInfo);
                    }
                });
            },
            //选择
            handleSelectionChange(val){
                this.checkList = val
            },
            //删除邮件
            deleteList(){
                let ids = this.checkList.map(item => {
                    return item.id
                }).join(',');
                let param = {
                    user:this.user,
                    id:ids,
                    boxType:2
                };
                if (ids != ''){
                    this.$confirm('此操作将删除邮件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $api.get('/user/message/delete',param).then(res => {
                            if (res.status == 1){
                                this.$message.success('删除成功');
                                this.getData()
                            }else {
                                this.$message.error('删除失败')
                            }
                        })
                    }).catch(() => {
                        this.$message.info('已取消删除');
                    });
                }else {
                    this.$message.error('请选择要删除的邮件')
                }

            },
            //跳转到邮件详情
            pathTo(row){
                this.$router.push({
                    path: '/management/email/email-details',
                    query: {
                        id: row.id,
                        type:'receive'
                    }
                })
            },
            handleSizeChange(val){
                this.size = val;
                this.getData();
            },
            handleCurrentChange(val){
                this.page = val-1;
                this.getData();
            },
        },
        destroyed(){

        }
    }
</script>
