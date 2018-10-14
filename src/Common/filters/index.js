/**
 * Created by DELL on 2018/4/3.
 */
//日期格式化
export let timeFormater = (timeStamp, fmt = 'yyyy-MM-dd hh:mm:ss.S') => {
    if(!timeStamp) return '';
    let time = new Date(timeStamp);
    let o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//公司类型
export let marchantText = (code) => {
    let output = '';
    if(!code) return '';
    switch(code){
        case 1:
            output = '个人';
            break;
        case 2:
            output = '企业';
            break;
        case 3:
            output = '机构';
            break;
        default: 
            break;
    }
    return output;
};

//商家审核状态(1：待审核，2：补充材料，3：未通过，4：通过)
export let auditStatusText = (code) => {
    let output = '';
    if(!code) return '';
    switch(code){
        case 1:
            output = '待审核';
            break;
        case 2:
            output = '补充材料';
            break;
        case 3:
            output = '未通过';
            break;
        case 4:
            output = '通过';
            break;
        default: 
            break;
    }
    return output;
};
//信息发布审核状态
export let issueStatusText = (code) => {
    let output = '';
    if(!code) return '';
    switch(code){
        case 1:
            output = '待审核';
            break;
        case 2:
            output = '审核不通过';
            break;
        case 3:
            output = '审核通过';
            break;
        case 4:
            output = '发布成功';
            break;
        default:
            break;
    }
    return output;
};
//状态  （0：失效  1：正常）
export let statusText = (code) => {
    let output = '';
    if(!code) return '';
    if(code == 0){
        output = '失效'
    }else if(code == 1){
        output = '正常'
    }
    return output;
}


