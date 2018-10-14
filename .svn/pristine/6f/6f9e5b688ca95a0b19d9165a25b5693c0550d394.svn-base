<template>
    <div class="authentication"  flex="dir:top">
        <div class="auth-form">
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">公司名称</label>
                    <el-input readonly v-model="info.merchant.merchantName" placeholder="公司名称"></el-input>
                </div>
                <div flex>
                    <label class="item-label">公司类型</label>
                    <el-input readonly :value="info.merchant.merchantTypeId|marchantText" placeholder="公司类型"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">服务内容</label>
                    <el-input readonly v-model="info.merchant.service" placeholder="服务内容"></el-input>
                </div>
                <div flex>
                    <label class="item-label">服务港口</label>
                    <el-input readonly v-model="portsName.join('、')" placeholder="服务港口"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">地址</label>
                    <el-input readonly v-model="info.merchant.address" placeholder="地址"></el-input>
                </div>
                <div flex>
                    <label class="item-label">服务类型</label>
                    <el-input readonly v-model="serviceTypes.join('、')"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">联系人</label>
                    <el-input readonly v-model="info.merchant.linkname" placeholder="联系人"></el-input>
                </div>
                <div flex>
                    <label class="item-label">联系方式</label>
                    <el-input readonly v-model="info.merchant.telephone" placeholder="联系方式"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">电子邮箱</label>
                    <el-input readonly v-model="info.merchant.email" placeholder="电子邮箱"></el-input>
                </div>
                <div flex>
                    <label class="item-label">确认人姓名</label>
                    <el-input readonly v-model="info.authentication.submitName" placeholder="确认人姓名"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">确认人电话</label>
                    <el-input readonly v-model="info.authentication.confirmTel" placeholder="确认人电话"></el-input>
                </div>
                <div flex v-if="false">
                    <label class="item-label">提交人姓名</label>
                    <el-input readonly v-model="info.authentication.submitName" placeholder="提交人姓名"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item" v-if="false">
                <div flex>
                    <label class="item-label">提交人电话</label>
                    <el-input readonly v-model="info.authentication.submitTel" placeholder="提交人电话"></el-input>
                </div>
            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">资质注册号（营业执照注册号或组织机构代码或其他资质编号）</label>
                <div flex-box="1">
                    <el-input readonly v-model="info.authentication.registCode" placeholder="资质注册号"></el-input>
                </div>
            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">身份证照片</label>
                <div flex-box="0" flex="cross:center" class="img-item">
                    <img :src="serverUrl+'/'+info.authentication.iDPath" v-if="info.authentication.iDPath" :class="{big:isScale1}" @click.stop="isScale1 = !isScale1"/>
                    <div v-else>无</div>
                </div>
            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">手持身份证照片</label>
                <div flex-box="0" flex="cross:center" class="img-item">
                    <img :src="serverUrl+'/'+info.authentication.catchIDPath" v-if="info.authentication.catchIDPath" :class="{big:isScale2}" @click.stop="isScale2 = !isScale2"/>
                    <div v-else>无</div>
                </div>

            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">门脸照片</label>
                <div flex-box="0" flex="cross:center" class="img-item">
                    <img :src="serverUrl+'/'+info.authentication.facePhotoPath" v-if="info.authentication.facePhotoPath" :class="{big:isScale3}" @click.stop="isScale3 = !isScale3"/>
                    <div v-else>无</div>
                </div>

            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">资质复印件</label>
                <div flex-box="0" flex="cross:center" class="img-item">
                    <img :src="serverUrl+'/'+info.authentication.copyPath" v-if="info.authentication.copyPath" :class="{big:isScale4}" @click.stop="isScale4 = !isScale4"/>
                    <div v-else>无</div>
                </div>
            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">其他材料</label>
                <div flex-box="1" flex="cross:center">
                    <div class="img-item" v-for="src,index in otherImg">
                        <img :src="serverUrl+'/'+src" v-if="src" :class="{big:isScale5}" @click.stop="isScale5 = !isScale5"/>
                    </div>
                    <div v-if="!otherImg.length">无</div>
                </div>

            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">认领确认书</label>
                <div flex-box="0" flex="cross:center" class="img-item">
                    <img :src="serverUrl+'/'+info.authentication.confirmPath" v-if="info.authentication.confirmPath" :class="{big:isScale6}" @click.stop="isScale6 = !isScale6"/>
                    <div v-else>无</div>
                </div>
                <div flex-box="0" flex="dir:top">
                    <div flex-box="1"></div>
                    <div flex-box="0">
                        <el-button type="primary" size="small">下载</el-button>
                    </div>
                </div>
            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">缩略图</label>
                <div flex-box="1" flex="cross:center">
                    <div class="img-item" v-for="src,index in thumbs">
                        <img :src="serverUrl+'/'+src" :class="{big:isScale7}" @click.stop="isScale7 = !isScale7"/>
                    </div>
                    <div v-if="!thumbs.length">无缩略图</div>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label" flex-box="0">信息状态</label>
                    <div flex-box="1">
                        <el-select readonly v-model="info.merchant.flag" placeholder="请选择信息状态">
                            <el-option label="正常"
                                       :value="1" >
                            </el-option>
                            <el-option label="失效"
                                       :value="0" >
                            </el-option>
                            <el-option label="待定"
                                       :value="2" >
                            </el-option>
                    </el-select>
                    </div>
                </div>
                <div flex>
                    <label class="item-label" flex-box="0">级别</label>
                    <div flex-box="1">
                        <el-select readonly="true" 
                        :disabled="disabledChange"
                        v-model="info.merchant.level" placeholder="请选择状态">
                            <el-option :label="item.nameZH"
                                       :value="item.value"
                                       v-for="item,index in comDatas.levels">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">审核状态</label>
                <div flex-box="0">
                    <el-select :disabled="disabledSave || disabledChange" v-model="info.authentication.flag" placeholder="请选择状态">
                        <el-option :label="item.nameZH"
                                   :value="item.value"
                                   v-for="item,index in comDatas.auditStatus">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div flex class="form-item">
                <label class="item-label" flex-box="0">说明</label>
                <div flex-box="0" class="textarea-item">
                    <el-input type="textarea" v-model="info.authentication.illustrate" placeholder="请输入说明" :disabled="disabledSave || disabledChange"></el-input>
                </div>
            </div>
            <div flex="main:center" class="form-item" v-if="!disabledSave">
                <el-button type="primary" @click.stop="auditSave">保存</el-button>
            </div>

        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import $api from '../../Common/tools/api';
    import config from '../../Common/tools/config';
    import comDatas from '../../Common/tools/comDatas';
    import '../less/authentication.less';

    export default {
        name: 'authentication',
        data(){
            return {
                comDatas,
                merchantId: '',
                info: {
                    authentication: {},
                    merchant: {},
                    ports: [],
                    serviceTypes: []
                },
                otherImg: [],
                thumbs: [],
                disabledSave: false,
                disabledChange: false,
                alertMsg: 'dsd',
                portsName: [],
                serviceTypes: [],
                isScale1:false,
                isScale2:false,
                isScale3:false,
                isScale4:false,
                isScale5:false,
                isScale6:false,
                isScale7:false
            }
        },
        components: {
        },
        created(){
            this.merchantId = this.$route.query.mId;
            this.serverUrl = config.apiUrl;
            this.getInfo();
        },
        computed: {

        },
        methods: {
            //获取商家信息
            getInfo(){
                $api.get('/secure/merchant/query/merchantall/merchantid',{
                    merchantId: this.merchantId
                }).then(res => {
                    if(res.status != 1){
                        this.$message(res.content);
                        return false;
                    }
                    let content = res.content;
                    Object.keys(content).forEach(key=>{
                        if(content.hasOwnProperty(key)){
                            this.info[key] = content[key];
                        }
                    });
                    this.otherImg = JSON.parse(this.info.authentication.othersPath || '[]');
                    this.thumbs = JSON.parse(this.info.merchant.thumb || '[]');
                    this.disabledSave = this.info.authentication.flag == 4 ? true: false;
                    this.disabledChange = this.info.authentication.merchantId ? false : true;
                
                    //港口
                    this.info.ports.map(val => {
                        this.portsName.push(val.cnportname);
                    });
                    //服务类型
                    this.info.serviceTypes.map(val => {
                        this.serviceTypes.push(val.nameZh);
                    });
                });
            },
            //保存审核信息
            auditSave(){
                if(this.info.authentication.merchantId && !this.info.authentication.flag){
                    this.$message.error('请选择审核状态');
                    return false;
                }
                $api.post('/secure/merchant/all/save',this.info).then(res => {
                    if(res.status == 500){
                        this.$message.error('服务器异常');
                        return;
                    }else if(res.status != 1){
                        this.$message.error('提交失败，请稍后再试');
                        return;
                    }
                    if(res.status){
                        this.$message.success('提交成功');
                        setTimeout(()=>{
                            this.$router.push('/management/menus/merchant-list');
                        },1000);
                    }
                });
            },
        },
        destroyed(){

        }
    }
</script>
<style scoped>
    img{
        transition: all linear .5s;
        transform: scale(1);
    }
    .big{
        transform: scale(4);
        position: relative;
        left: 225px;
        z-index: 100;
    }
</style>
