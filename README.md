# sans blog

1. 本地需要先启动mongodb 记得要关闭 brew services start mongodb-community
2. 项目中使用了next `new NextApp({ dir: 'app' })`
3. 有个bug nextapp 必须在 static app之后 不然staticapp 会不生效

## 安装

```
  npm i  
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

## 问题

1. 在linux 下装依赖时 存在一个 sharp 越权问题
2. 在linux下跑webpack编译，速度极慢，可能要换成中间有个编译机 
可用云编译处理：https://cloud.google.com/build/docs/concepts
