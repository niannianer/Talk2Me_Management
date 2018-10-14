<template>
    <div class="comment-list" flex="dir:top">
        <div>
            <div flex="main:justify">
                <div flex>
                    <nav-title title="总体评价"></nav-title>
                    <span class="my-star">
                        <el-rate
                                v-model="starNumber"
                                disabled
                                text-color="#ff9900">
                        </el-rate>
                    </span>
                </div>
                <div class="comment-btn">
                    <el-button-group>
                        <el-button :class="{activate:level == 'all'}" @click.stop = "searchData('all')">全部</el-button>
                        <el-button :class="{activate:level == 'good'}" @click.stop = "searchData('good')">好评</el-button>
                        <el-button :class="{activate:level == 'bad'}" @click.stop = "searchData('bad')">差评</el-button>
                    </el-button-group>
                </div>
            </div>
        </div>
        <div class="comment-wrap">
            <div class="comments" v-for="item,iindex in content">
                <div class="lists">
                    <!--<div flex-box="0"><img :src="item.comment.headimgurl || defaultImg"></div>-->
                    <div>
                        <div flex="main:justify">
                            <div class="name" flex>
                                <span>{{item.comment.nickname || '游客'}}</span>
                                <span class="star">
                                    <el-rate
                                            v-model="item.comment.starNumber"
                                            disabled
                                            text-color="#ff9900">
                                    </el-rate>
                                </span>
                            </div>
                            <div class="time">{{item.comment.submitDate|timeFormater('yyyy-MM-dd hh:mm')}}</div>
                        </div>
                        <div class="bottom">
                            <p>{{item.comment.content}}</p>
                        </div>
                    </div>
                </div>
                <!--追评和回复区-->
            <div class="reply-list">
                <div>
                    <ul v-if="item.userComment.length">
                        <li v-for="reply,index in item.userComment" :key="index" flex>
                            <div flex-box="1" flex v-show="reply.userType == 'merchant'" class="reply">
                                <div flex-box="0">我：</div>
                                <div flex-box="1">{{reply.comment}}</div>
                            </div>
                            <div flex-box="1" flex v-show="reply.userType != 'merchant'" style="margin-top: 5px">
                                <div flex-box="0">追评：</div>
                                <div flex-box="1">{{reply.comment}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="btn">
                    <div v-if="item.review" class="review-wrap" flex>
                        <input :placeholder="textPlace" class="review-text" flex-box="1" v-model="writeText"></input>
                        <div flex="dir:right cross:center" class="review-btn" flex-box="0">
                            <button @click.stop="addComment(item,iindex)">提交</button>
                            <button @click.stop="item.review=false">取消</button>
                        </div>
                    </div>
                    <button flex="cross:center"
                            v-if="!item.review && userType == 'user' && item.comment.unionid == unionid"
                            @click.stop="review(item,iindex)" >
                        追评
                    </button>
                    <button flex="cross:center"
                            v-if="!item.review && userType == 'merchant'"
                            @click.stop="review(item,iindex)">
                        回复
                    </button>
                </div>
            </div>
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
        <empty-show v-if="!loading && !content.length"></empty-show>
    </div>
</template>

<script>
    import Vue from 'vue';
    import $api2 from '../../Common/tools/api2';
    import {mapState} from 'vuex';
    import '../less/comment-list.less';
    import NavTitle from '../components/nav/nav';
    import {session} from '../../Common/tools/store';
    import EmptyShow from '../../Common/components/EmptyShow/EmptyShow';
    const defaultImg = require('../images/head.png');

    export default {
        name: 'comment-list',
        data(){
            return {
                defaultImg,
                search:'',
                merchantId:'',
                //绑定类
                content:[],
                lists: [],
                level: 'all',
                loading: true,
                userType: '',
                writeText: '',
                textPlace: '',
                btnText: '',
                navTitle: '',
                totals: 0,
                starNumber: 0,
            }
        },
        created(){
            this.userType = this.$route.query.userType || 'merchant';
            this.textPlace = this.userType == 'merchant' ? '请输入回复内容' : '请输入追评内容';
            this.btnText = this.userType == 'merchant' ? '回复' : '追评';
            this.merchantId = this.$route.query.mId;
            
            this.getStartNumber();
        },
        components: {
            EmptyShow,NavTitle
        },
        computed: {
            ...mapState(['unionid','claimedMId'])
        },
        methods: {
            //获取评论
            getComments(type){
                console.log(2);
                // if(!this.claimedMId){
                //     return;
                // }
                const loading = this.$loading({
                    target: document.querySelector('.comment-list'),
                    // background:'#fff'
                });
                let param = {
                    merchantId: this.claimedMId || session.getItem('claimedMId')
                };
                if(type == 'search' && this.level != 'all'){
                    param.remark = this.level == 'good' ? 1 : 0;
                }
                $api2.get('/secure/merchant/commemts/query',param).then(res => {
                    loading.close();
                    this.loading = false;
                    if(res.status == 1){
                        this.content = this.formatData(res.content);
                        console.log('content   ' + this.content)
                        this.lists = this.content;
                    }else if(res.status == 408){
                        this.$message.error('加载失败～');
                    }
                });
            },
            //追评和回复
            review(item){
                //从服务商入口评论管理进入可做回复，从地图页面进入，可对自己评论的做追评
                item.review = true;
            },
            //追评或回复
            addComment(item,index){
                let userType = this.userType == 'merchant' ? 'merchant' : 'user';
                if(!this.writeText.length){
                    this.$message.warning('请输入内容');
                    return false;
                }
                //用户回复
                let param = {
                    userType: userType,
                    merchantId: this.claimedMId || session.getItem('claimedMId'),
                    userUinonid: this.unionid,
                    content: this.writeText,
                    starNumber: item.comment.starNumber,
                    item: item.comment.item
                };
                $api2.post('/secure/merchant/comment/save',param).then(res => {
                    if(res.status == 1){
                        this.$message.success('评价成功');
                        this.getComments();
                    }else {
                        this.$message.error('评价失败');
                    }
                    this.writeText = '';
                })
            },
            formatData(datas){
                let result = [];
                let itemArr = [];
                datas.map((val)=>{
                    let item = val.comment.item;
                    let index = itemArr.indexOf(item);
                    let reply = val.user || {};
                    reply.submitDate = val.comment.submitDate;
                    reply.comment = val.comment.content;
                    reply.userType = val.comment.userType;

                    if(index < 0){
                        //评价信息comment
                        let data = {userComment: []};
                        data.comment = val.comment;
                        val.user = val.user || {};
                        data.comment.headimgurl = val.user.headimgurl;
                        data.comment.nickname = val.user.nickname;
                        data.comment.unionid = val.user.unionid;
                        data.review = false;
                        //data.userComment.push(reply);
                        itemArr.push(item);
                        result.push(data);
                    }else{
                        //回复和追评userComment数组
                        result[index].userComment.push(reply);
                    }
                });
                return result;
            },
            //获取总体评价
            getStartNumber(){
                $api2.get('/secure/merchant/stargrade/query',{
                    merchantId: this.claimedMId || session.getItem('claimedMId')
                }).then(res => {
                    if(res.status == 1){
                        this.starNumber = res.content.starNumber || 0;
                    }else {
                        this.$message.error('获取失败');
                    }
                })
            },
            //跳转到写评论
            writeComment(){
                //this.$router.push(`/wx/map/write-comment?merchantId=${this.merchantId}`);
            },
            //筛选数据
            searchData(level) {
                this.level = level;
                this.content = [];
                this.loading = true;
                this.getComments('search');
            }
        },
        mounted(){
            this.getComments();
        },
        destroyed(){

        }
    }
</script>
