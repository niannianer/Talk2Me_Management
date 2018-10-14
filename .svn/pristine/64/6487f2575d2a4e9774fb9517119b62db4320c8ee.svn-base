<template>
    <div class="user-manage">
        <div flex-box="0" flex>
            <div flex-box="0" flex="cross:center" class="search-flag">
                <span flex-box="0" class="search-name">用户名</span>
                <div flex-box="1">
                    <el-input v-model="username" placeholder="请输入用户名"></el-input>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-input" style="margin-left: 10px">
                <span flex-box="0" class="search-name">角色</span>
                <div flex-box="1">
                    <el-input v-model="rolename" placeholder="请输入角色"></el-input>
                </div>
            </div>
            <div flex-box="0">
                <el-button type="primary" @click="onSearch">查询</el-button>
            </div>
        </div>
        <div flex>
            <div class="curt-loca" flex-box="1">当前位置：<span>用户管理</span></div>
            <!--<div flex-box="0">-->
                <!--<el-button type="primary">注册</el-button>-->
            <!--</div>-->
        </div>

        <div>
            <el-table
                    :data="userList"
                    border
                    v-loading="loading"
                    style="width: 100%">
                <el-table-column prop="username" label="用户名" align="center" width="300"></el-table-column>
                <el-table-column prop="role" label="角色"  align="center"></el-table-column>
                <el-table-column prop="enabled" label="状态" :formatter="getFlag" align="center" width="100"></el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="dialogAction(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
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

        <!--编辑弹框-->
        <el-dialog :visible.sync="showDialog">
            <div class="inner-box">
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">角色</label>
                    <div flex-box="1">
                        <el-checkbox-group v-model="checkList">
                            <el-row class="el-border">
                                <el-col :span="12" v-for="item in roleList"><el-checkbox :label="item.id">{{item.name}}</el-checkbox></el-col>
                            </el-row>
                        </el-checkbox-group>
                    </div>
                </div>
                <div slot="footer" flex="main:center">
                    <el-button type="info" @click="showDialog = false">取 消</el-button>
                    <el-button type="primary" @click="updateSave">保 存</el-button>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import $api from '../../Common/tools/api.js';
    import {mapState} from 'vuex';
    import '../less/user-manage.less'
    export default {
        name: 'user-manage',
        data(){
            return {
                rolename:null,
                username:null,
                page:0,
                size:10,
                totals:0,
                loading:true,
                showDialog: false,
                userList: [],
                roleList: [],
                sendInfo: {
                    enabled: 1,
                    username: '',
                    password: '',
                    roles:[],
                },
                checkList:[],
            }
        },
        created(){
            this.getList();
            this.getRoleList();
        },
        computed: {
            ...mapState(['maerchanttype'])
        },
        methods: {
            //查询
            onSearch(){
                this.page = 0;
                this.getList();
            },
            //获取用户列表
            getList(){
                let param = {
                    page:this.page,
                    size:this.size,
                };
                if(this.username){
                    param.username = this.username
                }
                if(this.rolename){
                    param.rolename = this.rolename
                }
                $api.get('/user/list/query',param).then(res => {
                    this.loading = false;
                    this.userList = [];
                    res.content.forEach(item => {
                        if(item.id){
                            let roles = item.roles.map(item2 => {
                                return item2.name
                            });
                            item.role = roles.join(',');
                            this.userList.push(item);
                        }
                    });
                    this.totals = res.totalElements;
                }).catch(err =>{
                    console.log(err)
                })
            },
            // 角色列表
            getRoleList(){
                this.checkList = [];
                let param = {
                    page:0,
                    size:100,
                };
                $api.get('/user/role/list/query',param).then(res => {
                    res.content.forEach(item => {
                        this.roleList.push(
                            {
                                name:item.name,
                                id:item.id
                            }
                        )
                    })
                })
            },
            //点击编辑
            dialogAction(row) {
                this.showDialog = true;
                this.checkList = [];
                this.checkList = row.roles.map(item => {
                    return item.id
                });
                this.sendInfo.username = row.username;
                this.sendInfo.password = row.password;
                this.sendInfo.enabled = row.enabled;
                this.sendInfo.id = row.id;
            },
            //修改 保存
            updateSave(){
                this.showDialog = false;

                 this.checkList.map(item => {
                   this.roleList.map(item1 => {
                       if(item == item1.id){
                           this.sendInfo.roles.push(item1)
                       }
                   })
                });
                $api.post('/user/resetrole' ,this.sendInfo).then(res => {
                    if(res.status == 1){
                        this.$message.success('保存成功');
                        this.getList()
                    }else {
                        this.$message.error('保存失败')
                    }
                }).catch(err =>{
                    console.log('err2')
                });
            },
            handleSizeChange(val){
                this.size = val;
                this.getList();
            },
            handleCurrentChange(val){
                this.page = val-1;
                this.getList();
            },
            //切换为文字状态
            getFlag(row,column) {
                let status =  row[column.property];
                if(status == 0){
                    return '失效'
                }else if(status == 1){
                    return '正常'
                }
                return status
            }
        },
        destroyed(){

        }
    }
</script>
