<template>
	<div class="port-select" >
		<el-dialog title="请选择港口" 
        :visible.sync="visible"
        @close="$emit('update:show', false)"  
        :show="show">
            <div class="inner-box">
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">国家</label>
                    <div flex-box="1">
                        <el-select 
                        v-model="country" 
                        filterable 
                        remote
                        :remote-method = "onSearchCoun" 
                        :loading="loading"
                        placeholder="请输入国家名称">
                            <el-option 
                                v-for="item in countryList"
                                :key="item.country"
                                :label="item.ancn"
                                :value="item.ancn"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">港口</label>
                    <div flex-box="1">
                       <el-select 
                           v-model="port"
                           multiple
                           :multiple-limit="3"
                           filterable
                           placeholder="请选择港口"
                           remote
                           :remote-method = "onSearchPort" 
                           @change="changePort"
                           :loading="loading" >
                            <el-option 
                                v-for="item in portList" 
                                :key="item.portcode"
                                :label="item.cnportname"
                                :value="item.portcode+'$'+item.cnportname">
                            </el-option>
                       </el-select>
                    </div>
                </div>
                <div slot="footer" flex="main:center">
                    <el-button type="info" @click.stop="visible = false">取 消</el-button>
                    <el-button type="primary" @click="okAction">保 存</el-button>
                </div>
            </div>
        </el-dialog>
	</div>
</template>
<script>
	import $api from '../../tools/api.js';
    export default {
        name: 'port-select',
        props: ['show','portSelect','type'],
        data(){
            return {
                loading: false,
                countryList: [],
                portList: [],
                search: {},
                searchCountry: '',
                visible: false,
                country: '',
                port: [],
                portInfo: [],
            }
        },
        created(){
            if(this.type == 'add'){
                this.country = '中国'
            }
            if(this.portSelect){
                if(!this.portSelect.length){
                    return false;
                }
                this.country = this.portSelect[0].ancn;
                this.portSelect.forEach(item => {
                    this.portInfo.push(item.portcode+'$'+item.cnportname);
                    this.port.push(item.cnportname)
                })
            }
        },
        computed: {
            
        },
        methods: {
            //国家模糊查询API
            onSearchCoun(query){
                let text = query.trim();
                if (!text) {
                    this.countryList = [];
                    return false;
                }
                this.loading = true;
                $api.get('/secure/merchant/countrys/query',{
                    ancn: query
                }).then(res => {
                    this.loading = false;
                    if(res.status == 1){
                        //this.countryList = res.content.slice(0, 30);
                        this.countryList = res.content || [];
                        this.showScouList = true;
                        this.portList = []
                    }
                });
            },
            //港口模糊查询API
            onSearchPort(query){
                if (!query) {
                    this.showSearchList = false;
                    return false;
                }
                this.loading = true;
                let port = query.trim();
                if (!port) {
                    this.portList = [];
                    this.search.full = false;
                    return false;
                }
                return new Promise((resolve,reject) => {
                    this.getCountPort(port).then(res => {
                        this.loading = false;
                        if(res.status == 1){
                            this.showSearchList = true;
                            this.portList = res.content;
                            resolve(res)
                        }else{
                            reject({error: 'error'});
                        }
                    });
                })
            },
            //根据国家和港口模糊查询港口
            getCountPort(port){
                return $api.get('/secure/merchant/ports/query',{
                    ancn: this.country,
                    cnportname: port
                });
            },
            okAction() {
                this.$emit('confirmBack', this.port)
            },
            changePort(val){
                this.port = [];
                val.map(item => {
                    this.portInfo.map(item1 => {
                        if (item == item1.split('$')[1]){
                            item = item1
                        }
                    });
                    this.port.push(item)
                });
            }
        },
        watch: {  
            show () {  
                this.visible = this.show;  
            }  
        },
        destroyed(){

        }
    }
</script>
<style lang="less" scoped="">
    .inner-box{
        padding: 0 50px;
        .form-item{
            .item-label{
                min-width: 50px;
                width: auto;
            }
        }
    }
</style>