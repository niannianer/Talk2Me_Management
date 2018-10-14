<template>
    <div class="merchant-edit" flex="dir:top">
        <div class="mert-edit-form">
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">
                        <span class="must">服务商名称</span>
                    </label>
                    <el-input v-model="info.merchantName" placeholder="服务商名称" :disabled="showAudit"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">服务商类型</label>
                    <div flex-box="1" flex>
                        <el-select v-model="info.merchantTypeId"
                                   placeholder="请选择服务商类型"
                                   @change="getCompanyTypeList(info.merchantTypeId)" :disabled="showAudit">
                            <el-option label="个人" :value="1"></el-option>
                            <el-option label="企业" :value="2"></el-option>
                            <el-option label="机构" :value="3"></el-option>
                        </el-select>
                    </div>
                </div>
                <div flex>
                    <label class="item-label">服务类型</label>
                    <el-select v-model="merchantTypeIdArr" multiple
                               :multiple-limit="5"
                               placeholder="请选择服务类型" :disabled="showAudit" >
                        <el-option
                                v-for="item in companyTypeList"
                                :key="item.merchantServiceTypeId"
                                :label="item.nameZh"
                                :value="item.merchantServiceTypeId" >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">提供的服务</label>
                    <el-input type="textarea" v-model="info.service" placeholder="请输入提供的服务" :disabled="showAudit" ></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label flex-box="0" class="item-label">服务港口</label>
                    <div flex-box="1" class="edit-item" @click.stop="showPort=true" :class="{unshow:showAudit}"></div>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">联系人</label>
                    <el-input v-model="info.linkname" placeholder="联系人" :disabled="showAudit"></el-input>
                </div>
                <div flex>
                    <label class="item-label">座机号</label>
                    <el-input v-model="seatphone" placeholder="座机号" :disabled="showAudit"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">手机号</label>
                    <el-input v-model="telephone" placeholder="手机号" :disabled="showAudit"></el-input>
                </div>
                <div flex>
                    <label class="item-label">电子邮箱</label>
                    <el-input v-model="info.email" placeholder="电子邮箱" :disabled="showAudit"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">
                        <span class="must">地址</span>
                    </label>
                    <el-input :disabled="isEdit" v-model="info.address" placeholder="地址" @keyup.native="getPoint"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">经度</label>
                    <el-input v-model="info.lon" placeholder="经度" :disabled="showAudit"></el-input>
                </div>
                <div flex>
                    <label class="item-label">纬度</label>
                    <el-input v-model="info.lat" placeholder="纬度" :disabled="showAudit"></el-input>
                </div>
            </div>
            <div flex="dir:top" class="form-item">
                <label class="item-label2" flex-box="0">服务商家及产品的图片或文件</label>
                <div flex-box="1" flex="cross:center" class="upload-box">
                    <el-upload
                            class="upload-inner"
                            :limit="imageMax"
                            :action="imgUploadUrl"
                            :on-remove="handleRemove"
                            :on-success="imageuploaded"
                            :on-error="imgError"
                            :file-list="thumbUrl"
                            :on-exceed="handleExceed"
                            :before-upload="beforeAvatarUpload"
                            list-type="picture"
                            :disabled="showAudit">
                        <el-button size="small" type="primary" :disabled="showAudit">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">上传图片每张不能超过10M，最多3张</div>
                    </el-upload>
                </div>
            </div>
            <div flex class="form-item" v-if="showAudit">
                <label class="item-label">审核状态</label>
                <div flex-box="1" flex>
                    <el-select v-model="verifyStatus"
                               placeholder="请选择审核状态">
                        <el-option label="待审核" :value="0" disabled></el-option>
                        <el-option label="审核不通过" :value="1"></el-option>
                        <el-option label="审核通过" :value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <div flex="main:center" class="form-item" >
                <el-button type="primary" @click.stop="save">保存</el-button>
            </div>
        </div>
        <!--港口弹框-->
        <port-select :show.sync="showPort" @confirmBack="callBack"></port-select>
    </div>
</template>

