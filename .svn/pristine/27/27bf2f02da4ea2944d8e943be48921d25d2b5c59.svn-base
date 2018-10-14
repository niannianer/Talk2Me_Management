<template>
    <div class="reset-password">
        <el-form :model="param" status-icon :rules="rules" ref="param" label-width="100px">
            <el-form-item label="账号" prop="user">
                <el-input type="user" v-model="param.user" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="param.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="param.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item flex="main:center">
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm('param')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import $api from '../../Common/tools/api.js';
    import '../less/reset-password.less';
    export default {
        name: 'reset-password',
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.param.checkPass !== '') {
                        this.$refs.param.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.param.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                param: {
                    user: '',
                    password: '',
                    checkPass: '',
                },
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }

            }
        },
        created(){
            this.param.user = this.$route.query.userstr;
        },
        computed: {},
        methods: {
            submitForm() {
                $api.get('/user/resetpassword',this.param).then(res => {
                    if(res.status == 1){
                        this.$message.success('修改成功');
                        this.$router.replace('/management/login');
                    }else {
                        this.$message.error('修改失败')
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted(){

        },
        destroyed(){

        }
    }
</script>
