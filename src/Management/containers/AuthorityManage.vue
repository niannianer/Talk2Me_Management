<template>
    <div class="authority-manage" flex="dir:top">
        <div flex-box="0" flex>
            <div flex-box="0" flex="cross:center" class="search-flag">
                <span flex-box="0" class="search-name">父级</span>
                <div flex-box="1">
                    <el-select v-model="pid" placeholder="请选择父级">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option :label="item.name"
                                   :value="item.id"
                                   v-for="item,index in parentList">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-flag" style="margin-left: 10px">
                <span flex-box="0" class="search-name">说明</span>
                <div flex-box="1">
                    <el-input v-model="descritpion" placeholder="请输入说明"></el-input>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-input">
                <span flex-box="0" class="search-name">权限名称</span>
                <div flex-box="1">
                    <el-input v-model="name" placeholder="请输入权限名称"></el-input>
                </div>
            </div>
            <div flex-box="0">
                <el-button type="primary" @click="onSearch">查询</el-button>
            </div>
        </div>
        <div flex flex-box="0">
            <div class="curt-loca" flex-box="1">当前位置：<span>权限管理</span></div>
            <div flex-box="0">
                <el-button type="primary" @click.stop="dialogAction('add')">添加</el-button>
            </div>
        </div>

        <div flex-box="1">
            <el-table :data="lists" border stripe
                      size="small"
                      v-loading="loading">
                <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
                <el-table-column prop="descritpion" label="说明" align="center"></el-table-column>
                <el-table-column prop="url" label="url" align="center"></el-table-column>
                <el-table-column prop="parentPerm.name" label="父级" align="center"></el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click.stop="dialogAction('update',scope.$index)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div flex="main:center" class="page-tools" v-if="totals">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page+1"
                        :page-sizes="[5,10, 20, 50]"
                        :page-size="10"
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
                    <label class="item-label" flex-box="0">父级</label>
                    <div flex-box="1">
                        <el-select v-model="sendInfo.pid" placeholder="请选择父级">
                            <el-option :label="item.name"
                                       :value="item.id"
                                       :disabled="item.disable"
                                       v-for="item,index in parentList">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">权限名称</label>
                    <div flex-box="1">
                        <el-input v-model="sendInfo.name" auto-complete="off"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">说明</label>
                    <div flex-box="1">
                        <el-input v-model="sendInfo.descritpion" auto-complete="off"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">url</label>
                    <div flex-box="1">
                        <el-input v-model="sendInfo.url" auto-complete="off"></el-input>
                    </div>
                </div>
                <div slot="footer" flex="main:center">
                    <el-button type="info" @click="showDialog = false">取 消</el-button>
                    &nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-button type="primary" @click="updateSave">保 存</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import $api from '../../Common/tools/api';
    import comDatas from '../../Common/tools/comDatas';
    import {session} from '../../Common/tools/store.js';
    import { mapState } from 'vuex';
    import {auditStatusText, timeFormater} from '../../Common/filters/index.js';
    import '../less/authority-manage.less';
    export default {
        name: 'authority-manage',
        data(){
            return {
                parentList:[],
                pid :'',
                descritpion: null,
                name: null,
                lists: [],
                size: 10,
                page: 0,
                totals: 0,
                showDialog:false,
                disable:false,
                loading: true,
                param: {},
                sendInfo:{
                    name:'',
                    descritpion:'',
                    id:'',
                    url:'',
                    pid:'',
                }
            }
        },
        created(){
            this.loadData();
        },
        computed: {
            ...mapState(['userEmail'])
        },
        methods: {
            //查询
            onSearch(){
                this.page = 0;
                this.loadData();
            },
            //获取列表
            loadData(){
                this.loading = true;
                this.param = {
                    size: this.size,
                    page: this.page,
                };
                if(this.pid){
                    this.param.pid = this.pid;
                }
                if(this.descritpion){
                    this.param.descritpion = this.descritpion;
                }
                if(this.name){
                    this.param.name = this.name;
                }
                $api.get('/user/permission/list/query',this.param).then(res => {
                    this.loading = false;
                    if(res){
                        this.lists = res.content || [];
                        this.totals = res.totalElements;
                        this.authorityList();
                    }else {
                        this.$message.error('加载失败')
                    }
                });
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
            dialogAction(type,index) {
                this.showDialog = true;
                if(type == 'update'){
                    this.sendInfo.name = this.lists[index].name;
                    this.sendInfo.descritpion = this.lists[index].descritpion;
                    this.sendInfo.url = this.lists[index].url;
                    this.sendInfo.pid = this.lists[index].pid;
                    this.sendInfo.id = this.lists[index].id;
                    // alert(this.sendInfo.name)
                    this.parentList.forEach(item => {
                        item.disable = false;
                        if(this.sendInfo.name == item.name){
                            item.disable = true
                        }
                    })
                }else if(type == 'add'){
                    this.parentList.forEach(item => {
                        item.disable = false;
                    });
                    this.sendInfo = {};
                }
            },
            //保存
            updateSave(){
                this.showDialog = false;
                $api.post('/user/permission/save' ,this.sendInfo).then(res => {
                    if(res.status == 1){
                        this.$message.success('保存成功');
                        this.loadData()
                    }else {
                        this.$message.error('保存失败');
                    }

                }).catch(err =>{
                    console.log(err)
                });
            },
            handleSizeChange(val){
                this.size = val;
                this.loadData();
            },
            handleCurrentChange(val){
                this.page = val-1;
                this.loadData();
            },
            //审核状态
            statusText(row,column){
                let status =  (row.maVo || {})[column.property];
                return auditStatusText(status);

            },
            //时间
            formatTime(row,column){
                let time =  (row.maVo || {})[column.property];
                return timeFormater(time,'yyyy-MM-dd hh:mm:ss');
            },
        },
        destroyed(){

        }
    }
</script>
