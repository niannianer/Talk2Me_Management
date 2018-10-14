<template>
    <div class="attention-me">
        <nav-title title="粉丝概况"></nav-title>
        <div class="my-table" v-if="attentionList.length">
            <el-table
                    :data="attentionList"
                    :row-class-name="tableRowClassName"
                    v-loading="loading"
                    style="width: 100%">
                <el-table-column prop="email" label="关注时间" :formatter="formatValue"></el-table-column>
                <el-table-column prop="name" label="用户名" :formatter="formatValue"></el-table-column>
                <el-table-column prop="roleselect" label="工作性质" :formatter="formatValue"></el-table-column>
                <el-table-column prop="city" label="地址" :formatter="formatValue"></el-table-column>
            </el-table>
        </div>
        <empty-show v-else></empty-show>
    </div>
</template>

<script>
    import $api2 from '../../Common/tools/api2';
    import {session} from '../../Common/tools/store';
    import {mapState} from 'vuex'
    import NavTitle from '../components/nav/nav';
    import {timeFormater} from '../../Common/filters/index.js';
    import EmptyShow from '../../Common/components/EmptyShow/EmptyShow';
    import '../less/attention-me.less'
    export default {
        name: "attention-me",
        data(){
            return{
                loading:false,
                attentionList:[],
                userEmail:'',
            }
        },
        created(){
            this.userEmail = session.getItem('oldEmail');
            this.getList()
        },
        components:{
            NavTitle,EmptyShow
        },
        computed:{
            ...mapState(['unionid'])
        },
        methods:{
            //获取列表
            getList(){
                this.loading = true;
                let userId = this.unionid || this.userEmail;
                $api2.get('/secure/merchant/attentions/query',{userid:userId}).then(res => {
                    this.loading = false;
                    this.attentionList = res.content || []
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
            //时间
            formatTime(row,column){
                let time =  row[column.property];
                return timeFormater(time,'yyyy-MM-dd');
            },
        }
    }
</script>