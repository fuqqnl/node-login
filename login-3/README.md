# 登录功能（3）
## 介绍
加入了jade和mongodb,jade当做模板引擎，mongodb作为存储用户信息的数据库

mongodb安装在本地即可，安装可以去mongodb官网下载和查看安装方法，安装完以后配置环境变量，这里我就不展开了。

配置好环境变量后，可以启动

本节中，新加的内容是cookie和session，并且开发了自动登录功能，对以前的登录、注册逻辑也做了一部分优化。

## 安装启动
> 前置条件，需要安装并启动mongodb

```
// 安装
npm install 
// 启动
npm run start

```
访问[http://localhost:3000](http://localhost:3000) 即可进行调试

## 关于cookie和session
> 网上能查到很多这两者的区别和联系，这里我不展开讲，毕竟网上很多讲的比较细了。我想提的一点是把相关的敏感数据放在session,但是需要把session id放在客户端cookie中，这样通过cookie-parser和express-session可以自动的进行对比和识别。有的同学可能对session id放在cookie中存在疑问，觉得如果客户端禁用cookie，那么session也就用不了了。这里其实要分开看：1.如果禁用cookie，那么全世界绝大多数的网站将出现问题；2.也可以把session放在返回的url中，这里不展开说了。

> cookie 中存放用户名和密码，进行自动登录。当然这种的方法保密性会差一些，在项目中还没有用到加密。现在项目中放在session中比较多。在后面的例子中，我会改用session，供大家对比。

## 下节预告

> 这一节看了 ajax提交  + cookie + session操作，下一节准备把服务端的验证、自动登录改为session、用户名和密码进行加密存到数据库，把项目一步一步的进行完善。

> 如果我的付出对您来说有所帮助，那就别忘了点击一下右上角的star，这会给我更强的分享动力。^_^




