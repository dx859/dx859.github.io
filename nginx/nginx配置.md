## nginx默认配置

/etc/nginx/conf.d/default.conf

```
server {
    listen       80;            #侦听80端口
    server_name  localhost;     #定义使用www.xx.com访问

    #charset koi8-r;                  #字符编码
    #access_log  /var/log/nginx/log/host.access.log  main;     #设定本虚拟主机的访问日志

    location / {         #默认请求
        root   /usr/share/nginx/html;       #定义服务器的默认网站根目录位置
        index  index.html index.htm;        #定义首页索引文件的名称
    }

    #error_page  404              /404.html;            #定义错误提示页面

    # redirect server error pages to the static page /50x.html   #重定向服务器错误页面
    #
    error_page   500 502 503 504  /50x.html;            #定义错误提示页面
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80  #代理服务器的PHP脚本到Apache侦听127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000    #通过PHP脚本到127.0.0.1:9000的FastCGI服务器监听
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```