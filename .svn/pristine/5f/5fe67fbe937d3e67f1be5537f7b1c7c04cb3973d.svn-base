<template>
    <div class="port-particulars"  flex="dir:top">
        <div class="auth-form">
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">id</label>
                    <el-input readonly v-model="info.port.id" placeholder="id"></el-input>
                </div>
                <div flex>
                    <label class="item-label">an</label>
                    <el-input readonly :value="info.port.an" placeholder="an"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">locode</label>
                    <el-input readonly v-model="info.port.locode" placeholder="locode"></el-input>
                </div>
                <div flex>
                    <label class="item-label">portcode</label>
                    <el-input readonly v-model="info.port.portcode" placeholder="portcode"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">港口中文</label>
                    <el-input readonly v-model="info.port.cnportname" placeholder="港口中文名称"></el-input>
                </div>
                <div flex>
                    <label class="item-label">港口英文</label>
                    <el-input readonly v-model="info.port.portname" placeholder="港口中文名称"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">港口类型</label>
                    <el-input readonly v-model="info.port.porttype" placeholder="港口类型名称"></el-input>
                </div>
                <div flex>
                    <label class="item-label">区域id</label>
                    <el-input readonly v-model="info.relation.regionId" placeholder="区域id"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">区域中文</label>
                    <el-input readonly v-model="info.relation.regionZH" placeholder="区域中文名称"></el-input>
                </div>
                <div flex>
                    <label class="item-label">区域英文</label>
                    <el-input readonly v-model="info.relation.regionEN" placeholder="区域英文名称"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">portlike</label>
                    <el-input readonly v-model="info.port.portlike" placeholder="portlike"></el-input>
                </div>
                <div flex>
                    <label class="item-label">code</label>
                    <el-input readonly v-model="info.port.code" placeholder="code"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">经度</label>
                    <el-input readonly v-model="info.port.lon" placeholder="经度"></el-input>
                </div>
                <div flex>
                    <label class="item-label">维度</label>
                    <el-input readonly v-model="info.port.lat" placeholder="维度"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">国家中文</label>
                    <el-input readonly v-model="info.port.ancn" placeholder="国家中文名称"></el-input>
                </div>
                <div flex>
                    <label class="item-label">国家英文</label>
                    <el-input readonly v-model="info.port.country" placeholder="国家英文名称"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">ansub</label>
                    <el-input readonly v-model="info.port.ansub" placeholder="ansub"></el-input>
                </div>
                <div flex>
                    <label class="item-label">vportname</label>
                    <el-input readonly v-model="info.port.vportname" placeholder="vportname"></el-input>
                </div>
            </div>
            <div flex="box:mean" class="form-item">
                <div flex>
                    <label class="item-label">radius</label>
                    <el-input readonly v-model="info.port.radius" placeholder="radius"></el-input>
                </div>
                <div flex>
                    <label class="item-label">状态</label>
                    <el-select disabled v-model="info.port.flag" placeholder="状态">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="失效" value="0"></el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import $api from '../../Common/tools/api';
    import config from '../../Common/tools/config';
    import comDatas from '../../Common/tools/comDatas';
    import '../less/port-particulars.less';

    export default {
        name: 'port-particulars',
        data(){
            return {
                comDatas,
                portcode: '',
                info: {
                    port:{
                        id : null,
                        an : null,
                        locode : null,
                        portname : null,
                        cnportname : null,
                        portcode : null,
                        porttype : null,
                        portlike : null,
                        code : null,
                        lat : null,
                        lon : null,
                        ansub : null,
                        ancn : null,
                        country : null,
                        radius : null,
                        vportname : null,
                        flag:0,
                    },
                    relation:{
                        regionId : null,
                        regionEN : null,
                        regionZH : null,
                    }
                },
            }
        },
        components: {
        },
        created(){
            this.portcode = this.$route.query.portcode;
            this.getInfo();
        },
        computed: {

        },
        methods: {
            //获取港口信息
            getInfo(){
                $api.get('/secure/dictionary/port/query/portcode',{portcode: this.portcode}).then(res => {
                    if(res.status !== 1){
                        this.$message.error('请求失败');
                        return false;
                    }else {
                        let list = res.content;
                        this.info.port.id = list.port.id;
                        this.info.port.lon = list.port.lon;
                        this.info.port.lat = list.port.lat;
                        this.info.port.portcode = list.port.portcode;
                        this.info.port.portname = list.port.portname;
                        this.info.port.an = list.port.an;
                        this.info.port.locode = list.port.locode;
                        this.info.port.cnportname = list.port.cnportname;
                        this.info.port.porttype = list.port.porttype;
                        this.info.port.code = list.port.code;
                        this.info.port.flag = list.port.flag;
                        this.info.port.ansub = list.port.ansub;
                        this.info.port.ancn = list.port.ancn;
                        this.info.port.vportname = list.port.vportname;
                        this.info.port.radius = list.port.radius;
                        this.info.port.country = list.port.country;
                        this.info.port.portlike = list.port.portlike;

                        this.info.relation.regionId = list.region.regionId;
                        this.info.relation.regionZH = list.region.regionZH;
                        this.info.relation.regionEN = list.region.regionEN;
                    }
                });
            },
        },
        destroyed(){

        }
    }
</script>
