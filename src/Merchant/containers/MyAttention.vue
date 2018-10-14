<template>
    <div class="my-attention">
        <nav-title title="服务商概况"></nav-title>
        <div class="my-table" v-if="content.length">
            <el-table
                    :data="content"
                    v-loading="loading"
                    :row-class-name="tableRowClassName"
                    style="width: 100%">
                <el-table-column prop="merchantName" label="名称"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="service" label="服务" :formatter="formatValue"></el-table-column>
                <el-table-column prop="telephone" label="电话" :formatter="formatValue"></el-table-column>
            </el-table>
        </div>
        <empty-show v-else></empty-show>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import NavTitle from '../components/nav/nav';
    import $api2 from '../../Common/tools/api2';
    import EmptyShow from '../../Common/components/EmptyShow/EmptyShow';
    import '../less/my-attention.less'
    import {session} from "../../Common/tools/store";

    export default {
        name: 'my-attention',
        data(){
            return {
                content:[],
                loading:false
            }
        },
        created(){
            this.getList()
        },
        components: {
            NavTitle,EmptyShow
        },
        computed: {
            ...mapState(['unionid'])
        },
        methods: {
            //获取列表
            getList(){
                this.loading = true;
                let userId = this.unionid || session.getItem('oldEmail');
                $api2.get('/secure/merchant/attentionmerchants',{userid:userId}).then(res => {
                    this.loading = false;
                    this.content = res.content || [];
                })
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 == 0) {
                    return 'success-row';
                }
            },
            //空时返回 --
            formatValue(row,column){
                let value =  row[column.property];
                if(!value){
                    return '--'
                }
                return value
            },
        },
        destroyed(){

        }
    }
</script>
