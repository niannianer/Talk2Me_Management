<template>
    <div class="contact-manage" flex="dir:top">
        <div flex-box="0" flex>
            <div flex-box="0" flex="cross:center" class="search-flag">
                <span flex-box="0" class="search-name">排序</span>
                <div flex-box="1">
                    <el-select v-model="order" placeholder="请选择排序">
                        <el-option label="提交时间" value="subtime"></el-option>
                        <el-option label="处理时间" value="replytime"></el-option>
                    </el-select>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-input">
                <span flex-box="0" class="search-name">公司名称</span>
                <div flex-box="1">
                    <el-input v-model="company" placeholder="请输入名称"></el-input>
                </div>
            </div>
            <div flex-box="0">
                <el-button type="primary" @click="onSearch">查询</el-button>
            </div>
        </div>
        <div flex flex-box="0">
            <div class="curt-loca" flex-box="1">当前位置：<span>合作联系管理</span></div>
        </div>

        <div flex-box="1">
            <el-table :data="lists" border stripe
                      size="small"
                      v-loading="loading">
                <el-table-column prop="linkname" label="姓名" align="center"></el-table-column>
                <el-table-column prop="company" label="公司名称" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
                <el-table-column prop="telephone" label="电话" align="center"></el-table-column>
                <el-table-column prop="userId" label="提交人" align="center"></el-table-column>
                <el-table-column prop="subtime" label="提交时间" align="center" :formatter="formatTime" sortable></el-table-column>
                <el-table-column prop="replytime" label="处理时间" align="center" :formatter="formatTime" sortable></el-table-column>
                <el-table-column prop="content" label="内容" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="replyUser" label="审核人" align="center"></el-table-column>
                <el-table-column prop="remark" label="处理说明" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click.stop="dialogAction(scope.row)">处理结果</el-button>
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
                    <label class="item-label" flex-box="0">处理说明</label>
                    <div flex-box="1">
                        <el-input v-model="sendInfo.remark"></el-input>
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
    import { mapState } from 'vuex';
    import {auditStatusText, timeFormater} from '../../Common/filters/index.js';
    import '../less/contact-manage.less';
    export default {
        name: 'contact-manage',
        data(){
            return {
                order :'subtime',
                company: null,
                lists: [],
                size: 10,
                page: 0,
                totals: 0,
                showDialog:false,
                disable:false,
                loading: true,
                param: {},
                sendInfo:{}
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
                    order: this.order,
                };
                if(this.company){
                    this.param.company = this.company;
                }
                $api.get('/user/Cooperationintention/list/query',this.param).then(res => {
                    this.loading = false;
                    if(res){
                        this.lists = res.content || [];
                        this.totals = res.totalElements;
                    }else {
                        this.$message.error('加载失败')
                    }
                });
            },
            //点击修改状态
            dialogAction(row) {
                this.showDialog = true;
                this.sendInfo = JSON.parse(JSON.stringify(row));
            },
            //保存
            updateSave(){
                this.showDialog = false;
                this.sendInfo.replyUser = this.userEmail;
                if(!this.sendInfo.remark){
                    this.$message.warning('请填写说明');
                    return false
                }
                console.log('info   ' + JSON.stringify(this.sendInfo));
                $api.post('/user/cooperationintention/save' ,this.sendInfo).then(res => {
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
                let status =  row[column.property];
                if(status == 1){
                    return '已通过'
                }else if(status == 2){
                    return '未通过'
                }
                return status
            },
            //时间
            formatTime(row,column){
                let time = row[column.property];
                return timeFormater(time,'yyyy-MM-dd hh:mm');
            },
        },
        destroyed(){

        }
    }
</script>
