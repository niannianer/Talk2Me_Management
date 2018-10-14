<template>
    <div class="service-type-manage">
        <div flex>
            <div class="curt-loca" flex-box="1">当前位置：<span>服务类型管理</span></div>
            <div flex-box="0">
                <el-button type="primary" @click.stop="dialogAction('add','')">添加</el-button>
            </div>
        </div>

        <el-table
                :data="typeList"
                border
                style="width: 100%">
            <el-table-column fixed prop="merchantTypeId" label="服务商类型" :formatter="getTypes" align="center"></el-table-column>
            <el-table-column prop="nameZh" label="服务类型（中文）" align="center"></el-table-column>
            <el-table-column prop="nameEn" label="服务类型（英文）" align="center"></el-table-column>
            <el-table-column prop="flag" label="状态" :formatter="getFlag" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="dialogAction('update',scope.$index)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--增加、修改弹框-->
        <el-dialog :title="dialogTitle" :visible.sync="showDialog">
            <div class="inner-box">
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">服务商类型</label>
                    <div flex-box="1">
                        <el-select v-model="sendInfo.merchantTypeId" placeholder="请选择服务商类型">
                            <!--<el-option :label="item.merchantTypeZH"-->
                            <!--:value="item.merchantTypeId"-->
                            <!--v-for="item,index in maerchanttype">-->
                            <!--</el-option>-->
                            <el-option label="个人" :value="1"></el-option>
                            <el-option label="企业" :value="2"></el-option>
                            <el-option label="机构" :value="3"></el-option>
                        </el-select>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">服务类型(中文)</label>
                    <div flex-box="1">
                        <el-input v-model="sendInfo.nameZh" auto-complete="off"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">服务类型(英文)</label>
                    <div flex-box="1">
                        <el-input v-model="sendInfo.nameEn" auto-complete="off"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">状态</label>
                    <div flex-box="1">
                        <el-select v-model="sendInfo.flag" placeholder="请选择状态">
                            <el-option label="正常" :value="1"></el-option>
                            <el-option label="失效" :value="0"></el-option>
                        </el-select>
                    </div>
                </div>
                <div slot="footer" flex="main:center">
                    <el-button type="info" @click="showDialog = false">取 消</el-button>
                    <el-button type="primary" @click="updateSave">保 存</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import $api from '../../Common/tools/api.js';
    import {mapState} from 'vuex';
    import {marchantText,statusText} from '../../Common/filters/index.js';
    import '../less/service-type-manage.less'
    export default {
        name: 'service-type-manage',
        data(){
            return {
                radio: '',
                showDialog: false,
                typeList: [{
                    merchantServiceTypeId:'',
                    merchantTypeId: '',
                    nameZh: '',
                    nameEn: '',
                    flag:''
                }],
                sendInfo: {
                    merchantServiceTypeId: '',
                    merchantTypeId: '',
                    nameZh: '',
                    nameEn: '',
                    flag: ''
                },
                dialogTitle: '',
            }
        },
        created(){
            this.getTypeList();
        },
        computed: {
            ...mapState(['maerchanttype'])
        },
        methods: {
            //获取列表
            getTypeList(){
                $api.get('/secure/dictionary/servicetype/querylist/all').then(res => {
                    this.typeList = res.content;
                    // console.log(JSON.stringify(this.typeList))
                }).catch(err =>{
                    console.log('err')
                })
            },
            changeSelect(){
                alert(123);
            },
            //点击修改/增加
            dialogAction(type,index) {
                this.showDialog = true;
                if(type == 'update'){
                    this.dialogTitle = '服务类型详情修改';
                    this.sendInfo.merchantTypeId = this.typeList[index].merchantTypeId;
                    this.sendInfo.flag = this.typeList[index].flag;
                    this.sendInfo.nameZh = this.typeList[index].nameZh;
                    this.sendInfo.nameEn = this.typeList[index].nameEn;
                    this.sendInfo.merchantServiceTypeId = this.typeList[index].merchantServiceTypeId;
                }else if(type == 'add'){
                    this.dialogTitle = '服务类型添加';
                    this.sendInfo = {};
                }
            },
            //修改／新增 保存
            updateSave(){
                this.showDialog = false;
                $api.post('/secure/merchant/servicetype/save' ,this.sendInfo).then(res => {
                    if(res.status == 1){
                        this.getTypeList()
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
