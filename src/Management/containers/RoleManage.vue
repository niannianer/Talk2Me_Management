<template>
    <div class="role-manage">
        <div flex-box="0" flex>
            <div flex-box="0" flex="cross:center" class="search-flag">
                <span flex-box="0" class="search-name">状态</span>
                <div flex-box="1">
                    <el-select v-model="enabled" placeholder="请选择状态">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option label="正常"
                                   :value="1">
                        </el-option>
                        <el-option label="失效"
                                   :value="0">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-flag" style="margin-left: 10px">
                <span flex-box="0" class="search-name">角色</span>
                <div flex-box="1">
                    <el-input v-model="role" placeholder="请输入角色"></el-input>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-input">
                <span flex-box="0" class="search-name">权限</span>
                <div flex-box="1">
                    <el-input v-model="permission" placeholder="输入权限名称"></el-input>
                </div>
            </div>
            <div flex-box="0">
                <el-button type="primary" @click="onSearch">查询</el-button>
            </div>
        </div>
        <div flex>
            <div class="curt-loca" flex-box="1">当前位置：<span>角色管理</span></div>
            <div flex-box="0">
                <el-button type="primary" @click.stop="dialogAction('add','')">添加</el-button>
            </div>
        </div>

        <div>
            <el-table
                    :data="roleList"
                    border
                    v-loading="loading"
                    style="width: 100%">
                <el-table-column prop="name" label="角色" align="center" width="300"></el-table-column>
                <el-table-column prop="authority" label="权限"  align="center"></el-table-column>
                <el-table-column prop="enabled" label="状态" :formatter="getFlag" align="center" width="100"></el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="dialogAction('update',scope.row)">编辑</el-button>
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

        <!--增加、修改弹框-->
        <el-dialog :visible.sync="showDialog">
            <div class="inner-box">
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">角色</label>
                    <div flex-box="1">
                        <el-input v-model="sendInfo.name" auto-complete="off"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">状态</label>
                    <div flex-box="1">
                        <el-select v-model="sendInfo.enabled" placeholder="请选择状态">
                            <el-option label="正常" :value="1"></el-option>
                            <el-option label="失效" :value="0"></el-option>
                        </el-select>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">权限</label>
                    <div flex-box="1">
                        <el-checkbox-group v-model="checkList">
                            <el-row class="el-border">
                                <el-col :span="12" v-for="item in parentList"><el-checkbox :label="item.id">{{item.name}}</el-checkbox></el-col>
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
    import '../less/role-manage.less'
    export default {
        name: 'role-manage',
        data(){
            return {
                enabled:'',
                role:null,
                permission:null,
                page:0,
                size:10,
                totals:0,
                loading:true,
                showDialog: false,
                roleList: [],
                parentList:[],
                sendInfo: {
                    enabled: 1,
                    permissions: [],
                    name: '',
                },
                checkList: [],

            }
        },
        created(){
            this.getList();
            this.authorityList();
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
            //获取角色列表
            getList(){
                let param = {
                    page:this.page,
                    size:this.size,
                };
                if(this.permission){
                    param.permission = this.permission
                }
                if(this.role){
                    param.role = this.role
                }
                if(this.enabled == 1 || this.enabled == 0){
                    param.enabled = this.enabled
                }
                $api.get('/user/role/list/query',param).then(res => {
                    this.loading = false;
                    this.roleList = [];
                    res.content.forEach(item => {
                       if(item.id){
                           let permissions = item.permissions.map(item2 => {
                               return item2.name
                           });
                           item.authority = permissions.join(',');
                           this.roleList.push(item);
                       }
                    });
                    this.totals = res.totalElements;
                }).catch(err =>{
                    console.log(err)
                })
            },
            //全部权限
            authorityList(){
                this.parentList = [];
                $api.get('/user/permission/all').then(res => {
                    if (res.status == 1){
                        this.parentList = res.content
                    }
                })
            },
            //点击修改/增加
            dialogAction(type,row) {
                if(type == 'update'){
                    this.checkList = [];
                    this.sendInfo.name = row.name;
                    this.sendInfo.id = row.id;
                    this.sendInfo.enable = row.enable;
                    this.checkList = row.permissions.map(item => {
                        if (item.id){
                            return item.id
                        }
                    });
                }else if(type == 'add'){
                    this.checkList = [];
                    this.sendInfo = {};
                }
                this.showDialog = true;
            },
            //修改／新增 保存
            updateSave(){
                this.showDialog = false;
                this.sendInfo.permissions = this.checkList.map(item => {
                    return {id : item}
                });
                $api.post('/user/role/save' ,this.sendInfo).then(res => {
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
