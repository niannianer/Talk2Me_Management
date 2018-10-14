<template>
    <div class="my-service">
        <nav-title :title="merchant.merchantName || '我的服务'"></nav-title>
        <!--<div flex class="status-action">-->
            <!--<div class="status-box" flex-box="1">-->
                <!--审核进度：{{claimInfo.flag | auditStatusText}}-->
                <!--<span class="remind-text">审核通过后3个月内不能进行信息修改</span>-->
            <!--</div>-->
        <!--</div>-->
        <div class="info">
            <div class="inner-title" flex="main:justify">
                <div class="sub-name">商家基本信息</div>
                <span class="my-btn">
                    <span @click.stop="actionTo('merchant')" style="color: #65c800;cursor: pointer">修改</span>
                    <!--<el-button type="primary" size="small" @click.stop="actionTo('merchant')" style="margin-right: 15px">修改</el-button>-->
                </span>
            </div>
            <div class="messages">
                <table class="table-box" border="1" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <span class="lables">联系人</span>
                            <span>{{merchant.linkname}}</span>
                        </td>
                        <td>
                            <span class="lables">地址</span>
                            <span class="my-address">{{merchant.address}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="lables">手机</span>
                            <span>{{phone}}</span>
                        </td>
                        <td>
                            <span class="lables">电子邮箱</span>
                            <span>{{merchant.email}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="lables">座机</span>
                            <span>{{tele}}</span>
                        </td>
                        <td>
                            <span class="lables">服务类型</span>
                            <span>{{serviceTypes}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="lables">服务内容</span>
                            <span>{{merchant.service}}</span>
                        </td>
                        <td>
                            <span class="lables">服务港口</span>
                            <span>{{portcode}}</span>
                        </td>
                    </tr>
                </table>
            </div>
            <!--<el-row :gutter="20">-->
                <!--<el-col :span="12"><div flex><span>联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span><span>{{merchant.linkname}}</span></div></el-col>-->
                <!--<el-col :span="12"><div flex><span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span><span>{{merchant.address}}</span></div></el-col>-->
            <!--</el-row>-->
            <!--<el-row :gutter="20">-->
                <!--<el-col :span="12"><div flex><span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</span><span>{{phone}}</span></div></el-col>-->
                <!--<el-col :span="12"><div flex><span>电子邮箱：</span><span>{{merchant.email}}</span></div></el-col>-->
            <!--</el-row>-->
            <!--<el-row :gutter="20">-->
                <!--<el-col :span="12"><div flex><span>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</span><span>{{tele}}</span></div></el-col>-->
                <!--<el-col :span="12"><div flex><span>服务类型：</span><span>{{serviceTypes}}</span></div></el-col>-->
            <!--</el-row>-->
            <!--<el-row :gutter="20">-->
                <!--<el-col :span="12"><div flex><span flex-box="0">服务内容：</span><span>{{merchant.service}}</span></div></el-col>-->
                <!--<el-col :span="12"><div flex><span>服务港口：</span><span>{{portcode}}</span></div></el-col>-->
            <!--</el-row>-->
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="muti-box">
                        <div style="margin-bottom: 10px">产品及服务图片：</div>
                        <div>
                            <img :src="item" v-for="item in thumb" class="img-path">
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="auth-wrap">
                <div class="inner-title" flex="main:justify">
                    <div class="sub-name">认证信息</div>
                    <span class="my-btn">
                        <span @click.stop="actionTo('auth')" style="color: #65c800;cursor: pointer">修改</span>
                        <!--<el-button type="primary" size="small" @click.stop="actionTo('auth')" style="margin-right: 15px">修改</el-button>-->
                    </span>
                </div>
                <table class="table-box" border="1" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <span class="lables">姓名</span>
                            <span>{{claimInfo.confirmName}}</span>
                        </td>
                        <td>
                            <span class="lables">电话</span>
                            <span>{{claimInfo.confirmTel}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="lables">注册号</span>
                            <span>{{claimInfo.registCode}}</span>
                        </td>
                        <td>
                            <span class="lables">身份证号</span>
                            <span>{{claimInfo.iDcode}}</span>
                        </td>
                    </tr>
                </table>
                <!--<el-row :gutter="20">-->
                    <!--<el-col :span="12"><div><span class="label-name">姓&nbsp;&nbsp;&nbsp;名：</span>{{claimInfo.confirmName}}</div></el-col>-->
                    <!--<el-col :span="12"><div><span class="label-name">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</span>{{claimInfo.confirmTel}}</div></el-col>-->
                <!--</el-row>-->
                <!--<el-row :gutter="20">-->
                    <!--<el-col :span="12"><div><span class="label-name">注册号：</span>{{claimInfo.registCode}}</div></el-col>-->
                    <!--<el-col :span="12"><div><span class="label-name">身份证号：</span>{{claimInfo.iDcode}}</div></el-col>-->
                <!--</el-row>-->
                <el-row>
                    <el-col :span="4">
                        <div>
                            <div class="label-name">手持身份证照：</div>
                            <div>
                                <img :src="imgServerUrl+claimInfo.catchIDPath" class="img-path" v-if="claimInfo.catchIDPath">
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <div>
                            <div class="label-name">门脸照片：</div>
                            <div>
                                <img :src="imgServerUrl+claimInfo.facePhotoPath" class="img-path" v-if="claimInfo.facePhotoPath">
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <div>
                            <div class="label-name">资质证照：</div>
                            <div>
                                <img :src="imgServerUrl+claimInfo.licensePath" class="img-path" v-if="claimInfo.licensePath">
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <div>
                            <div class="label-name">专业资质证书：</div>
                            <div>
                                <img :src="imgServerUrl+claimInfo.copyPath" class="img-path" v-if="claimInfo.copyPath">
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <div>
                            <div class="label-name">认领确认书：</div>
                            <div>
                                <img :src="imgServerUrl+claimInfo.confirmPath" class="img-path" v-if="claimInfo.confirmPath">
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div>
                            <div class="label-name">其它证明材料：</div>
                            <div>
                                <img v-for="item in claimInfo.othersPath" :src="imgServerUrl+item" class="img-path" >
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import $api2 from '../../Common/tools/api2.js';
    import {mapState} from 'vuex';
    import {session} from '../../Common/tools/store';
    import NavTitle from '../components/nav/nav';
    import config from '../../Common/tools/config';
    import '../less/my-service.less'
    export default {
        name: 'my-service',
        data(){
            return {
                canEdit: false,
                canEditTime: '',
                merchantList: [],
                merchant:{
                    merchantName:''
                },
                //座机号
                tele:'',
                //手机号
                phone:'',
                serviceTypes:'',
                portcode:'',
                claimInfo: {
                    merchantId: '',
                    iDPath:'',
                    facePhotoPath: '',
                    catchIDPath: '',
                    copyPath: '',
                    confirmPath: '',
                    othersPath: []
                },
                claimedMId: '',
                imgServerUrl: '',
                thumb: []
            }
        },
        created(){
            this.claimedMId = session.getItem('claimedMId');
            let isClaimed = session.getItem('isClaimed');
            // if(!isClaimed){
            //     this.$router.replace('/management/merchant/merchant-search');
            //     return false;
            // }
            this.imgServerUrl = config.imgServerUrl + '/';
            this.getInfo();
            this.getClaim();
        },
        computed: {
            //...mapState(['claimedMId'])
        },
        components: {
            NavTitle
        },
        methods: {
            //获取服务商信息
            getInfo(){
                $api2.get('/secure/merchant/query/merchantid',{
                    merchantId: this.claimedMId
                }).then(res => {
                    this.merchantList = res.content;
                    this.merchant = res.content.merchant || {};
                    this.tele = this.merchant.telephone.split(',')[0];
                    this.phone = this.merchant.telephone.split(',')[1];
                    this.serviceTypes = this.merchantList.serviceTypes.map(item => {
                        return item.nameZh
                    }).join(', ');
                    this.portcode = this.merchantList.ports.map(item => {
                        return item.cnportname
                    }).join(', ');
                    this.merchant.thumb = JSON.parse(this.merchant.thumb || '[]');
                    if(this.merchant.thumb.length){
                      this.merchant.thumb.forEach(val => {
                        this.thumb.push(`${this.imgServerUrl}${val}`);
                    });
                    }
                }).catch(err =>{
                    console.log(err)
                })
            },
            //获取认证信息
            getClaim(){
                $api2.get('/secure/merchant/query/authentication/merchantid',{
                    merchantId: this.claimedMId
                }).then(res => {
                    if(res.status !== 1){
                        return;
                    }
                    this.claimInfo = res.content;
                    this.claimInfo.othersPath = JSON.parse(res.content.othersPath || '[]');
                    if(this.claimInfo.flag == 4){
                        this.expiredInfo();
                    }else{
                        this.canEdit = true;
                    }
                }).catch(err =>{
                    console.log(err)
                })
            },
            //点击修改
            actionTo(type){
                if(!this.canEdit){
                    this.$message.error(`${this.canEditTime}之前不能修改！`);
                    return false;
                }
                if(type == 'merchant'){
                    this.$router.push(`/management/merchant/merchant-update?mId=${this.claimedMId}&type=edit`);
                }
                if(type == 'auth'){
                    this.$router.push(`/management/merchant/authentition-update?mId=${this.claimedMId}&type=edit`);
                    session.setItem('merchant',this.merchant);
                }
            },
            //判断是否能修改信息
            expiredInfo(){
                $api2.get('/secure/merchant/expired',{
                    authId: this.claimInf.id
                }).then( res => {
                    if(res.status == 1){
                        this.canEdit = true;
                    }else{
                        this.canEdit = false;
                        this.canEditTime = res.content;
                    }
                })
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
