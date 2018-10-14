<template>
        <div class="merchant-detail" flex="dir:top">
            <merchant-info type="edit" @complete="complete"></merchant-info>
        </div>
</template>

<script>
    import MerchantInfo from '../components/MerchantInfo/MerchantInfo';
    import $api2 from '../../Common/tools/api2';
    export default {
        name: 'merchant-details',
        data(){
            return {
                info:{
                    merchant: {}
                }
            }
        },
        created(){

        },
        components: {
            MerchantInfo
        },
        computed: {
        },
        methods: {
            //商家信息填写完成
            complete(result){
                this.info.merchant = result;
                $api2.post('/secure/merchant/save',this.info.merchant).then( res => {
                    if(res.status){
                        this.$message.success('提交成功！');
                        setTimeout(()=>{
                            this.$router.push(`/management/merchant/my-service`);
                        },1000)
                    }else{
                        this.$message.error('提交失败,请稍后再试！');
                    }
                });
            },
        },
        destroyed(){

        }
    }
</script>
