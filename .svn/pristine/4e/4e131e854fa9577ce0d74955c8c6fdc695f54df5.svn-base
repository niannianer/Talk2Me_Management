<template>
        <div class="authention-update" flex="dir:top">
            <authentication
            pageType="edit"
                    buttonText = "提交"
                    @complete="submit"></authentication>
        </div>
</template>

<script>
    import Authentication from '../components/Authentition/Authentition';
    import $api2 from '../../Common/tools/api2';
    import {session} from '../../Common/tools/store';
    export default {
        name: 'authention-update',
        data(){
            return {
                info:{
                    authentication: {}
                }
            }
        },
        created(){
            this.info = session.getItem('merchant');
        },
        components: {
            Authentication
        },
        computed: {
        },
        methods: {
            //信息填写完成
            submit(result){
                this.info.merchant = session.getItem('merchant');
                this.info.authentication = result;
                $api2.post('/secure/merchant/all/save',this.info).then(res => {
                    if(res.status){
                        this.$message.success('提交信息成功！');
                        this.$router.push(`/management/merchant/my-service`);
                    }else {
                        this.$message.error('提交失败！请稍后再试');
                    }
                })
            },
        },
        destroyed(){

        }
    }
</script>
