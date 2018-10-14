'use strict'
const comDatas = {};
//认证状态
comDatas.auditStatus =[
    {nameZH: '待审核',value: 1},
    {nameZH: '补充材料',value: 2},
    {nameZH: '未通过',value: 3},
    {nameZH: '通过',value: 4}
];

//级别 1：标注服务商 2：认证服务商 3：付费服务商 4：品牌服务商
comDatas.levels =[
    {nameZH: '标注服务商',value: 1},
    {nameZH: '常用服务商',value: 2},
    {nameZH: '认证服务商',value: 3},
    {nameZH: '付费服务商',value: 4}
];

//信息状态 1：正常 0：失效
comDatas.infoStatus =[
    {nameZH: '正常',value: 1},
    {nameZH: '失效',value: 0},
];
//信息发布审核状态
comDatas.issueStatus =[
    {nameZH: '待审核',value: 1},
    {nameZH: '审核不通过',value: 2},
    {nameZH: '审核通过',value: 3},
    {nameZH: '发布成功',value: 4}
];

export default comDatas;