<template>
    <div>
        <div class="choose">
            <div>
                <div>
                    <el-input type="text" placeholder="请输入服务商名称查询"></el-input>
                </div>
                <div>
                    <el-input type="text" placeholder="请输入港口名称查询"></el-input>
                </div>
                <div>
                    <el-select v-model="types" multiple placeholder="请选择服务类型">
                        <el-option v-for="(item,index) in typeList"
                                    :key="item.merchantServiceTypeId"
                                    :label="item.nameZh"
                                    :value="item.merchantServiceTypeId"></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="facilitator-search" v-if="lists.length">
            <div class="lists" v-for="(item,index) in lists" flex="dir:top">
                <div class="name" flex="main:justify">
                    <span class="certified">{{item.merchant.merchantName}}&nbsp
                        <img src="../images/certified@2x.png" v-if="item.merchant.flag == 4">
                        <img src="../images/uncertified@2x.png" v-else>
                    </span>
                    <img :src="imgServerUrl+'/'+item.merchant.facePhotoPath" class="img" v-if="item.merchant.facePhotoPath">
                </div>
                <div class="star" flex>
                    <ul flex>
                        <li v-if="item.starNumber" v-for="n in item.starNumber"><img src="../images/star_orange@2x.png"></li>
                    </ul>
                    <ul flex>
                        <li v-if="5 - item.starNumber" v-for="n in (5 - item.starNumber)"><img src="../images/star_gray@2x.png"></li>
                    </ul>
                </div>
                <div class="address">{{item.merchant.address}}</div>
                <div class="type">{{item.serviceType}}</div>
                <div class="service" flex="main:justify">
                    <div>
                        <span v-if="item.merchant.telephone"><img src="../images/telphone.png">&nbsp{{item.merchant.telephone}}</span>
                    </div>
                    <span class="jump" @click.stop="toInfo(index)">进店看看</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import $api from '../../Common/tools/api';
    import config from '../../Common/tools/config';
    import '../less/facilitator-search.less';

    export default {
        name: 'facilitator-search',
        data(){
            return {
                types:[],
                port:null,
                scope:null,
                typeList:[],
                portList:[],
                content:{},
                lists: [],
                thumb:null,
                loading:true,
                imgServerUrl:''
            }
        },
        created(){
            this.imgServerUrl = config.imgServerUrl;
            // this.getMerchants();
            this.getTypes();
        },
        components: {},
        computed: {},
        methods: {
            //获取服务商列表
            getMerchants(){
                let param = {
                    distance: this.scope || 5,
                    // merchantTypeId: this.types || null,
                    // portcode: this.port || null,
                };
                if(this.types){
                    param. merchantTypeId= this.types;
                }
                if(this.port){
                    param.portcode= this.port;
                }
                $api.get('/secure/merchant/surrounding/query',param).then(res => {
                    this.loading= false;
                    // console.log(JSON.stringify(res))
                    if(res.status == 1){
                        this.content = res.content;
                        this.lists = this.content.result;
                    }
                });
            },
            //获取服务类型
            getTypes(){
                $api.get('/secure/merchant/servicetype/names').then(res => {
                    this.typeList = res.content
                });
            },
            //跳转到服务商信息页
            toInfo(index){
                this.$router.push(`/wx/map/peripheral-merchantInfo?merchantId=${this.lists[index].merchant.merchantId}`);
            },
        },
        destroyed(){

        }
    }
</script>
