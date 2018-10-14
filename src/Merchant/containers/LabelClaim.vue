<template>
    <div class="label-claim">
        <div flex="main:justify">
            <span><nav-title title="我的标注列表"></nav-title></span>
            <span class="statement"><img src="../images/loudspeaker.png">声明：在船队在线HiFleet平台上标注、更正、认领服务商都是<span style="color: #64c800">免费</span>的！</span>
        </div>
        <div>
            <el-scrollbar style="height: 100%">
                <div  class="my-table">
                    <el-table
                            :data="lists"
                            highlight-current-row
                            @current-change="handleCurrentChange">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="merchantName" label="名称"></el-table-column>
                        <el-table-column prop="adress" label="地址"></el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <span style="cursor: pointer" @click.stop="pathTo('update',scope.$index)">编辑</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" width="70" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.row.claim"><img src="../images/star.png" class="claim-img"></div>
                                <span v-else>未认领</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column width="76">-->
                            <!--<template slot-scope="scope">-->
                                <!--<div>选择认领</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column width="30" align="center">
                            <template slot-scope="scope">
                                <!--<div class="no-active" :class="{actived:selectInfo == scope.row}">-->
                                    <!--<span class="span1">选择认领</span>-->
                                    <!--<span class="span2"></span>-->
                                <!--</div>-->
                                <el-radio v-model="selectInfo" :label="scope.row" size="medium"></el-radio>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-scrollbar>
        </div>
        <div class="btns" flex="dir:top">
            <div class="prompt-message" flex="main:right">请选择一个标注进行认领</div>
            <div flex="main:justify">
                <button class="btn1" @click.stop="pathTo('add')">免费标注服务商</button>
                <button class="btn2" @click.stop="toClaim">{{buttonText}}</button>
            </div>
        </div>
        <div class="label">
            <div><nav-title title="标注可享"></nav-title></div>
            <div>
                <el-row>
                    <el-col :span="8" v-for="item in labelList">
                        <div class="my-col">
                            <div class="img"><img :src = item.imgSrc></div>
                            <div class="content">{{item.content}}</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="label">
            <div><nav-title title="认领可享"></nav-title></div>
            <div>
                <el-row>
                    <el-col :span="8" v-for="item in claimList">
                        <div class="my-col">
                            <div class="img"><img :src = item.imgSrc></div>
                            <div class="content">{{item.content}}</div>
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
    import {marchantText} from '../../Common/filters/index.js';
    import { Message } from 'element-ui';
    import NavTitle from '../components/nav/nav';
    import '../less/label-claim.less'
    import {session} from "../../Common/tools/store";
    export default {
        name: 'label-claim',
        data(){
            return {
                radio: '',
                showDialog: false,
                lists: [],
                sendInfo: {
                    merchantServiceTypeId: '',
                    merchantTypeId: '',
                    nameZh: '',
                    nameEn: '',
                    flag: ''
                },
                dialogTitle: '',
                buttonText: '认领我的服务',
                oldEmail:'',
                selectInfo:'',
                labelList:[
                    {imgSrc:require('../images/enjoyment/icon1.png'), content: '船队在线网站、APP、微信 海图/地图页面的显示'},
                    {imgSrc:require('../images/enjoyment/icon2.png'), content: '用户服务商搜索发现'},
                    {imgSrc:require('../images/enjoyment/icon3.png'), content: '搜周边功能搜索发现'},
                ],
                claimList:[
                    {imgSrc:require('../images/enjoyment/icon4.png'), content: '船队在线网站、APP、微信 海图/地图页面上的优先显示'},
                    {imgSrc:require('../images/enjoyment/icon5.png'), content: '用户服务商搜索推荐'},
                    {imgSrc:require('../images/enjoyment/icon6.png'), content: '搜周边功能搜索推荐'},
                    {imgSrc:require('../images/enjoyment/icon7.png'), content: '查看关注用户'},
                    {imgSrc:require('../images/enjoyment/icon8.png'), content: '营销信息发布'},
                    {imgSrc:require('../images/enjoyment/icon9.png'), content: '评价管理'},
                ],
            }
        },
        created(){
            this.oldEmail = session.getItem('oldEmail');
            this.getList();
        },
        components: {
            NavTitle
        },
        computed: {
            ...mapState(['maerchanttype','claimedMId','isClaimed','unionid'])
        },
        methods: {
            //获取标注列表
            getList(){
                $api2.get('/secure/merchant/simplelist/query/userid',{
                    userid: this.oldEmail || this.unionid
                }).then(res => {
                    this.loading = false;
                    if(res.status == 1){
                        res.content.map(item => {
                            if(item.flag){
                                if(item.flag != 0){
                                    item.claim = true
                                }
                            }else {
                                item.claim = false
                            }
                        });
                        this.lists = res.content || [];
                    }else if(res.status == 408){
                        Message({
                            type: 'error',
                            message: '加载失败～'
                        })
                    }
                })
            },
            //修改／新增 保存
            updateSave(){
                this.showDialog = false;
                $api2.post('/secure/merchant/servicetype/save' ,this.sendInfo).then(res => {
                    if(res.status == 1){
                        this.getLists()
                        this.$message.success('保存成功')
                    }else {
                        this.$message.error('保存失败')
                    }
                }).catch(err =>{
                    console.log('err2')
                });
            },
            //切换为文字类型
            getTypes(row,column) {
                let types =  row[column.property];
                return marchantText(types);
            },
            //添加服务商
            pathTo(type,index){
                if(type == 'add'){
                    this.$router.push('/management/merchant/merchant-edit');
                }else if(type == 'update'){
                    this.$router.push({
                        path: '/management/merchant/merchant-edit',
                        query: {
                            mId: this.lists[index].merchantId,
                            type: 'edit'
                        }
                    });
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
            toClaim(){
                //认领
                if(!this.mId){
                    this.$message.warning('请从“我的标注列表”中选择要认领的商家或去“我的服务”菜单中做认领');
                    return;
                }
                //用户已认领、当前选的商家不是该用户认领的商家，给提示
                if(this.isClaimed && this.mId != this.claimedMId){
                    this.$message.error('每个用户只能认领一家商户');
                    return false;
                }
                //用户已认领、当前选的商家是该用户认领的商家，进入可编辑页面
                if(this.isClaimed && this.mId == this.claimedMId){
                    this.$router.push(`/management/merchant/my-service`);
                    return false;
                }

                let message = this.info.id ? '该服务商已被认领，是否申请重新认领？' : '确认认领该服务商？';
                this.$confirm(message, '提示', {
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning'
                }).then(() => {
                  let flag = this.info.id;
                    //该商户已被认领(走重新认领)：重新提交服务商信息，传oldMerchantId
                    if(flag){
                        this.$router.push({
                            path: '/management/merchant/claim-edit',
                            query: {
                                omId: this.mId,
                                flag: 1,
                                action: 'claim',
                                type: 'edit'
                            }
                        });
                    }else{
                        //该商户未被认领(走认领)：用户可编辑当前服务商信息
                        this.$router.push({
                            path: '/management/merchant/claim-edit',
                            query: {
                                type: 'edit',
                                mId: this.mId,
                                action: 'claim'
                            }
                        });
                    }
                }).catch(() => {
                           
                });
            },
            //选择商家
            handleCurrentChange(val){
                this.info = val;
                this.selectInfo = val;
                this.mId = val.merchantId;
                if(this.info.id){
                    if(this.mId == this.claimedMId){
                        this.buttonText = '修改';
                        return;
                    }
                    this.buttonText = '重新认领服务';
                }else{
                    this.buttonText = '认领我的服务';
                }
            }
        },
        destroyed(){

        }
    }
</script>
