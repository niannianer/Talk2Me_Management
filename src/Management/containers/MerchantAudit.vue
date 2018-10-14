<template>
    <div class="merchant-audit" flex="dir:top">
        <div flex-box="0" flex>
            <div flex-box="0" flex="cross:center" class="search-flag">
                <span flex-box="0" class="search-name">审核状态</span>
                <div flex-box="1">
                    <el-select v-model="verifyStatus" placeholder="请选择状态">
                        <el-option label="全部" :value="''" ></el-option>
                        <el-option label="审核不通过" :value="1"></el-option>
                        <el-option label="审核通过" :value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-input">
                <span flex-box="0" class="search-name">商家名称</span>
                <div flex-box="1">
                    <el-input v-model="merchantName" placeholder="输入商家名称"></el-input>
                </div>
            </div>
        </div>
        <div flex style="margin-top: 10px">
            <div>
                <el-date-picker
                        v-model="updateTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="更新开始日期"
                        end-placeholder="更新结束日期"
                        unlink-panels
                        value-format="timestamp">
                </el-date-picker>
            </div>
            <div style="margin-left: 20px">
                <el-button type="primary" @click="onSearch">查询</el-button>
            </div>
        </div>
        <div flex flex-box="0">
            <div class="curt-loca" flex-box="1">当前位置：<span>商家信息审核</span></div>
        </div>

        <div flex-box="1">
            <el-table :data="lists" border stripe
                      size="small"
                      v-loading="loading">
                <el-table-column prop="merchantName" label="商家名称" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column prop="verifytime" label="审核时间" :formatter="formatTime" align="center" sortable></el-table-column>
                <el-table-column prop="verifyStatus" :formatter="statusText" label="审核状态" align="center"></el-table-column>
                <el-table-column prop="verifier" label="审核人" align="center"></el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <!--<el-button type="primary" size="small" v-if="!(scope.row.maVo || {}).id && (scope.row.userUnionId == userEmail)" @click.stop="toPage('edit',scope.row)">编辑</el-button>-->
                        <el-button type="primary" size="small" @click.stop="toPage('audit',scope.row)">编辑</el-button>
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
    </div>
</template>
<script>
    import $api from '../../Common/tools/api';
    import {session,local} from '../../Common/tools/store.js';
    import { mapState } from 'vuex';
    import {timeFormater} from '../../Common/filters/index.js';
    import '../less/merchant-audit.less';
    export default {
        name: 'merchant-audit',
        data(){
            return {
                lists: [],
                size: 10,
                page: 0,
                totals: 0,
                merchantName: '',
                flag: null,
                verifyStatus: '',
                loading: true,
                updateTime: '',
            }
        },
        created(){
            this.loadData();
        },
        computed: {
            ...mapState(['userEmail'])
        },
        methods: {
            //搜索
            onSearch(){
                this.page = 0;
                this.loadData();
            },
            //加载数据
            loadData(){
                let param = {};
                this.loading = true;
                let {size, page, merchantName, verifyStatus,updateTime} = this;
                param = {size,page};
                if(merchantName){
                    param.merchantName = merchantName;
                }
                if(verifyStatus){
                    param.verifyStatus = verifyStatus;
                }
                if(updateTime){
                    param.updateStartTime = updateTime[0].toString();
                    param.updateEndTime = updateTime[1].toString();
                }
                console.log('param  ' + JSON.stringify(param));
                $api.get('/secure/merchant/manage/verify/list',param).then(res => {
                    this.loading = false;
                    if(res){
                        this.lists = res.content || [];
                        this.totals = res.totalElements;
                    }
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
            toPage(type,row){
                this.$router.push(`/management/menus/merchant-edit?type=${type}&mId=${row.merchantId}`);
            },
            //审核状态
            statusText(row,column){
                let status =  row[column.property];
                if(status == 0){
                    return '待审核'
                }else if(status == 1){
                    return '审核不通过'
                }else if(status == 2){
                    return '审核通过'
                }
                return status

            },
            //时间
            formatTime(row,column){
                let time =  row[column.property];
                return timeFormater(time,'yyyy-MM-dd hh:mm:ss');
            },
        },
        destroyed(){

        }
    }
</script>
