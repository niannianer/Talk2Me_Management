<template>
    <div class="register">
        <el-form :model="param" status-icon :rules="rules" ref="param" label-width="100px">
            <el-form-item label="账号" prop="username">
                <el-input type="username" v-model="param.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="param.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="param.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="param.email"></el-input>
            </el-form-item>
            <el-form-item flex="main:center">
                <el-button type="primary" @click="submitForm()">注册</el-button>
                <el-button @click="resetForm('param')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import $api from '../../Common/tools/api.js';
    import '../less/register.less';
    export default {
        name: 'register',
        data(){
            let checkName = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入账号'))
                } else {
                    $api.get('/user/ifexist',{userStr:value}).then(res => {
                        if(res.status == 1){
                            callback(new Error('该账号已被注册'))
                        }else {
                            callback()
                        }
                    })
                }
            };
            let checkEmail = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('邮箱不能为空'));
                }else {
                    $api.get('/user/ifexist',{userStr:value}).then(res => {
                        if(res.status == 1){
                            callback(new Error('该邮箱已被注册'))
                        }else {
                            callback()
                        }
                    })
                }
            };
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
                    username: '',
                    password: '',
                    checkPass: '',
                    email: ''
                },
                rules: {
                    username: [
                        { validator:checkName, trigger: 'blur'}
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
                        { validator: checkEmail, trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                    ]
                }

            }
        },
        created(){
        },
        computed: {},
        methods: {
            submitForm() {
                this.param.enabled = 1;
                this.param.roles = [{id:2,name:'ROLE_USER'}];
                console.log(JSON.stringify(this.param));
                $api.post('/user/save',this.param).then(res => {
                    if(res.status == 1){
                        this.$message.success('注册成功');
                        this.$router.replace('/management/login');
                    }else {
                        this.$message.error('注册失败')
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
