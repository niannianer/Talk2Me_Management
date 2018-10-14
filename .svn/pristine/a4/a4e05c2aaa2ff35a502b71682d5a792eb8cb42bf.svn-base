<template>
    <div class="port-dictionary">
        <div flex-box="0" flex class="search">
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
                <span flex-box="0" class="search-name">国家</span>
                <div flex-box="1">
                    <el-input v-model="country" placeholder="请输入国家中文或英文名"></el-input>
                </div>
            </div>
        </div>
        <div flex class="search">
            <div flex-box="0" flex="cross:center" class="search-input">
                <span flex-box="0" class="search-name">区域</span>
                <div flex-box="1">
                    <el-input v-model="region" placeholder="请输入区域中文或英文名"></el-input>
                </div>
            </div>
            <div flex-box="0" flex="cross:center" class="search-input">
                <span flex-box="0" class="search-name">港口</span>
                <div flex-box="1">
                    <el-input v-model="port" placeholder="请输入港口中文或英文名"></el-input>
                </div>
            </div>
            <div flex-box="0">
                <el-button type="primary" @click.stop="searchData">查询</el-button>
            </div>
        </div>

        <div flex flex-box="0">
            <div class="curt-loca" flex-box="1">当前位置：<span>港口字典管理</span></div>
            <div flex-box="0">
                <el-button type="primary" @click.stop="addShow('add')">添加</el-button>
            </div>
        </div>
        <div flex-box="1">
            <el-table :data="lists" border stripe size="small" align="center"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      @row-dblclick="pathTo">
                <el-table-column prop="ancn" label="国家（中文）" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="country" label="国家（英文）" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cnportname" label="港口（中文）" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="portname" label="港口（英文）" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="regionZH" label="区域（中文）" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="regionEN" label="区域（英文）" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="flag" label="状态" :formatter="getFlag" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="portcode" label="港口代码" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column   label="操作" header-align="center" align="center" width="100px">
                  <template scope="scope">
                      <el-button  size="small" type="primary" @click="editRow(scope.$index,scope.row)">编辑
                      </el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div flex="main:center" class="page-tools" v-if="totals">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="page+1"
                  :page-sizes="[5,10, 20, 50]"
                  :page-size="size"
                  layout="total, sizes, prev, pager, next, jumper"
                  background
                  :total="totals">
                </el-pagination>
            </div>
            <el-dialog :visible.sync="dialogVisible" size="full">
                <el-form ref=dataForm :model="dataForm" label-width="120px">
                        <el-row type="flex"> 
                            <el-col :span="8">
                                <el-form-item label="状态" prop="flag">
                                    <el-select v-model="dataForm.port.flag" placeholder="请选择状态">
                                        <el-option label="正常" value="1"></el-option>
                                        <el-option label="失效" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="区域" prop="relation.regionId">
                                    <el-select v-model.number="dataForm.relation.regionId" placeholder="regionId">
                                        <el-option :label="item.name"
                                                   :value="item.id"
                                                   v-for="item in idList">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="locode" prop="locode">
                                    <el-input v-model="dataForm.port.locode" placeholder="请输入locode" :maxlength="2"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row type="flex" justify="center"> 
                            <el-col :span="8">
                               <el-form-item label="港口中文" prop="cnportname">
                                    <el-input v-model="dataForm.port.cnportname" placeholder="请输入港口中文名称">
                                    </el-input> 
                                </el-form-item> 
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="港口英文" prop="portname">
                                    <el-input v-model="dataForm.port.portname" placeholder="请输入港口英文名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="portcode" prop="portcode">
                                    <el-input v-model="dataForm.port.portcode" placeholder="请输入portcode"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row type="flex">
                             <el-col :span="8">
                                 <el-form-item label="港口类型" prop="porttype">
                                     <el-input v-model="dataForm.port.porttype" placeholder="请输入港口类型"></el-input>
                                 </el-form-item>
                             </el-col>
                             <el-col :span="8">
                                 <el-form-item label="portlike" prop="portlike">
                                     <el-input v-model="dataForm.port.portlike" placeholder="请输入portlike"></el-input>
                                 </el-form-item>
                             </el-col>
                             <el-col :span="8">
                                 <el-form-item label="portId" prop="relation.portId">
                                     <el-input v-model="dataForm.relation.portId" placeholder="portId"></el-input>
                                 </el-form-item>
                             </el-col>
                        </el-row> 
                        <el-row type="flex">
                            <el-col :span="8">
                                  <el-form-item label="维度" prop="lat">
                                    <el-input v-model.number="dataForm.port.lat" type="number" placeholder="请输入维度" :maxlength="10"></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="经度" prop="lon">
                                    <el-input v-model.number="dataForm.port.lon" type="number" placeholder="请输入经度" :maxlength="10"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="code" prop="code">
                                    <el-input v-model="dataForm.port.code" placeholder="请输入code"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row type="flex"> 
                            <el-col :span="8">
                                  <el-form-item label="ansub" prop="ansub">
                                    <el-input v-model="dataForm.port.ansub" placeholder="请输入ansub" :maxlength="2"></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="国家中文" prop="ancn">
                                    <el-input v-model="dataForm.port.ancn" placeholder="请输入国家中文名称" :maxlength="20"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="国家英文" prop="country">
                                    <el-input v-model="dataForm.port.country" placeholder="请输入国家英文名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item label="an" prop="an">
                                    <el-input v-model="dataForm.port.an" placeholder="请输入an" :maxlength="3"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="vportname" prop="vportname">
                                    <el-input v-model="dataForm.port.vportname" placeholder="请输入vportname" :maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="radius" prop="radius">
                                    <el-input v-model.number="dataForm.port.radius" type="number" placeholder="请输入radius"></el-input>
                                </el-form-item> 
                            </el-col>
                        </el-row>
                        <el-row type="flex">
                        </el-row>
                    </el-form>
                    <div style="height: 20px"></div>
                    <el-row type="flex" justify="center">
                        <el-button type="info" class="btn-md" @click.stop="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" class="btn-md" @click.stop='addSave'>提 交</el-button>
                    </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import $api from '../../Common/tools/api';
    import comDatas from '../../Common/tools/comDatas';
    import {statusText} from '../../Common/filters/index.js';
    import '../less/port-dictionary.less';
    export default {
        name: 'port-dictionary',
        data(){
            return {
                comDatas,
                flag:1,
                country:null,
                region:null,
                port:null,
                //添加，编辑数据
                dataForm : {
                    port:{
                        id : null,
                        an : null,
                        locode : null,
                        //港口英文名字
                        portname : null,
                        // 港口中文
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
                        flag:'',
                    },
                    relation:{
                        regionId : null,
                        portId : null,
                    }
                },
                lists: [],
                size: 10,
                page: 0,
                totals: 0,
                loading : false,
                dialogVisible : false,
                //查询列表数据
                param:{},
                idList:[]
            }
        },
        created(){
            this.searchData();
            this.getId();
        },
        computed: {
        },
        methods: {
            //获取列表
            searchData(){
                this.loading = true;
                let {size, page,flag} = this;
                this.param = {size,page,flag};
                if(this.country){
                    this.param.country = this.country;
                }
                if(this.region){
                    this.param.region = this.region;
                }
                if(this.port){
                    this.param.port = this.port;
                }
                console.log(JSON.stringify(this.param));
                $api.get('/secure/dictionary/ports/query/conditions',this.param).then(res => {
                    this.lists = res.content || [];
                    this.totals = res.totalElements;
                }).catch(err =>{
                    this.$message.error('请求失败');
                });
                this.loading = false;
            },
            handleSizeChange(val){
                this.size = val;
                this.searchData();
            },
            handleCurrentChange(val){
                this.page = val-1;
                this.searchData();
            },
            // 行编辑
            editRow(index,row){
                this.dialogVisible = true;
                // this.dataForm.port = JSON.parse(JSON.stringify(row.port));
                // this.dataForm.relation = JSON.parse(JSON.stringify(row.relation));

                this.dataForm.port.id = row.id;
                this.dataForm.port.lon = row.lon;
                this.dataForm.port.lat = row.lat;
                this.dataForm.port.portcode = row.portcode;
                this.dataForm.port.portname = row.portname;
                this.dataForm.port.an = row.an;
                this.dataForm.port.locode = row.locode;
                this.dataForm.port.cnportname = row.cnportname;
                this.dataForm.port.porttype = row.porttype;
                this.dataForm.port.code = row.code;
                this.dataForm.port.flag = row.flag;
                this.dataForm.port.ansub = row.ansub;
                this.dataForm.port.ancn = row.ancn;
                this.dataForm.port.vportname = row.vportname;
                this.dataForm.port.radius = row.radius;
                this.dataForm.port.country = row.country;
                this.dataForm.port.portlike = row.portlike;

                this.dataForm.relation.regionId = row.regionId;
                this.dataForm.relation.portId = row.portId;
            },
            // 新增
            addShow (){
                // 重置表单
                this.dataForm.port.id = null;
                this.dataForm.port.lon = null;
                this.dataForm.port.lat = null;
                this.dataForm.port.portcode = null;
                this.dataForm.port.portname = null;
                this.dataForm.port.an = null;
                this.dataForm.port.locode = null;
                this.dataForm.port.cnportname = null;
                this.dataForm.port.porttype = null;
                this.dataForm.port.code = null;
                this.dataForm.port.ansub = null;
                this.dataForm.port.ancn = null;
                this.dataForm.port.vportname = null;
                this.dataForm.port.radius = null;
                this.dataForm.port.country = null;
                this.dataForm.port.portlike = null;
                this.dataForm.port.flag = '';
                this.dataForm.relation.regionId = null;
                this.dataForm.relation.portId = null;
                //显示弹出框
                this.dialogVisible = true;
            },
            // 新增行,编辑行
            addSave(){
                console.log(JSON.stringify(this.dataForm));
                $api.post('/secure/dictionary/port/save',this.dataForm).then(res => {
                    if(res.status !== 1){
                        this.$message.error('保存失败');
                        return false;
                    }else {
                        this.$message.success('保存成功');
                        this.searchData();
                    }
                });
                this.dialogVisible = false;
            },
            //跳转页面
            pathTo(row){
                this.$router.push({
                    path: '/management/menus/port-particulars',
                    query: {
                        portcode: row.portcode
                    }
                })
            },
            //状态换文字
            getFlag(row,column) {
                let status =  row[column.property];
                return statusText(status)
            },
            //获取区域列表
            getId(){
                $api.get('/secure/dictionary/region/querylist').then(res => {
                    let lists = res.content;
                    lists.forEach(item => {
                        this.idList.push({
                            name:item.regionZH,
                            id:item.regionId
                        })
                    })
                })
            }
        },
        destroyed(){

        }
    }
</script>
