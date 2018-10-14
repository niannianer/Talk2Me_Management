<template>
    <div class="charge-manage" flex="dir:top">
        <div flex-box="0" flex>
            <div flex-box="0" flex="cross:center" class="search-flag">
                <span flex-box="0" class="search-name">状态</span>
                <div flex-box="1">
                    <el-select v-model="flag" placeholder="请选择状态">
                        <el-option :label="item.nameZH"
                                   :value="item.value"
                                   v-for="item,index in comDatas.infoStatus">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-input">
                <span flex-box="0" class="search-name">类型名称</span>
                <div flex-box="1">
                    <el-input v-model="name" placeholder="输入类型名称"></el-input>
                </div>
            </div>
            <div flex-box="0">
                <el-button type="primary" @click="onSearch">查询</el-button>
            </div>
        </div>
        <div flex flex-box="0">
            <div class="curt-loca" flex-box="1">当前位置：<span>收费类型管理</span></div>
            <div flex-box="0">
                <el-button type="primary" @click.stop="toAdd()">添加</el-button>
            </div>
        </div>

        <div flex-box="1">
            <el-table :data="lists" border stripe
                      size="small"
                      v-loading="loading">
                <el-table-column prop="parentName" label="父类型" align="center"></el-table-column>
                <el-table-column prop="chargeNameZh" label="收费类型（中文）" align="center"></el-table-column>
                <el-table-column prop="chargeNameEn" label="收费类型（英文）" align="center"></el-table-column>
                <el-table-column prop="grade" label="级别" align="center"></el-table-column>
                <el-table-column prop="unitPrice" label="价格" align="center"></el-table-column>
                <el-table-column prop="unitNameZh" label="单位（中文）" align="center"></el-table-column>
                <el-table-column prop="unitNameEn" label="单位（英文）" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click.stop="toEdit(scope.$index)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--添加弹框-->
        <el-dialog :visible.sync="showDialog">
            <div class="inner-box">
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">父类型</label>
                    <div flex-box="1">
                        <el-cascader
                                placeholder="请选择父类型"
                                :options="types"
                                v-model="parentType"
                                change-on-select
                                :disabled="editIs">
                        </el-cascader>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">是否有子类</label>
                    <div flex-box="1">
                        <el-select v-model="charge.ifParent" :disabled="editIs">
                            <el-option label="是"
                                       :value="true">
                            </el-option>
                            <el-option label="否"
                                       :value="false">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">收费类型(中文)</label>
                    <div flex-box="1">
                        <el-input v-model="charge.chargeNameZh" :disabled="editIs"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">收费类型(英文)</label>
                    <div flex-box="1">
                        <el-input v-model="charge.chargeNameEn" :disabled="editIs"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">价格</label>
                    <div flex-box="1">
                        <el-input v-model="charge.unitPrice" :disabled="charge.ifParent"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">单位(中文)</label>
                    <div flex-box="1">
                        <el-input v-model="charge.unitNameZh" :disabled="charge.ifParent"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">单位(英文)</label>
                    <div flex-box="1">
                        <el-input v-model="charge.unitNameEn" :disabled="charge.ifParent"></el-input>
                    </div>
                </div>
                <div flex="cross:center" class="form-item">
                    <label class="item-label" flex-box="0">状态</label>
                    <div flex-box="1">
                        <el-select v-model="charge.flag">
                            <el-option label="正常"
                                       :value="1">
                            </el-option>
                            <el-option label="失效"
                                       :value="0">
                            </el-option>
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
    import $api from '../../Common/tools/api';
    import comDatas from '../../Common/tools/comDatas';
    import {session} from '../../Common/tools/store.js';
    import '../less/charge-manage.less';
    export default {
        name: 'charge-manage',
        data(){
            return {
                comDatas,
                lists: [],
                name: '',
                flag: 1,
                loading: false,
                showDialog:false,
                editIs:false,
                types:[],
                parentType:[],
                charge: {
                    chargeNameZh:'',
                    chargeNameEn:'',
                    unitPrice:'',
                    unitNameZh:'',
                    unitNameEn:'',
                    ifParent:false,
                    flag:1
                },
            }
        },
        created(){
            this.loadData();
            this.getGradeOne();
        },
        computed: {
        },
        methods: {
            //搜索
            onSearch(){
                this.loadData();
            },
            //添加
            toAdd(){
                this.showDialog = true;
                this.editIs = false;
                this.parentType = [];
                this.charge = {
                    chargeNameZh:'',
                    chargeNameEn:'',
                    unitPrice:'',
                    unitNameZh:'',
                    unitNameEn:'',
                    ifParent:false,
                    flag:1
                };
            },
            //编辑
            toEdit(index){
                this.showDialog = true;
                this.editIs = true;
                this.charge = JSON.parse(JSON.stringify(this.lists[index]));
                delete this.charge.parentName;
            },
            //保存
            updateSave(){
                this.showDialog = false;
                //添加时
                if(this.editIs == false){
                    this.charge.parentGrade = this.parentType.length;
                    this.charge.grade = this.charge.parentGrade + 1;
                    this.charge.parentId = this.parentType.pop();
                }
                //console.log('charge   ' + JSON.stringify(this.charge));
                $api.post('/secure/dictionary/chargetype/save',this.charge)
                    .then(res => {
                        if(res.status == 1){
                            this.$message.success('保存成功');
                            this.loadData();
                            this.getGradeOne();
                        }else {
                            this.$message.error('保存失败')
                        }
                });
                this.parentType = [];
                this.charge = {
                        chargeNameZh:'',
                        chargeNameEn:'',
                        unitPrice:'',
                        unitNameZh:'',
                        unitNameEn:'',
                        ifParent:false,
                        flag:1
                };
            },
            //加载数据
            loadData(){
                this.loading = false;
                let param = {};
                param.flag = this.flag;
                if(this.name){
                    param.name = this.name;
                }
                // alert(param.name)
                // alert(typeof param.name)
                $api.get('/secure/dictionary/chargetypelist/query',param)
                    .then(res => {
                        this.loading = false;
                        if(res){
                            this.lists = res.content || [];
                        }
                    });
            },
            //一级父类型
            getGradeOne(){
                $api.get('/secure/dictionary/chargetypelist/queryParent',{flag:this.flag,grade:1})
                    .then(res => {
                        if(res){
                            let parents = res.content;
                             parents.forEach(item => {
                                this.types.push({
                                    value: item.chargeId,
                                    label: item.chargeNameZh,
                                    grade: item.grade,
                                    children: [],
                                });
                            })
                        }
                        // console.log(JSON.stringify(this.types));
                        this.getGradeTwo(this.types)
                    });
            },
            getGradeTwo(types){
                if(types){
                    types.map(item => {
                        $api.get('/secure/dictionary/chargetypelist/querySubParent',{chargeId:item.value})
                            .then(res => {
                                // console.log('res   ' + JSON.stringify(res))
                                if(res.status == 1){
                                    res.content.map(item1 => {
                                        item.children.push({
                                            value : item1.chargeId || '',
                                            label : item1.chargeNameZh || ''
                                        });
                                    });
                                }else {
                                    item.children.push({
                                        value:'',
                                        label:''
                                    })
                                }
                                return item
                                    //console.log("aaaaa"+JSON.stringify(res))
                                    //alert('ll   ' + JSON.stringify(item))
                            });
                    });
                }else {
                    return []
                }
            },
            //二级父类型
            // getGradeTwo(val){
            //     val = val[0]
            //     let oldItem = [];
            //     let index = 0;
            //     for (let i = 0; i <= this.types.length - 1; i ++) {
            //         if(this.types[i].value == val){
            //             oldItem = this.types[i];
            //             index = i;
            //         }
            //     }
            //     //isLoadedChild标志是否加载过子菜单，避免重复调用API
            //     if(oldItem.isLoadedChild){
            //         return false;
            //     }
            //     $api.get('/secure/dictionary/chargetypelist/querySubParent',{chargeId:val})
            //         .then(res => {
            //             oldItem.children = res.content || [];
            //             oldItem.isLoadedChild  = true;
            //             oldItem.children.map(item => {
            //                 item.label = item.chargeNameZh;
            //                 item.value = item.chargeId;
            //             })
            //             this.$set(this.types, index, oldItem)
            //     });
            // }
        },
        mounted(){
        },
        watch:{
            parentType(curVal,oldVal){
                //console.log('curVal'+ JSON.stringify(curVal),'  oldVal'+ JSON.stringify(oldVal));
                return curVal
            }
        },
        destroyed(){

        }
    }
</script>
