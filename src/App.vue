<template>
    <div id="app" class="app" flex="dir:top">
        <div flex-box="1" flex="dir:top">
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
