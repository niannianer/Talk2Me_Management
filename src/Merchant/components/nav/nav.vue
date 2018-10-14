<template>
	<div class="nav-title" flex>
		<div v-html="title" class="span"></div>
	</div>
</template>
<script>
	export default {
        name: 'port-select',
        props: ['title'],
        data(){
            return {}
        }
    }
</script>
<style lang="less" scoped="">
	.nav-title {
		padding: 10px 0;
		margin-bottom: 10px;
		margin-left: -20px;
	}
	.nav-title .span{
	    color: #000;
	    font-weight: 700;
	    padding-left: 16px;
	    border-left: 4px solid #0071c8;
		font-size: 16px;
	}
</style>