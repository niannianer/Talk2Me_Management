/**
 * Created by DELL on 2018/3/27.
 */

'use strict';
const actions = {};
import $api from '../../Common/tools/api';
import $api2 from '../../Common/tools/api2';
import {session} from '../tools/store';
//服务商类型
let getMaerchanttype = () => {
    return $api.get('/secure/merchant/maerchanttype/query');
};
actions.getMaerchanttype = ({commit}) => {
    return getMaerchanttype()
        .then(data => {
            commit('setMaerchanttype', data || []);
            return data;
        });
};

////////////////////////////////////
//服务商相关页面项目使用
//判断账号是否认领过
let getIsClaimed = (email) => {
    return $api2.get('/secure/merchant/query/id',{
        userid: email || 12
    });
};
actions.getIsClaimed = ({commit}, email) => {
    return getIsClaimed(email)
        .then(data => {
            if(data.status == 0){
                data.content = {};
            }
            session.setItem('userInfo',data);
            commit('setClaimedInfo',data);
            session.setItem('claimedMId',data.content.merchantId || '')
            return data;
    })
};
export default actions;
