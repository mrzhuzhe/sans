# Sans Blog

## 概述

1. 整体用keystonejs 5 框架
2. 前台是 nextjs + reactjs `new NextApp({ dir: 'app' })` nextjs 在 /app 文件夹下 reactjs 在 nextjs 之上以组建的形式引入
3. 前后台衔接是 graphql graphiql
4. 管理后台是 keystonejs
5. 数据库是 mongodb


## 开发和启动

```
  //  本地需要先启动mongodb 记得要关闭 
  brew services start mongodb-community
  //  安装
  npm i  
  //  开发
  npm run dev
  //  生产编译
  npm run build
  //  生产运行
  npm run start
```

## 链接地址

```
    //  后台
    http://localhost:3000/admin/
    //  graphql api
    http://localhost:3000/admin/api
    //  graphiql 
    http://localhost:3000/admin/graphiql
```

## 未解决问题

1. 【linux 下装依赖】 存在一个 sharp 越权问题
2. 【无持续集成】在linux下跑webpack编译，速度极慢，可能要换成中间有个编译机 
可用云编译处理：https://cloud.google.com/build/docs/concepts
3. 【cookie支持https】存在一个securecookie的问题 
https://gist.github.com/molomby/6fa22c165e0025f0f83d55195f3c6e37

## bug

1. nextapp 必须在 static app之后 不然staticapp 会不生效
2. 服务器上打包卡住时无法 ssh 登陆，需要查一下日志，确认是dump了还是资源抢占引起的


## 待开发功能

1. 文章留言： 引入了disqus 实际情况还需测试
2. 上传图片
3. 前台markdown引擎： 还需要调整插件设置和样式问题
4. 解决持续集成的问题
