<template>
    <div class="nav-header">
        <div class="content" flex="main:justify">
            <div flex>
                <div class="img">
                    <img src="../../images/imgFolder/logo.png">
                </div>
                <div flex>
                    <span class="home-page"><a href="http://test.hifleet.com/index.html" target="_self">首页</a></span>
                    <span class="dynamic"><a href="http://test.hifleet.com/prelogin.do" target="_blank">船舶动态</a></span>
                    <span class="record"><a href="http://test.hifleet.com/shipdetail.html" target="_self">船舶档案</a></span>
                    <span class="entrance"><a href="#" target="_self">服务商入口</a></span>
                    <span class="app-down"><a href="http://test.hifleet.com/appdownload.html" target="_self">APP下载</a></span>
                    <span class="service"><a href="http://test.hifleet.com/serviceprice.jsp" target="_self">服务与价格</a></span>
                </div>
            </div>
            <div class="name">
                <span class="login" v-on="{ mouseover: doOver, mouseout: doOut }"><img :src="headUrl" v-if="username != '登录/注册'"><div style="display: inline-block;padding: 0 5px">{{username}}</div><img :src="openUrl" v-if="username != '登录/注册'"></span>
                <span><a href="http://123.56.70.140:8182" target="_blank">旧版</a></span>
                <span style="color:#84d138">ENGLISH</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {session} from "../../../Common/tools/store";

    export default {
        name: "nav-header",
        data(){
            return {
                username:'',
                headUrl:require('../../images/imgFolder/headerUserName.png'),
                openUrl:require('../../images/imgFolder/oceanopen.png')
            }
        },
        created(){
            this.username = session.getItem('oldEmail') || '登录/注册'
        },
        methods: {
            doOver(){
                this.headUrl = require('../../images/imgFolder/headerUserNameActive.png');
                this.openUrl = require('../../images/imgFolder/oceanopenActive.png');
                this.$emit('showLogout',true)
            },
            doOut(){
                this.headUrl = require('../../images/imgFolder/headerUserName.png');
                this.openUrl = require('../../images/imgFolder/oceanopen.png');
                this.$emit('showLogout',false)
            }
        }
    }
</script>

<style lang="less" scoped>
    .nav-header {
        width: 100%;
        height: 70px;
        background-color: #f0f1f3;
        .content {
            max-width: 1200px;
            margin: 0 auto;
            span {
                font-size: 16px;
                padding: 0 15px;
                line-height: 70px;
                color: #000;
                cursor: pointer;
                &:hover {
                    color: #64c800;
                }
                a {
                    color: #113963;
                    text-decoration: none;
                    &:hover {
                        color: #64c800;
                    }
                }
            }
            .img {
                margin-right: 31px;
                img {
                    width: 169px;
                    height: 46px;
                    margin: 12px 0;
                }
            }
            .name {
                img {
                    width: 18px;
                    height: 18px;
                    vertical-align: sub;
                }
            }
        }
        @media screen and (max-width: 1200px) {
            .login {
                display: none;
            }
        }
        @media screen and (max-width: 950px) {
            .service {
                display: none;
            }
        }
        @media screen and (max-width: 850px) {
            .app-down {
                display: none;
            }
        }
        @media screen and (max-width: 750px) {
            .entrance {
                display: none;
            }
        }
        @media screen and (max-width: 640px) {
            .record {
                display: none;
            }
        }
        @media screen and (max-width: 540px) {
            .dynamic {
                display: none;
            }
        }
    }
</style>