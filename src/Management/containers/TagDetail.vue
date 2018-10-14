<template>
    <div class="tag-detail"  flex="dir:top">
        <div class="item-card" flex-box="0">
            <div class="card-item" flex>
                <div class="title" flex-box="1">商家名称</div>
                <input flex-box="0" placeholder="商家名称"/>
            </div>
            <div class="card-item" flex>
                <div class="title" flex-box="1">公司类型</div>
                <div flex-box="0" class="icon-warp" @click="selectEd">
                    <img src="../images/arrow-right.png"/>
                </div>
            </div>
            <div class="card-item" flex>
                <div class="title" flex-box="1">服务港口</div>
                <input flex-box="0" placeholder="商家名称"/>
            </div>
            <div class="card-item" flex>
                <div class="title" flex-box="1">提供的服务</div>
                <input flex-box="0" placeholder="提供的服务"/>
            </div>
            <div class="card-item" flex>
                <div class="title" flex-box="1">地址</div>
                <input flex-box="0" placeholder="地址"/>
            </div>
            <div class="card-item" flex>
                <div class="title" flex-box="1">联系人</div>
                <input flex-box="0" placeholder="联系人"/>
            </div>
            <div class="card-item" flex>
                <div class="title" flex-box="1">联系电话</div>
                <input flex-box="0" placeholder="地址"/>
            </div>
            <div class="card-item" flex>
                <div class="title" flex-box="1">Email</div>
                <input flex-box="0" placeholder="地址"/>
            </div>
        </div>
        <div class="item-card" flex-box="0">
            <div class="card-item" flex="cross:center">
                <div class="title" flex-box="1">产品及服务图片或文件</div>
                <div flex-box="0" class="icon-warp">
                    <div class="avatar-item">
                        <image-upload :maxSize="maxSize" @loaded="imageuploaded">
                            <img class="img" :src="advisorAvatar || defaultAvatar"/>
                        </image-upload>
                    </div>
                    <img src="../images/arrow-right.png"/>
                </div>
            </div>
        </div>
        <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible"
        ></mt-actionsheet>
    </div>
</template>
<script>
    import Vue from 'vue';
    import $api from '../../Common/tools/api';
    import {mapState} from 'vuex';
    import ImageUpload from '../components/ImageUpload';
    import  '../less/my-profile.less'
    // Vue.component(Actionsheet.name, Actionsheet);
    export default {
        name: 'tag-detail',
        data(){
            return {
                maxSize: 10,
                actions: [{
                    name: '先生',
                    method: () => {
                        this.callback('先生')
                    }
                }, {
                    name: '女士',
                    method: () => {
                        this.callback('女士')
                    }
                }],
                sheetVisible: false,
                isFull: false
            }
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
