## tip
`curl -v host`展示请求信息
`nginx -c -t /etc/nginx/nginx.conf`检查配置文件是否正确



## nginx 日志类型

包括：error.log access.log

### log_format

Syntax: log_format name [escape=default|json] string ...;

Default: log format combined "...";

Context: http


/etc/nginx/nginx.conf:
```
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

access_log  /var/log/nginx/access.log  main;
```
/var/log/nginx/access.log: 
```
192.168.40.1 - - [02/Nov/2017:13:02:12 -0400] "GET /123 HTTP/1.1" 404 571 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36" "-"
```

### nginx 变量
http请求变量：arg_PARAMETER http_HEADER set_http_HEADER
1. http_HEADER 表示请求头变量，如要获取User-Agent，可以使用$http_user_agent

内置变量：[nginx文档http_log_module模块中有详细介绍](http://nginx.org/en/docs/http/ngx_http_log_module.html)

自定义变量
