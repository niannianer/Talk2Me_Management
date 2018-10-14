# IntratadeSystem_web
#test
> A Vue.js project

## Build Setup

``` bash
# 全局安装webpack
cnpm install -g webpack

# 安装依赖
cnpm install

# 打包代码
webpack

# 开发过程中, 打包代码
cnpm run dev
```
# nginx 配置
```
server{
	   listen       8082;

       server_name  localhost;
	    location / {
			root /shcb/web-kingold/html;
            add_header Cache-Control 'no-store';
			index  index.html index.htm;

			try_files $uri $uri/ /index.html =404;
		  }
		   location ~* ^.+\.(css|js|txt|xml|swf|wav|png|jpg|json|woff|ttf)$ {
			root  /shcb/web-kingold;
			access_log   off;
			expires      30d;
		}
	}


```
访问 [localhost:8082/test](http://localhost:8082/test)

# 代码规范

## 目录结构
* 如src/ 下所示

* 注意 containers 为展示组件，每个页面对应该目录下的一个vue文件，components 为公用组件，如Toast，Alert等
## 命名规则
* js，less文件用小写字母命名，单词之间以 - 分割，image文件实际上也应该如此
* Vue 文件首字母大写，多个单词组成时，所有首字母大写，比如 Toast，CicleProgress
* 函数，变量名使用驼峰命名规则  ,比如user ,getUser
* 样式的class 用小写字母命名，单词之间以 - 分割，比如.login ,.login-tab

## 样式书写规则

* 每个less文件由独立，唯一的class包裹，通常为该less的文件名，比如login.less如下
```less
.login {
    width: 100%;
    height: 100%;
    .other{
    ...
    }
}
```
这样可避免样式冲突，，每个container组件对应一个less文件

* 使用变量，常用的字体颜色以及背景颜色变量存放于less/variables.less文件里，使用时只需引入该文件

* web 端内容区宽度固定为1024px ，字体大小以及容器宽高 ，按照设计师标注编写。
```less
 .content{
                position: relative;
                height: 78px;
                line-height: 78px;
                width: @warp-width;
                margin: auto;
                color: #C59759;
            }
```



##  服务端通信
*  使用fetch，api已经封装于tools/api.js 里

## 使用es6
* 使用es6语法
* 引入 babel-polyfill ,推荐使用es6 原生方法。

