<template>
    <div class="region-dictionary">
        <div flex-box="0" flex>
            <div flex-box="0" class="search-input">
                <el-input v-model="regionName" placeholder="请输入区域中文或英文名称"></el-input>
            </div>
            <div flex-box="1">
                <el-button type="primary" @click="loadData">搜索</el-button>
            </div>
            <div flex-box="0">
                <el-button type="primary" @click="addShow">添加</el-button>
            </div>
        </div>
        <el-row> 
            <el-col>
                <div style="margin: 10px"></div>
            </el-col>
        </el-row>
        <div flex-box="1">
            <el-table :data="lists" border stripe size="small" align="center"
                      v-loading="loading"  element-loading-text="拼命加载中"
                      @selection-change="selsChange">
                <el-table-column type="selection" width="65" align="center"></el-table-column>
                <el-table-column prop="regionId" label="区域ID" align="center" ></el-table-column>
                <el-table-column prop="regionZH" label="中文名称" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="regionEN" label="英文名称" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column   label="操作" header-align="center" align="center" width="160px">
                  <template scope="scope">
                      <el-button  size="small" type="primary" @click="editRow(scope.row)">编辑</el-button>
                      <el-button  size="small" type="danger" @click="deleteRow(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button type="danger" @click="deleteAll(sels)">批量删除</el-button>
            </div>
            <el-dialog :visible.sync="dialogVisible" size="small">
                <el-form ref=dataForm :model="dataForm" label-width="120px" :rules="formValidate"> 
                    <el-row type="flex" justify="center">
                        <div style="margin-top: 20px"></div>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="20">
                            <el-form-item label="中文名称" prop="regionZH">
                                <el-input v-model="dataForm.regionZH" placeholder="请输入中文名称" :maxlength="255"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="20">
                            <el-form-item label="英文名称" prop="regionEN">
                                <el-input v-model="dataForm.regionEN" placeholder="请输入英文名称" :maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                    <el-row> 
                        <el-col>
                            <div style="margin: 20px"></div>
                        </el-col> 
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-button type="info" class="btn-md" @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" class="btn-md" @click='addSave'>提 交</el-button>
                    </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import $api from '../../Common/tools/api';
    import '../less/region-dictionary.less';
    export default {
        name: 'region-dictionary',
        data(){
            return {
                dataForm : {
                    regionId : null,
                    regionEN : '',
                    regionZH : ''
                },
                formValidate : {
                    regionEN : [
                                    { required: true, message: '请输入英文名称！', trigger: 'blur' },
                                    {  max: 100, message: '长度在 100个字符之内', trigger: 'blur' }
                                  ],
                    regionZH: [
                                    { required: true, message: '请输入中文名称！', trigger: 'blur' },
                                    {  max: 100, message: '长度在 100个汉字之内', trigger: 'blur' }
                               ]
                },
                lists: [],
                regionName: '',
                loading : false,
                dialogVisible : false,
                sels:[]
            }
        },
        created(){
            this.loadData();
        },
        computed: {},
        methods: {
            //获取列表
            loadData(){
                this.loading = true;
                let param = {};
                if(this.regionName){
                    param.regionName = this.regionName
                }
                $api.get('/secure/dictionary/region/querylist',param).then(res => {
                    this.lists = res.content || [];
                    this.loading = false;
                }).catch(err =>{
                    this.$message.error('加载失败')
                    this.loading = false;
                })
            },
            // 编辑
            editRow(row){
                this.dialogVisible = true;
                this.dataForm.regionEN = row.regionEN;
                this.dataForm.regionZH = row.regionZH;
                this.dataForm.regionId = row.regionId;
            },
            // 添加
            addShow(){
                this.dialogVisible = true;
                this.dataForm.regionId = null;
                this.dataForm.regionEN = '';
                this.dataForm.regionZH = '';
            },
            //保存
            addSave(){
                $api.post("/secure/dictionary/region/save",this.dataForm).then(res => {
                    if(res.status !== 1){
                        this.$message.error('提交失败');
                        return false;
                    }else {
                        this.$message.success('提交成功');
                        this.loadData();
                    }
                });
                this.dialogVisible = false;
            },
            //删除
            deleteRow(index,row){
                this.$confirm('删除后不可恢复，确认删除？').then(() => {
                    $api.post("/secure/dictionary/region/deletelist",[{regionId:row.regionId}]).then(res => {
                        if(res.status !== 1){
                            this.$message.error('删除失败');
                        }else {
                            this.$message.success('删除成功');
                            this.loadData();
                        }
                    })
                    }).catch(err =>{
                        console.log(err)

                });
            },
            //批量删除
            deleteAll(rows){
                let ids = [];
                rows.forEach(item => {
                    ids.push({
                        regionId: item.regionId
                    })
                });
                this.$confirm('确定要删除选中的文件吗?','提示').then(() =>{
                    $api.post("/secure/dictionary/region/deletelist",ids).then(res =>{
                        if( res.status !== 1){
                            this.$message.error('删除失败');
                        } else {
                            this.$message.success('删除成功');
                            this.loadData();
                        }
                    })
                    }).catch(err =>{
                        console.log(err)
                });
            },
            //选中的值
            selsChange(sels){
                this.sels = sels
            }
        },
        destroyed(){

        }
    }
</script>
