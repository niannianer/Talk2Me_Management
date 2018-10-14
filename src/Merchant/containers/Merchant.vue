<template>
    <div class="all" flex-box="1">
        <div>
            <nav-header @showLogout="showOut"></nav-header>
            <div class="loginOut" v-show="showLogout" v-on="{ mouseover: toOver, mouseout: toOut }">
                <a href="http://test.hifleet.com/PersonalCenter.html">个人中心</a>
                <a @click.prevent="logOut">注销</a>
            </div>
        </div>
        <div class="merchant" flex>
            <div class="menus" flex-box="0">
                <router-link class="menu" :to="{path:'/management/merchant/label-claim'}"
                             @click.native="changeTab('label-claim')"
                             active-class="menu-active"
                             :class='{"menu-active": path == "label-claim" }'
                             replace>
                    <div>
                        <img src="../images/side/side1.png">
                        <span>标注认领</span>
                    </div>
                </router-link>
                <router-link class="menu" :to="{path:'/management/merchant/my-service'}"
                             active-class="menu-active"
                             @click.native="changeTab('my-service')"
                             :class='{"menu-active": path == "my-service" }'
                             replace>
                    <div>
                        <img src="../images/side/side2.png">
                        <span>我的服务</span>
                    </div>
                </router-link>
                <router-link class="menu" :to="{path:'/management/merchant/comment-list'}"
                             active-class="menu-active"
                             @click.native="changeTab('comment-list')"
                             :class='{"menu-active": path == "comment-list" }'
                             replace>
                    <div>
                        <img src="../images/side/side3.png">
                        <span>评价管理</span>
                    </div>
                </router-link>
                <router-link class="menu" :to="{path:'/management/merchant/attention-me'}"
                             active-class="menu-active"
                             @click.native="changeTab('attention-me')"
                             :class='{"menu-active": path == "attention-me" }'
                             replace>
                    <div>
                        <img src="../images/side/side4.png">
                        <span>关注我的</span>
                    </div>
                </router-link>
                <router-link class="menu" :to="{path:'/management/merchant/post-message'}"
                             active-class="menu-active"
                             @click.native="changeTab('post-message')"
                             :class='{"menu-active": path == "post-message" }'
                             replace>
                    <div>
                        <img src="../images/side/side5.png">
                        <span>信息发布</span>
                    </div>
                </router-link>
                <router-link class="menu" :to="{path:'/management/merchant/my-attention'}"
                             active-class="menu-active"
                             @click.native="changeTab('my-attention')"
                             :class='{"menu-active": path == "my-attention" }'
                             replace>
                    <div>
                        <img src="../images/side/side6.png">
                        <span>我的关注</span>
                    </div>
                </router-link>
                <router-link class="menu" :to="{path:'/management/merchant/contact-us'}"
                             active-class="menu-active"
                             @click.native="changeTab('contact-us')"
                             :class='{"menu-active": path == "contact-us" }'
                             replace>
                    <div>
                        <img src="../images/side/side7.png">
                        <span>合作联系</span>
                    </div>
                </router-link>
            </div>
            <router-view flex-box="1" class="content-view"></router-view>
        </div>
        <div class="nav-foot">
            <nav-footer></nav-footer>
        </div>
    </div>
</template>

<script>
    import '../less/merchant.less';
    import $api2 from '../../Common/tools/api2.js';
    import {session} from '../../Common/tools/store';
    import NavHeader from '../components/header/NavHeader.vue'
    import NavFooter from '../components/footer/NavFooter.vue'
    export default {
        name: 'merchant',
        data(){
            return{
               path: '',
               showLogout:false
            }
        },
        created(){
        },
        computed: {
        },
        components: {
            NavHeader,NavFooter
        },
        methods: {
            changeTab(tab){
                this.path = tab;
            },
            showOut(val){
                this.showLogout = val
            },
            toOver(){
                this.showLogout = true
            },
            toOut(){
                this.showLogout = false
            },
            //退出登录
            logOut(){
                let authInfo = session.getItem('authInfoMerchant');
                let token = authInfo.value;
                $api2.get('/user/logout',{access_token:token}).then(res => {
                    if(res.status !== 1){
                        console.log('退出失败')
                    }else {
                        session.removeItem('authInfoMerchant');
                        session.removeItem('oldEmail');
                        session.removeItem('fromOld');
                        window.location.href = 'http://test.hifleet.com/logout.html'
                    }
                })
            }
        }
    }
</script>
