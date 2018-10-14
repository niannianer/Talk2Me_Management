import Vue from 'vue';
import {getQuery,checkEmail,login, register,checkClaim} from '../tools/operation';
import Router from 'vue-router';
Vue.use(Router);
import {setTitle} from '../tools/operation';
import {session} from '../tools/store';

let routes = [];

let beforeEach = ((to, from, next) => {
    next()
    //管理系统
    // let authInfo = session.getItem('authInfo');
    // if(to.path == '/management/login' || to.path == '/management/register' || to.path == '/management/reset-password'){
    //     next()
    // }else {
    //     if (authInfo) {
    //         next()
    //     } else {
    //         session.setItem('logoutUrl', encodeURIComponent(window.location.href));
    //         window.location.href = 'http://test.hifleet.com/index.html';
    //     }
    // }
});

// import userRoutes from './merchant.js';
import managementRoutes from './management.js';

routes = routes.concat(managementRoutes);

routes.map(route => {
    route.path = `/management${route.path}`;
    route.beforeEnter = (to, from, next) => {
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        if (!route.meta.login) {
            if (route.children) {
                next();
            }else{
                return beforeEach(to, from, next);
            }

        } else {
            next();
        }
    };
    if (route.children) {
        route.children.map(child => {
            child.beforeEnter = (to, from, next) => {
                let {meta} = to;
                let {title} = meta;
                setTitle(title);
                if (!child.meta.login) {
                    return beforeEach(to, from, next);
                } else {
                    next();
                }
            };
        });
    }

});
routes.push({
    path: '*',
    redirect: '/management/login'
});

export default new Router({
    mode: 'history',
    routes
})