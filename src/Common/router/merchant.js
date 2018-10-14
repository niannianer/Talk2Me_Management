//PC服务商
import Merchant from '../../Merchant/containers/Merchant';
import LabelClaim from '../../Merchant/containers/LabelClaim';
import MyService from '../../Merchant/containers/MyService';
import MerchantEdit from '../../Merchant/containers/MerchantEdit';
import ClaimEdit from '../../Merchant/containers/ClaimEdit';
import CommentList from '../../Merchant/containers/CommentList';
import AttentionMe from '../../Merchant/containers/AttentionMe';
import PostMessage from '../../Merchant/containers/PostMessage';
import ContactUs from '../../Merchant/containers/ContactUs';
import MyAttention from '../../Merchant/containers/MyAttention';
import merchantSearch from '../../Merchant/containers/MerchantSearch';
import NoClaim from '../../Merchant/containers/NoClaim';
import MerchantUpdate from '../../Merchant/containers/MerchantUpdate';
import AuthentitionUpdate from '../../Merchant/containers/AuthentitionUpdate';
import Logout from '../../Merchant/containers/Logout';

//PC搜索服务商
import FacilitatorSearch from '../../Merchant/containers/FacilitatorSearch';
import FacilitatorDetails from '../../Merchant/containers/FacilitatorDetails';
import FacilitatorComment from '../../Merchant/containers/FacilitatorComment';


let merchantRoutes = [
    {
        path: '/merchant',
        name: 'merchant',
        component: Merchant,
        meta: {
            title: '服务商'
        },
        children:[
            {
                path: 'label-claim',
                name: 'label-claim',
                component: LabelClaim,
                meta: {
                    title: '标注和认领'
                }
            },
            {
                path: 'my-service',
                name: 'my-service',
                component:  MyService,
                meta: {
                    title: '我的服务'
                }
            },
            {
                path: 'merchant-edit',
                name: 'merchant-edit',
                component: MerchantEdit,
                meta: {
                    title: '编辑服务商'
                }
            },
            {
                path: 'claim-edit',
                name: 'claim-edit',
                component: ClaimEdit,
                meta: {
                    title: '认证服务商'
                },
            },
            {
                path: 'comment-list',
                name: 'comment-list',
                component: CommentList,
                meta: {
                    title: '服务管理'
                },
            },
            {
                path: 'merchant-search',
                name: 'merchant-search',
                component: merchantSearch,
                meta: {
                    title: '服务商查找'
                },
            },
            {
                path: 'no-claim',
                name: 'no-claim',
                component: NoClaim,
                meta: {
                    title: '我的服务商'
                },
            },{
                path: 'merchant-update',
                name: 'merchant-update',
                component: MerchantUpdate,
                meta: {
                    title: '服务商信息修改'
                },
            },{
                path: 'authentition-update',
                name: 'authentition-update',
                component: AuthentitionUpdate,
                meta: {
                    title: '认证信息修改'
                },
            },{
                path: 'attention-me',
                name: 'attention-me',
                component: AttentionMe,
                meta: {
                    title: '关注我的'
                },
            },{
                path: 'post-message',
                name: 'post-message',
                component: PostMessage,
                meta: {
                    title: '信息发布'
                },
            }, {
                path: 'my-attention',
                name: 'my-attention',
                component: MyAttention,
                meta: {
                    title: '我的关注'
                },
            }, {
                path: 'contact-us',
                name: 'contact-us',
                component: ContactUs,
                meta: {
                    title: '合作联系'
                },
            }


        ]
    },
    
    {
        path: '/merchant/facilitator-details',
        name: 'facilitator-details',
        component: FacilitatorDetails,
        meta: {
            title: '服务商搜索详情'
        },
    },
    {
        path: '/merchant/facilitator-comment',
        name: 'facilitator-comment',
        component: FacilitatorComment,
        meta: {
            title: '服务商评价'
        },
    },
    {
        path: '/merchant/logout',
        name: 'logout',
        component: Logout,
        meta: {
            title: '注销'
        },
    }
];
export  default merchantRoutes;
