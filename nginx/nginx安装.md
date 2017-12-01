## 安装前准备
1. 确认yum可用
    `yum list | grep gcc`
2. 确认关闭iptables
    `iptables -F`
    `iptables -t nat -F`
3. 确认停用selinux
    `gettenforce`
    `setenforce 0`
4. 初始化目录
    cd /opts; mkdir app download logs work backup
5. 安装依赖包
    `yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake`

## 通过yum源进行安装

[打开nginx推荐安装的yum源](http://nginx.org/en/linux_packages.html#stable)

新建文件/etc/yum.repos.d/nginx.repo来设置yum源
```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```
测试：`yum list | grep nginx`

安装：`yun install nginx`

## 基本参数
安装目录：`rpm -ql nginx`

路径 | 类型 | 作用
----|-----|----
/etc/logrotate.d/nginx | 配置文件      | nginx日志轮转，用于logrotate服务日志的切割
/etc/nginx/            | 目录、配置文件 | nginx主配置文件
/etc/nginx/fastcgi_params| 配置文件    | cgi配置相关，fastcgi配置
/etc/nginx/uwsgi_params  | ...       |
/etc/nginx/scgi_params   | ...       |
/etc/nginx/mime.types    | ...       | 设置http协议的Content-Type于扩展名对应关系
/usr/lib/systemd/system/nginx.service| | 用于配置出系统守护进程管理器管理方式
/usr/lib64/nginx/modules | 目录 | nginx模块目录
/usr/sbin/nginx          | 命令 | nginx服务启动管理的终端命令
/var/log/nginx           | 目录 | 日志


编译参数：`nginx -V`
```
// 安装目录或路径
--prefix=/usr/share/nginx  // 安装目录
--sbin-path=/usr/sbin/nginx // 执行命令安装目录
--modules-path=/usr/lib64/nginx/modules // 模块目录 
--conf-path=/etc/nginx/nginx.conf // 配置文件目录
--error-log-path=/var/log/nginx/error.log // 错误日志
--http-log-path=/var/log/nginx/access.log // 访问日志
--pid-path=/run/nginx.pid // 启动文件的pid
--lock-path=/run/lock/subsys/nginx // nginx锁

// 执行对应模块时nginx所保留的临时性文件
--http-client-body-temp-path=/var/lib/nginx/tmp/client_body 
--http-proxy-temp-path=/var/lib/nginx/tmp/proxy 
--http-fastcgi-temp-path=/var/lib/nginx/tmp/fastcgi 
--http-uwsgi-temp-path=/var/lib/nginx/tmp/uwsgi 
--http-scgi-temp-path=/var/lib/nginx/tmp/scgi 

// 设定nginx进程启动的用户和组用户
--user=nginx 
--group=nginx 

// 设置额外的参数将被添加到CFLAGS变量
--with-cc-opt=parameters

// 设置附加的参数，链接系统库
--with-ld-opt=parameters

--with-file-aio
--with-ipv6 --with-http_ssl_module --with-http_v2_module 
--with-http_realip_module --with-http_addition_module 
--with-http_xslt_module=dynamic --with-http_image_filter_module=dynamic 
--with-http_geoip_module=dynamic --with-http_sub_module 
--with-http_dav_module --with-http_flv_module --with-http_mp4_module 
--with-http_gunzip_module --with-http_gzip_static_module 
--with-http_random_index_module --with-http_secure_link_module 
--with-http_degradation_module --with-http_slice_module 
--with-http_stub_status_module --with-http_perl_module=dynamic 
--with-mail=dynamic --with-mail_ssl_module --with-pcre --with-pcre-jit 
--with-stream=dynamic --with-stream_ssl_module

```