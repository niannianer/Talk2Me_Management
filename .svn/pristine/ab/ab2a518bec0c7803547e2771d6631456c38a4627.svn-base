<template>
    <div class="merchant-search">
    	<div flex>
            <div class="choose-head" flex>
                <el-input type="text" placeholder="请输入服务商名称查询" v-model="words"></el-input>
                <span class="my-btn"> <el-button type="primary" icon="el-icon-search" @click.stop="onSearch"></el-button></span>
            </div>
            <div class="msg-text">*请先搜索您的服务商是否已有标注</div>
        </div>
        <div class="table-box" v-if="showSearchList">
        	<el-table
        	    v-loading="loading"
                :data="searchResult"
                highlight-current-row
                @current-change="handleCurrentChange">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="merchantName" label="名称"></el-table-column>
                <el-table-column prop="adress" label="地址"></el-table-column>
                <el-table-column label="状态" width="80" align="center">
                	<template slot-scope="scope">
                        <img src="../images/star.png" v-if="scope.row.flag" class="start-icon">
                        <span v-else>未认领</span>
                    </template>
                </el-table-column>
                <el-table-column width="60" align="center">
                    <template slot-scope="scope">
                        <el-radio v-model="selectInfo" :label="scope.row" size="medium"></el-radio>
                    </template>
                </el-table-column>
            </el-table>
            <div class="statement" flex="main:right">
                <div style="font-size: 12px;color: #969696;margin:10px 10px 0 0">请选择一个标注进行认领</div>
                <span class="my-btn"><el-button type="primary" @click.stop="toClaim">{{buttonText}}</el-button></span>
            </div>
        </div>
        <div class="no-search" v-else>
            <img src="../images/no-search.png">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import $api2 from '../../Common/tools/api2';
    import config from '../../Common/tools/config';
    import '../less/merchant-search.less';

    export default {
        name: 'merchant-search',
        data(){
            return {
                searchResult: [],
                loading:false,
                showSearchList: false,
                words: '',
                search: {},
                selectInfo: '',
                buttonText: '认领我的服务商'
            }
        },
        created(){
            
        },
        components: {},
        computed: {},
        methods: {
            //获取服务商列表
            //搜索
            onSearch(){
                if (!this.words) {
                    this.showSearchList = false;
                    return false;
                }
                let text = this.words.trim();
                this.searchResult = [];
                if (!text) {
                    this.search.full = false;
                    return false;
                }
                this.loading = true;
                $api2.get('/secure/merchant/simplelist/query/merchantname',{
                    merchantname: this.words
                }).then(res => {
                    this.loading = false;
                    if(res.status == 1){
                        this.searchResult = res.content;
                        this.showSearchList = this.searchResult.length > 0 ? true : false;
                    }
                });
            },
            toClaim(){
                console.log('info   ' + JSON.stringify(this.selectInfo));
                if(!this.selectInfo){
                    this.$message.error('请选择服务商');
                    return false;
                }
                //选择未被认领的服务商
                if(!this.selectInfo.flag){
                    console.log('info1   ' + JSON.stringify(this.selectInfo.merchantId));
                    this.$router.push(`/management/merchant/claim-edit?mId=${this.selectInfo.merchantId}&type=edit&action=claim`);
                    this.words = '';
                }else{
                    //选择被认领的服务商
                    console.log('info2  ' + JSON.stringify(this.selectInfo.merchantId));
                    this.$router.push(`/management/merchant/claim-edit?omId=${this.selectInfo.merchantId}&flag=1&type=edit&action=claim`);
                    this.words = '';
                }
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
            },
            //选择行
            handleCurrentChange(val){
                console.log(JSON.stringify(val));
                this.selectInfo = val
            }
        },
        watch:{
            selectInfo(curVal,oldVal){
                if(curVal.flag){
                    this.buttonText = '重新认领我的服务'
                }else{
                    this.buttonText = '认领我的服务'
                }
                
            }
        },
        destroyed(){

        }
    }
</script>
