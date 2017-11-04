## http_stub_status_module
nginx的客户端状态
```
Syntax:	stub_status;
Default:	—
Context:	server, location
```
配置：conf.d/default.conf 
```
location /mystatus {
    stub_status; // 开启stub_status模块
}
```

打开浏览器：localhost/mystatus

```
Active connections: 4 // 活跃连接数
server accepts handled requests // 处理握手的总次数，连接数，总请求数
 11 11 12 
Reading: 0 Writing: 1 Waiting: 3 // 读，写，等待（开启keeplive）
```

## http_random_index_module
目录中随机选择一个主页
```
Syntax:	random_index on | off;
Default:	random_index off;
Context:	location
```
```
location / {
    random_index on;
}
```

## http_sub_module
http内容替换

`sub_filter_last_modified on | off;`
可以判断文件是否跟新，用户缓存

`sub_filter_once on | off`
匹配第一个还是所有

```
location / {
    sub_filter '<a href="http://127.0.0.1:8080/'  '<a href="https://$host/';
    sub_filter '<img src="http://127.0.0.1:8080/' '<img src="https://$host/';
    sub_filter_once on;
}
```

## http_limit_conn_module / http_limit_req_module
连接频率的限制，请求频率的限制

http协议的连接与请求：  
一个http请求需要tcp的三次握手，叫做tcp的连接，握手后才进行请求。

请求建立在连接的基础之上。不同http版本一个连接形成后可以进行多次请求也不同

http协议版本 | 连接关系
---         | ---
http1.0     | tcp不能复用
http1.1     | 顺序性tcp复用
http2.0     | 多路复用tcp复用（一个连接可以复用多个不同请求）


先定义好zone，后定义num
```
Syntax:	limit_conn_zone key zone=name:size; # 使用key value配置zone
Default:	—
Context:	http

Syntax:	limit_conn zone number; # number并发连接数
Default:	—
Context:	http, server, location
```

```
http {
    limit_conn_zone $binary_remote_addr zone=addr:10m;

    ...

    server {

        ...

        location /download/ {
            limit_conn addr 1;
        }
```