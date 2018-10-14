<template>
    <div id="app" class="app" flex="dir:top">
        <div flex-box="1" flex="dir:top">
            <div class="header-wrap" flex-box="0" flex="dir: top cross:center">
                <div class="name">Talk2Me 管理系统</div>
                <div flex="dir:right cross:center" flex-box="1" class="header-right">
                    <div class="logot">退出登录</div>
                    <div class="user-name">念念</div>
                </div>

            </div>
            <div id="body-warp" flex-box="1" flex="dir:top">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </div>

    </div>
</template>

<script>
    import './Common/less/app.less';

    export default {
        name: 'app',
        data(){
            return {

            }
        },
        computed: {

        },
        methods: {

        }
    }
</script>
