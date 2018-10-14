<template>
    <div class="facilitator-details">
        <!--<div class="back" @click.stop = 'goBack'>-->
            <!--<span><</span>-->
            <!--<span>返回搜索列表</span>-->
        <!--</div>-->
        <div class="title" flex="main:justify">
            <span class="name">{{merchant.merchantName}}</span>
            <span v-if="merchant.flag == 4"><img src="../images/certified@2x.png"></span>
            <span v-else><img src="../images/uncertified@2x.png"></span>
        </div>
        <div flex="box:mean" class="function">
            <span v-show="showAttention" @click.stop="cancelAttention"><img src="../images/favor_fill.png">取消关注</span>
            <span v-show="!showAttention" @click.stop="attention"><img src="../images/favor.png">关注</span>
            <span v-if="showClaim" @click.stop="toClaim"><img src="../images/claim-fill.png">认领</span>
            <span v-else @click.stop="toClaim"><img src="../images/claim.png">认领</span>
            <span @click="toComment"><img src="../images/write.png">评价</span>
        </div>
        <div class="info">
            <div v-if="merchant.address">
                <img src="../images/location.png">
                <span>{{merchant.address}}</span>
            </div>
            <div v-if="merchant.linkname">
                <img src="../images/profile.png">
                <span>{{merchant.linkname}}&nbsp{{merchant.telephone}}</span>
            </div>
            <div v-if="merchant.email">
                <img src="../images/email.png">
                <span>{{merchant.email}}</span>
            </div>
            <div v-if="merchant.serviceType">
                <img src="../images/service.png">
                <span>{{content.serviceType}}</span>
            </div>
            <div v-if="merchant.portcode">
                <img src="../images/port.png">
                <span>{{merchant.portcode}}</span>
            </div>
            <div>
                <div class="menus">服务&产品</div>
                <div>{{this.merchant.service || '未上传'}}</div>
                <div v-if="thumb.length">
                    <el-carousel :interval="4000" type="card" height="210px" style="margin: 0 auto">
                        <el-carousel-item v-for="item in thumb" :key="item" style="margin: 0 auto">
                            <div class="product-img"><img :src="imgServerUrl+'/'+item"></div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div>
                <div flex="main:justify" @click.stop="showComment = !showComment">
                    <div flex>
                        <div class="menus">客户评价</div>
                        <div class="star-number">
                            <div class="star" flex>
                                    <ul flex>
                                        <li v-if="starNumber" v-for="n,sn in starNumber" :key="sn">
                                            <img src="../images/star_orange@2x.png">
                                        </li>
                                    </ul>
                                    <ul flex>
                                        <li v-if="starNumber !== 5" v-for="n in (5 - starNumber)">
                                            <img src="../images/star_gray@2x.png">
                                        </li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div>
                        <span v-show="showComment"><i class="el-icon-arrow-down"></i></span>
                        <span v-show="!showComment"><i class="el-icon-arrow-right"></i></span>
                    </div>
                </div>
                <div v-show="showComment">
                    <div v-if="commentList.length">
                        <div class="comment-list" flex v-for="(item,index) in commentList">
                            <div class="left" flex-box="0">
                                <img :src="item.user.headimgurl || defaultImg" alt="头像">
                            </div>
                            <div class="right" flex-box="1">
                                <div flex class="user-info">
                                    <div flex-box="1">{{item.user.nickname || '游客'}}</div>
                                    <div class="time" flex-box="0">{{item.comment.submitDate|timeFormater('yyyy-MM-dd hh:mm')}}</div>
                                </div>

                                <div class="star" flex>
                                    <ul flex>
                                        <li v-if="item.comment.starNumber" v-for="n,sn in item.comment.starNumber" :key="sn">
                                            <img src="../images/star_orange@2x.png">
                                        </li>
                                    </ul>
                                    <ul flex>
                                        <li v-if="item.comment.starNumber !== 5" v-for="n in (5 - item.comment.starNumber)">
                                            <img src="../images/star_gray@2x.png">
                                        </li>
                                    </ul>
                                </div>
                                <p>{{item.comment.content}}</p>
                            </div>
                        </div>
                    </div>
                    <div v-else style="text-align: center">暂无评论</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import $api2 from '../../Common/tools/api2';
    import config from '../../Common/tools/config';
    import {mapState} from 'vuex';
    import '../less/facilitator-details.less';
    const defaultImg = require('../images/head.png');

    export default {
        name: 'facilitator-details',
        data(){
            return {
                defaultImg,
                showComment:false,//显示评论
                content:{},
                merchant:{},
                thumb:[],
                merchantId: '',
                imgServerUrl: '',
                commentList: [],
                starNumber: 0,
                id: '',
                showAttention:false,//是否关注
                showClaim:false,//是否认领
            }
        },
        created(){
            let query = this.$route.query;
            this.merchantId = query.merchantId;
            this.userEmail = query.email;
            this.password = query.password;
            this.imgServerUrl = config.imgServerUrl;
            this.getMerchants();
            this.getComments();
        },
        components: {
        },
        computed: {
            ...mapState(['isClaimed','claimedMId'])
        },
        methods: {
            //获取商家信息
            getMerchants(){
                $api2.get('/secure/merchant/simplelist/query/merchantid',{merchantId:this.merchantId,userId:this.userEmail}).then(res => {
                    if(res.status == 1){
                        this.content = res.content;
                        this.merchant = this.content.merchant;
                        this.starNumber = this.content.starNumber;
                        if(this.content.merchant.thumb){
                            this.thumb = JSON.parse(this.content.merchant.thumb);
                        }
                        this.id = this.content.attentionId;
                        //是否关注
                        if(this.content.attentionId){
                            this.showAttention = true
                        }else {
                            this.showAttention = false
                        }
                        //该商家是否被认领
                        if(this.content.merchant.flag == 0){
                            this.showClaim = false
                        }else {
                            this.showClaim = true;
                        }
                    }
                }).catch(err => {
                    console.log('err  ' + err)
                });
            },
            //获取评论
            getComments(){
                $api2.get('/secure/merchant/commemts/query',{merchantId:this.merchantId}).then(res => {
                    if(res.status == 1){
                        this.commentList = res.content.map(item => {
                            if(!item.user){
                                item.user = {
                                    city:'',
                                    headimgurl:'',
                                    nickname:'',
                                    province:'',
                                    unionid:'',
                                }
                            }
                            return item
                        });
                    }
                });
            },
            //跳转到评论
            toComment(){
                if(this.showClaim){
                    window.open(`http://test.hifleet.com/management/merchant/facilitator-comment?merchantId=${this.merchantId}`);
                }else {
                    this.$message.warning('未认领的服务商不能评价')
                }
            },
            //关注
            attention(){
                $api2.post('/secure/merchant/attention/save',
                    {
                        userEmail: this.userEmail,
                        merchantId: this.merchantId,
                    }).then(res => {
                    if(res.status){
                        this.focusTime = res.content.focusTime;
                        this.id = res.content.id;
                        this.showAttention = true;
                    }
                })
            },
            //取消关注
            cancelAttention(){
                $api2.post('/secure/merchant/attention/save',
                    {
                        id: this.id,
                        userEmail: this.userEmail,
                        merchantId: this.merchantId,
                        focusTime: this.focusTime,
                    }).then(res => {
                    if(res.status){
                        this.showAttention = false;
                    }
                })
            },
            //跳转到认领
            toClaim(){
                if(this.isClaimed && this.claimedMId != this.merchantId){
                    this.$message.warning('您已认领过服务商，每个用户只能认领一个服务商')
                }
                // else{
                //     this.$message.warning('请到服务商中心认领服务商')
                //     //top.location.href =`http://test.hifleet.com/merchantEntrance.html?merchantId=${this.merchantId}&toUrl=claim-edit`;
                // }
                else if(this.showClaim){
                    //认领已被认领的服务商
                    top.location.href =`http://test.hifleet.com/merchantEntrance.html?merchantId=${this.merchantId}&toUrl=claim-old`;
                }else {
                    top.location.href =`http://test.hifleet.com/merchantEntrance.html?merchantId=${this.merchantId}&toUrl=claim-edit`;
                }
            },
            //返回到搜索列表
            goBack(){
                window.parent.history.go(-1)
            }
        },
        destroyed(){

        }
    }
</script>
