<template>
    <div class="my-claim" flex="dir:top">
        <div class="no-claimed">
            <div class="text">您还没有认领服务商，请前往认领</div>
            <div flex="main:center" class="action-btn">
                <el-button type="primary" style="background-color: #0071c8;border-color:#0071c8 " @click.stop="pathTo">我要认领</el-button>
            </div>
        </div>
        <div class="my-img">
            <img src="../images/no-claim.png">
        </div>
    </div>
</template>

<script>
    import {session} from '../../Common/tools/store';
    import '../less/no-claim.less';
    export default {
        name: 'no-claim',
        data(){
            return {
             claimedMId: ''
            }
        },
        created(){
            this.claimedMId = session.getItem('claimedMId');
            if(this.claimedMId){
                this.$router.replace('/management/merchant/my-service');
            }
        },
        components: {
        },
        computed: {
        },
        methods: {
            pathTo(){
                this.$router.push('/management/merchant/merchant-search');
            }
        },
        mounted(){

        },
        destroyed(){

        }
    }
</script>
