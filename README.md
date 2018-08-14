# weibo-crawler-client

微博爬虫客户端,与weibo-crawler配套,用于管理订阅与分析抓取情况

# 使用
- 订阅需要订阅的微博uid、个性域名
- 等待抓取结果，分析

## 运行

克隆
```
git clone https://github.com/jydeng/weibo-crawler.git;
```

安装依赖

```
npm install;
```

编辑config.json
```
{
  "connection": {
    "host": "mysql ip",
    "port": "mysql 端口号",
    "user": "mysql 用户名",
    "password": "mysql 密码",
    "database": "mysql 数据库名"
  },
  "crawler":{
    "day": 30
  }
}
```

启动项目

```
npm start;
```


## 说明

注意数据库配置