<template>
    <div class="contact-us">
        <nav-title title="合作方式"></nav-title>
        <div class="service">
            <el-row :gutter="30">
                <el-col :span="12" class="my-col" v-for="item in serviceList">
                    <div flex>
                        <div class="img"><img :src = item.imgSrc></div>
                        <div>
                            <div class="title">{{item.title}}</div>
                            <div class="content">{{item.content}}</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="message">
            <nav-title title="合作意向信息提交"></nav-title>
            <div flex="box:mean">
                <div flex class="inputs">
                    <span class="name">姓名：</span>
                    <span><el-input size="small" v-model="linkname"></el-input></span>
                </div>
                <div flex class="inputs">
                    <span class="name">公司名称：</span>
                    <span><el-input size="small" v-model="company"></el-input></span>
                </div>
            </div>
            <div flex="box:mean">
                <div flex class="inputs">
                    <span class="name">电子邮件：</span>
                    <span><el-input size="small" v-model="email"></el-input></span>
                </div>
                <div flex class="inputs">
                    <span class="name">联系电话：</span>
                    <span><el-input size="small" v-model="telephone"></el-input></span>
                </div>
            </div>
            <div>
                <p class="text">具体合作意向</p>
                <textarea class="text-box" v-model="content"></textarea>
            </div>
            <div class="btn">
                <button @click="postInfo" class="my-btn">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import $api2 from '../../Common/tools/api2';
    import NavTitle from '../components/nav/nav';
    import {mapState} from 'vuex';
    import '../less/contact-us.less'
    import {session} from "../../Common/tools/store";
    export default {
        name: "contact-us",
        data(){
            return{
                content:'',
                linkname:'',
                company:'',
                email:'',
                telephone:'',
                serviceList: [
                    {title:'服务商地图显示', imgSrc:require('../images/contact/icon1.png'), content: '在海图/地图一定比例尺反击显示服务商户信息，向全平台用户展示，达到广告效应。'},
                    {title:'服务商评价管理', imgSrc:require('../images/contact/icon2.png'), content: '认证服务商开放可供用户评价，良好的客户口碑将是服务商服务质量和实力的最好体现。'},
                    {title:'优质服务商推荐', imgSrc:require('../images/contact/icon3.png'), content: '对服务商的信息完善度、资质实力、用户评价等信息综合画像，根据船东、船厂等需求推荐服务。'},
                    {title:'精准用户营销', imgSrc:require('../images/contact/icon4.png'), content: '根据客户需要，定向对特定用户人群推送有效信息'},
                    {title:'用户搜索 服务推荐', imgSrc:require('../images/contact/icon5.png'), content: '平台“搜周边”等搜索功能，在用户搜索结果列表中优先推荐合作的优质服务商。'},
                    {title:'产品代理', imgSrc:require('../images/contact/icon6.png'), content: '合作代理服务商产品及服务，在船队在线的网站、APP、微信等客户端进行代理销售。'},
                ]
            }
        },
        created(){

        },
        components:{
            NavTitle
        },
        computed: {
            ...mapState(['unionid'])
        },
        methods:{
            //提交
            postInfo(){
                //邮箱正则
                let resg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                //手机号码正则
                let resm = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                //电话号码正则
                let resc = /^0\d{2,3}-?\d{7,8}$/;
                let param = {};
                let oldEmail = session.getItem('oldEmail');
                param.userId = this.unionid || oldEmail;
                if (this.linkname){
                    param.linkname = this.linkname
                }else {
                    this.$message.warning('请输入姓名');
                    return false
                }
                if (this.company){
                    param.company = this.company
                }else {
                    this.$message.warning('请输入公司名称');
                    return false
                }
                if(this.email == ''){
                    this.$message.warning('请输入电子邮箱');
                    return false
                } else if(!resg.test(this.email)){
                    this.$message.warning('请输入正确的电子邮箱');
                    return false
                }else {
                    param.email = this.email
                }
                if(this.telephone == '') {
                    this.$message.warning('请输入联系电话');
                    return false
                }/*else if(!resm.test(this.telephone) && !resc.test(this.telephone)){
                    this.$message.warning('请输入正确的联系电话');
                    return false
                } */else {
                    param.telephone = this.telephone
                }
                if (this.content){
                    param.content = this.content
                }else {
                    this.$message.warning('请输入合作意向');
                    return false
                }

                $api2.post('/user/cooperationintention/save',param).then(res => {
                    if(res.status == 1){
                        this.$message.success('提交成功')
                    }else {
                        this.$message.error('提交失败，请重新提交')
                    }
                })
            },
        }
    }
</script>