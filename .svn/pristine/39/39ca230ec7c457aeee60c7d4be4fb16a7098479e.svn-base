<template>
    <div class="empty-body" :style="styles">
        <div><img src="../../../Merchant/images/no-claim.png" class="empty-img"/></div>
        <!--<div class="text_1" v-html="mainText || '空空如也~'"></div>-->
        <div class="text_2" v-if="msgText">{{msgText}}</div>
        <div class="btn-wrap" v-if="pathUrl" @click.stop="pathTo()">
            <button class="empty-btn">{{btnText}}</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'empty-show',
        props: ['mainText','msgText', 'btnText','pathUrl','island','styles'],
        methods: {
            pathTo(){
                if(this.island){
                    window.location.href = this.pathUrl;
                    return;
                }
                this.$router.push(this.pathUrl);
            }
        }

    }
</script>
<style lang="less" scoped="">
    .empty-body{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        width: 100%;
        padding: 0 20px;
        .empty-img{
            width: 126px;
            height: 126px;
        }
        .text_1{
            color: #999;
            font-size: 16px;
            margin-top: 16px;
        }
        .text_2{
            color: #6E3018;
            margin-top: 16px;
        }
        .btn-wrap{
            padding: .2rem .25rem;
            min-width: 2rem;
            margin: 3.2rem auto 0;
            border-radius: 2rem;
            display: inline-block;
            .empty-btn{
                border-radius: .3rem;
                font-size: .8rem;
                color: #fff;
                padding: 0 1.8rem;
                height: 1.9rem;
                background: #64C707;
            }
        }

    }
</style>
