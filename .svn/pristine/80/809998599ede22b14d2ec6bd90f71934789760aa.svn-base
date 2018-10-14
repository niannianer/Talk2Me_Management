<template>
    <div>
        <span>{{myToken}}</span>
        <span>显示文字</span>
    </div>
</template>

<script>
    import $api2 from '../../Common/tools/api2.js'
    import {session} from '../../Common/tools/store';
    export default {
        name: "logout",
        data(){
            return{
                myToken:''
            }
        },
        created(){
            console.log('测试' + session.getItem('authInfoMerchant'));
            alert(1);
        },
        mounted(){
            alert(2);
            // this.logOut()
        },
        methods:{
            //退出登录
            logOut(){
                let authInfo = session.getItem('authInfoMerchant');
                let token = authInfo.value;
                alert(token);
                this.myToken = token;
                $api2.get('/user/logout',{access_token:token}).then(res => {
                    alert('res  ' + res);
                    if(res.status !== 1){
                        console.log('退出失败')
                    }else {
                        console.log('退出成功');
                        session.removeItem('authInfoMerchant');
                        session.removeItem('oldEmail');
                        session.removeItem('fromOld');
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>