<script>
    import $api from '../../Common/tools/api.js';
    import config from '../../Common/tools/config.js';
    import {mapState} from 'vuex';
    import PortSelect from '../../Common/components/PortSelect/PortSelect';
    import {local} from '../../Common/tools/store.js';
    import '../less/merchant-edit.less';
    const defaultImg = require('../images/logo.png');
    export default {
        name: 'merchant-edit',
        data(){
            return {
                defaultImg,
                showPort: false,
                timeout: false,
                maxSize: 10,
                info: {
                    flag: 1,
                    level: 1,
                    thumb: [],
                    lon: '',
                    lat: '',
                },
                ports: [],
                thumbUrl: [],
                uploadParams: {},
                companyTypeList: [],
                merchantTypeIdArr: [],
                telephone: '',
                seatphone: '',
                mapGeo: '',
                mapTimer: null,
                serverUrl: config.apiUrl,//API地址
                imgServerUrl: config.imgServerUrl,//图片地址路径
                mId: '',
                isEdit: false,
                resm: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,//手机号码正则
                resc: /^0\d{2,3}-?\d{7,8}$/,//电话号码正则
                keyUpTime: null,
                imgUploadUrl: '',
                imageMax: 3,
                //可审核
                showAudit:false,
                verifier: '',
                verifyStatus: 0
            }
        },
        created(){
            let userEmail = local.getItem('userEmail');
            this.verifier = userEmail;
            this.imgUploadUrl = `${this.serverUrl}/secure/merchant/fileUpload?userId=${userEmail}`
            let query = this.$route.query;
            this.mId = query.mId || '';
            this.type = query.type || 'add';
            this.isEdit = this.type == 'edit' || this.type == 'audit';
            if(this.isEdit){
                this.getInfo();
            }
            if(this.type == 'audit'){
                this.showAudit = true
            }
        },
        components: {
            PortSelect
        },
        computed: {
            ...mapState(['userEmail'])
        },
        methods: {
            //获取商家标注信息
            getInfo(){
                $api.get('/secure/merchant/query/merchantid',{merchantId: this.mId}).then( res => {
                    if(res.status != 1){
                        this.$message.error('加载失败');
                        return;
                    }
                    let content = res.content;
                    this.info = content.merchant || {};
                    this.info.thumb = JSON.parse(this.info.thumb || '[]');
                    //手机号、作记号
                    let phoneNumber = (this.info.telephone || '').split(',');
                    if(phoneNumber.length && this.resm.test(phoneNumber[0])){
                        this.telephone = phoneNumber[0];
                        this.seatphone = phoneNumber[1];
                    }
                    if(phoneNumber.length && this.resm.test(phoneNumber[1])){
                        this.telephone = phoneNumber[1];
                        this.seatphone = phoneNumber[0];
                    }
                    //根据服务商类型加载服务类型列表
                    this.getCompanyTypeList(this.info.merchantTypeId);
                    //服务类型
                    let merchantServiceType = content.serviceTypes || [];
                    merchantServiceType.map(val => {
                        this.merchantTypeIdArr.push(val.merchantServiceTypeId);
                    });
                    //港口信息
                    this.ports = content.ports || [];
                    //加载地图
                    //EventBus.$emit('initLoad',this.info.address);
                    this.info.thumb.forEach(val => {
                        this.thumbUrl.push({
                            name: val.split('/')[1],
                            url:`${this.imgServerUrl}/${val}`,
                            urlShort: val});
                    });
                })
            },
            //获取服务类型
            getCompanyTypeList(val){
                if(!val){
                    return;
                }
                this.merchantTypeIdArr = [];
                $api.get('/secure/merchant/servicetype/querylist',{merchantTypeId:val}).then(res => {
                    if(res.status == 1){
                        this.companyTypeList = res.content || [];
                    }
                });
            },
            //提交
            save(){
                if(!this.checkWord()){
                    return;
                }
                this.info.serviceTypeId = this.merchantTypeIdArr.join(',');
                this.info.userUnionId = this.info.userUnionId || this.userEmail;
                if(this.isEdit){
                    this.saveApi();
                    return false;
                }
                let promiseArr = [];
                this.checkAddress().then(result=>{
                    if(result == 3){
                        return;
                    }
                    this.saveApi();
                });
                // this.getPoint().then((rlt)=>{
                //     if(rlt == 3){
                //         return;
                //     }
                //     this.checkAddress().then(result=>{
                //         if(result == 3){
                //             return;ß
                //         }
                //         this.saveApi();
                //     });
                // })
            },
            //判断地址是否占用
            checkAddress(){
                return new Promise((resolve,reject)=>{
                    $api.get('/secure/merchant/verifyaddress',{
                        address: this.info.address,
                        lat: this.info.lat || '',
                        lon: this.info.lon || ''
                    }).then(res => {
                        if(res.status == 1){
                            resolve (1);
                        }else{
                            this.$message.error('该地址已被占用');
                            resolve (3);
                        }
                    }).catch( error => {
                        console.log(error)
                    })
                })
            },
            //商家信息提交调用API
            saveApi(){
                if(this.showAudit){
                    this.info.verifier = this.verifier;
                    this.info.verifyStatus = this.verifyStatus;
                }
                $api.post('/secure/merchant/save',this.info).then(res => {
                    if(res.status == 1){
                        this.$message.success('提交成功！');
                        if(this.showAudit){
                            this.$router.replace('/management/menus/merchant-audit');
                        }else {
                            this.$router.replace('/management/menus/merchant-list');
                        }
                    }else{
                        this.$message.error('提交失败,请稍后再试！');
                    }
                });
            },
            //删除图片
            handleRemove(file, fileList) {
                this.thumbUrl = [];
                this.info.thumb = [];
                fileList.forEach(item => {
                    this.thumbUrl.push({
                        name: item.name,
                        url: item.url,
                        urlShort: item.urlShort
                    });
                    this.info.thumb.push(item.urlShort);
                });
            },
            //数量超过限制
            handleExceed(file, fileList){
                this.$message.error(`当前限制最多上传${this.imageMax}张图片！`);
            },
            //上传之前
            beforeAvatarUpload(file) {
                //const isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
                const isLt2M = file.size / 1024 / 1024 <= 10;
                // if (!isJPG) {
                //   this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isLt2M;
            },
            //上传图片
            imageuploaded(res, file, fileList){
                if(res.status == 1){
                    this.thumbUrl.push({name: file.name,url:`${this.imgServerUrl}/${res.content}`,urlShort: res.content});
                    this.info.thumb.push(res.content);
                }
            },
            imgError(){
                this.$message.error('上传图片失败！');
            },
            //校验
            checkWord(){
                let {telephone, seatphone} = this;
                //邮箱正则
                let resg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

                if(!this.info.merchantName){
                    this.$message.warning('请输入服务商名称');
                    return false;
                }else if(!this.info.address){
                    this.$message.warning('请输入地址');
                    return false;
                }else if(seatphone && !this.resc.test(seatphone)){
                    this.$message.warning('请输入正确的座机号');
                    return false;
                }else if(telephone && !this.resm.test(telephone)){
                    this.$message.warning('请输入正确的手机号');
                    return false;
                }else if (this.info.email && !resg.test(this.info.email)){
                    this.$message.warning('请输入正确的邮箱');
                    return false;
                }
                if(!telephone && !seatphone){
                    this.info.telephone = '';
                }else if(telephone && !seatphone){
                    this.info.telephone = telephone;
                }else if(!telephone && seatphone){
                    this.info.telephone = seatphone;
                }else{
                    this.info.telephone = seatphone + ','+telephone;
                }
                return true;

            },
            getPoint(){
                let _that = this;
                if(this.keyUpTime){
                    clearTimeout(this.keyUpTime);
                }
                this.keyUpTime = setTimeout(()=>{
                    console.log(222)
                    if(this.BMap != undefined){
                        this.mapGeo = new this.BMap.Geocoder();
                    }
                    if(!this.mapGeo){
                        this.timeout = setTimeout(()=>{
                            this.getPoint();
                        },500);
                    }else{
                        clearTimeout(this.timeout);
                        if(!_that.info.address){
                            _that.info.lon = '';
                            _that.info.lat = '';
                        }
                        _that.mapGeo.getPoint(_that.info.address, function (point) {
                            if(!point){
                                _that.$message.warning('该地址验证失败，请输入经纬度！');
                                _that.info.lon = '';
                                _that.info.lat = '';
                            }else{
                                point = point || {};
                                _that.info.lon = point.lng;
                                _that.info.lat = point.lat;
                            }

                        }, "全国")
                    }
                },500)

            },
            getMapGeo(){
                this.mapTimer = setTimeout(()=>{
                    if(!this.mapGeo && this.BMap && this.BMap.Geocoder){
                        clearTimeout(this.mapTimer);
                        this.mapGeo = new this.BMap.Geocoder();
                    }else{
                        this.getMapGeo();
                    }
                },150);
            },
            callBack(retult){
                console.log(retult)
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getMapGeo();
            });
        },
        destroyed(){

        }
    }
</script>
