# 登录功能（2）
## 介绍
加入了jade和mongodb,jade当做模板引擎，mongodb作为存储用户信息的数据库

mongodb安装在本地即可，安装可以去mongodb官网下载和查看安装方法，安装完以后配置环境变量，这里我就不展开了。

配置好环境变量后，可以启动

对于HTTP请求来说，我们通常使用的是Get和Post。而对于get来说，只是对字符串的传输，它会被添加到URL地址里，属于URL的一部分，有时，我们为了安全和兼容性问题，URL地址上的参数会进行Url的encode，有的浏览器已经带我们做了这些；而对于Post来说，就显得重了一些，它的数据以包的形式存在，除了可以有文本信息，还可以有二进制文件流信息，这讲里，我们主要说的是Post里的文本处理。

## 安装启动
> 前置条件，需要安装并启动mongodb

```
// 安装
npm install 
// 启动
npm run start

```
访问[http://localhost:3000](http://localhost:3000) 即可进行调试

## 关于表单提交
> 用的是最古老的form表单提交，虽然这种方式现在用的比较少了，但是可以学到如何从body体中取数据，如何通过jquery的form插件做出页面不刷新也能类似ajax的效果。

> 账户的登录和新建并没有进行校验和对password的md5加密，主要是为了让逻辑比较易懂，一步一步的在骨架上增加血肉。

## 下节预告

> 这一节学会了传统的form提交，下一节我们将迈进 ajax提交 + 登录验证 + cookie操作，所以下节更精彩喔。

> 如果我的付出对您来说有所帮助，那就别忘了点击一下右上角的star，这会给我更强的分享动力。^_^




