/**
 * Created by DELL on 2018/3/27.
 */
'use strict';
const mutations = {};

// 服务商类型
mutations.setMaerchanttype = (state, data) => {
    state.maerchanttype = data;
};
//用户名邮箱
mutations.setUserEmail = (state, data) => {
    state.userEmail = data;
};

////////////////////////////////////
//服务商相关页面使用
// unionid
mutations.setUnionid = (state, data) => {
    state.unionid = data;
};
//用户信息
mutations.setClaimedInfo = (state, data) => {
    if(data.status == 1) {
        state.isClaimed = true;//用户是否认领过商家
        state.claimedMId = data.content.merchantId;//该账户认领的商家id
    }
};
export default  mutations;
