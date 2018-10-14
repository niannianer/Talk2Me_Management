<template>
    <div class="email-details">
        <div flex="dir:top" class="info">
           <span class="title">{{messageSend.title}}</span>
           <span>发件人：{{messageSend.sendUser}}</span>
           <span>时间：{{messageSend.sendDate}}</span>
           <span>收件人：{{receiveLs}}</span>
        </div>
        <div class="content" v-html="messageSend.content">
        </div>
        <div class="btns">
            <el-button size="small" type="danger" @click="deleteEmail">删除</el-button>
            <el-button size="small" type="success" @click="reply" v-if="showReply">回复</el-button>
        </div>
    </div>
</template>
<script>
    import $api from '../../Common/tools/api';
    import {session,local} from '../../Common/tools/store.js';
    import '../less/email-details.less';
    export default {
        name: 'email-details',
        data(){
            return {
                id:'',
                type:'',
                messageSend:'',
                receiveLs:'',
                user:'',
                boxType:null,
                showReply:false,
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.type = this.$route.query.type;
            this.user = local.getItem('userEmail');
            this.getData()
        },
        computed: {},
        methods: {
            //获取邮件信息
            getData(){
                let url = '';
                if(this.type == 'receive'){
                    //收件箱
                    url = '/user/message/receive/query/id';
                    this.boxType = 2;
                    this.showReply = true
                }else if(this.type == 'send'){
                    //发件箱
                    url = '/user/message/send/query/id';
                    this.boxType = 1
                }
                $api.get(url,{id:this.id}).then(res => {
                    if(res.status == 1){
                        this.messageSend = res.content.messageSend;
                        this.receiveLs = res.content.receiveLs.map(item => {
                            return item.receiveUser
                        }).join(',');
                    }else {
                        this.$message.warning('加载失败')
                    }
                });
            },
            //删除邮件
            deleteEmail(){
                let param = {
                    user:this.user,
                    id:this.id,
                    boxType:this.boxType
                };
                $api.get('/user/message/delete',param).then(res => {
                    if (res.status == 1){
                        this.$message.success('删除成功');
                        if(this.type == 'receive'){
                            this.$router.push('/management/email/email-receive')
                        }else if(this.type == 'send'){
                            this.$router.push('/management/email/email-send')
                        }
                    }else {
                        this.$message.error('删除失败')
                    }
                })
            },
            //回复邮件
            reply(){
                this.$router.push({
                    path: '/management/email/email-write',
                    query: {
                        user:this.messageSend.sendUser,
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
