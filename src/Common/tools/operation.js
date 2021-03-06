/**
 * Created by R.lq on 2018/3/27.
 */
import $api from './api';
import $apim from './api2';
import {session} from '../tools/store';
import store from '../store';
//设置页面标题
export let setTitle = (title) => {
    setTimeout(function () {
        //利用iframe的onload事件刷新页面
        document.title = title || '上海迈利船泊';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
};

//管理系统获取新的Token
export let refreshToken = () => {
    let authInfo = session.getItem('authInfo');
    return $api.post(`/oauth/token?grant_type=refresh_token&refresh_token=${authInfo.refreshValue}`,{},'refreshToken')
    .then(res => {
        return res;
    });
};
//服务商用户系统获取新的Token
export let refreshTokenMerchant = () => {
    let authInfo = session.getItem('authInfoMerchant');
    return $api.post(`/oauth/token?grant_type=refresh_token&refresh_token=${authInfo.refreshValue}`,{},'refreshToken')
    .then(res => {
        return res;
    });
};
//加密参数
export let compile = (str,key) => {
    let strings = "";
    for (let i = 0; i < str.length; i++) {
        strings += String.fromCharCode(str.charCodeAt(i) + key)
    }
    return escape(strings);
};
//解密参数email,pwd,merchantId
export let uncompile = (str,key) => {
    let strings = "";
    str = unescape(str);
    for (let i = 0; i < str.length; i++) {
        strings += String.fromCharCode(str.charCodeAt(i)-key);
    }
    return strings;
};
//获取老系统的参数email，password
export let getQuery = (name) => { 
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let eUrl = uncompile(window.location.search,180);
    let r = eUrl.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null; 
} ;
//注册
export let register = (email,password) => {
    let param = {
        username: email,
        password: password,
        email: email,
        enabled:1,
        roles:[{id:2,name:'ROLE_USER'}]
    };
    return new Promise((resolve,reject)=>{
       return $apim.post('/user/save',param).then(res => {
            if(res.status == 1){
                console.log('注册成功');
                resolve()
            }else {
                reject('register error')
                console.log('注册失败')
            }
        }); 
    })
    
};
//登录
export let login = (email,password) => {
    return new Promise((resolve,reject)=>{
        return $apim.post(`/oauth/token?username=${email}&password=${password}&grant_type=password`,{},'login').then(res => {
                if (res){
                    session.setItem('oldEmail',email);
                    store.commit('setUnionid',email);
                    session.setItem('authInfoMerchant',{value: res.value,refreshValue: res.refreshToken.value});
                    //store.replace('/management/merchant/label-claim');
                    resolve();
                }else{
                    console.log('error')
                    reject('error');
                }
            })
    })
    
};
//检查是否已注册
export let checkEmail = (email,password) => {
   return new Promise((resolve,reject)=>{
    return $apim.get('/user/ifexist',{userStr:email}).then(res => {
       resolve(res)
    })
   })
};
//判断是否认领
export let checkClaim = () => {
    return new Promise((resolve,reject)=>{
        let email = session.getItem('oldEmail');
        console.log('email22  ' + email);
        store.commit('setUnionid',email);
        if(!email){
            return false;
        }
        return $apim.get('/secure/merchant/query/id',{userid: email}).then(res => {
            console.log('res22  ' + JSON.stringify(res));
            if (res.status == 1){
                session.setItem('claimedMId',res.content.merchantId)//该账户认领的商家id
                session.setItem('isClaimed',true);//用户是否认领过商家
                store.commit('setClaimedInfo',res)
                resolve({isClaimed: true});
            }else {
                session.setItem('claimedMId','')//该账户认领的商家id
                session.setItem('isClaimed',false);//用户是否认领过商家
                resolve({isClaimed: false});
            }
        });
        
    })
    
};
let $operation = {
    setTitle,
    refreshToken,
    refreshTokenMerchant,
    getQuery,
    login,
    register,
    checkEmail,
    compile,
    uncompile
};
export default $operation;

