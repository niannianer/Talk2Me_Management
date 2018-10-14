<template>
    <div class="facilitator-comment">
        <div class="img">
            <img src="../images/1533612537.png">
        </div>
        <div flex>
            <div class="comment">
                <div class="name">{{merchant.merchantName}}</div>
                <div class="star" flex>
                    <span>评分：</span>
                    <el-rate
                            v-model="starNumber"
                            show-text
                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                    </el-rate>
                </div>
                <div class="text">
                    <textarea class="text-box" placeholder="请输入您的评价" v-model="writeText"></textarea>
                    <div flex="main:right">
                        <p v-show="!writeText">请输入至少15字</p>
                        <p v-show="writeText">您已经输入{{textLength}}字</p>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" @click.stop="save">提交评价</el-button>
                </div>
            </div>
            <div class="info">
                <div class="name">{{merchant.merchantName}}</div>
                <div>
                    <el-rate
                            v-model="star"
                            disabled>
                    </el-rate>
                </div>
                <div>{{merchant.address}}</div>
                <div>{{merchant.service}}</div>
                <div>{{merchant.telephone}}</div>
                <div>{{content.serviceType}}</div>
            </div>
        </div>
        <div class="foot">
            <p class="p1"><a href="http://wpa.qq.com/msgrd?v=3&uin=2931491585&site=qq&menu=yes" target="_blank">客服：QQ2931491585</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电话：+86 21-20956899(技术支持) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   邮箱: support@hifleet.com</p>
            <p class="p2">&copy; 2013 hiFleet.com. 版权所有&nbsp;&nbsp;&nbsp;&nbsp;MADE IN CHINA&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://www.miibeian.gov.cn/">备案号：沪ICP备14001702号-2</a></p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import $api2 from '../../Common/tools/api2';
    import config from '../../Common/tools/config';
    import {session} from "../../Common/tools/store";
    import '../less/facilitator-comment.less';

    export default {
        name: 'facilitator-comment',
        data(){
            return {
                content:{},
                merchant:{},
                merchantId: '',
                imgServerUrl: '',
                starNumber: 0,
                star: 0,
                writeText: '',
                userEmail: '',
            }
        },
        created(){
            this.merchantId = this.$route.query.merchantId;
            this.userEmail = session.getItem('oldEmail');
            this.imgServerUrl = config.imgServerUrl;
            this.getMerchants();
        },
        components: {
        },
        computed: {
            //计算评论字数
            textLength(){
                return this.writeText.trim().split('').length
            }
        },
        methods: {
            //获取商家信息
            getMerchants(){
                $api2.get('/secure/merchant/simplelist/query/merchantid',{merchantId:this.merchantId}).then(res => {
                    if(res.status == 1){
                        this.content = res.content;
                        this.merchant = this.content.merchant;
                        this.star = this.content.starNumber;
                    }
                });
            },
            //提交评价
            save(){
                $api2.post('/secure/merchant/comment/save',
                    {
                        userType: 'user',
                        merchantId: this.merchantId,
                        userEmail:this.userEmail,
                        content:this.writeText,
                        starNumber:this.starNumber
                    }).then(res => {
                    if(res.status == 1){
                        this.$message.success('评价成功');
                    }else {
                        this.$message.error('评价失败');
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
