## 修改配置文件
配置文件: `/etc/sysconfig/network-scripts/ifcfg-ens33`



```
TYPE=Ethernet # 类型为以太网
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=dhcp # 是否自动获取IP(none, static, dhcp:自动获取)
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes #IPv6启动了
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=ecff806a-72dd-470d-ba39-9f68193a75f0 # 唯一识别码
DEVICE=ens33 # 网卡设备名
ONBOOT=yes # 是否随网络服务启动

```

如果手动设置ip地址，即BOOTPROTO=none/static，需要设置下面四个选项
```
IPADDR=                 # IP地址
NETMASK=                # 子网掩码
GATEWAY=                # 网关
DNS1=                   # DNS
```

重启network服务：`systemctl restart network`

## DNS配置文件
配置文件：`/etc/resolv.conf`

## 基本命令
1. ifconfig 查看ip和子网掩码
2. ifdown 网卡设备名： 禁用网卡 
3. ifup 网卡设备名： 启用网卡
4. netstat 选项：  
    -t: 列出tcp协议端口  
    -u: 列出udp协议端口  
    -n: 不使用域名与服务吗，而使用ip端口号  
    -l: 仅列出在监听状态网络服务  
    -a: 列出所有网络连接  
    -p: 显示pid和程序名  
    常用命令：`netstat -nltup`或`netstat -an`  
    `netstat -rn`，`route -n`查看网关
5. nslookup [主机名或ip]： 进行域名与ip地址解析
    nslooup->server

traceroute [选项] IP或域名：路由跟踪命令

-n 使用ip，不使用域名，速度更快

`tcpdump -i eth0 -nnX port 21`抓包命令
-i 指定网卡
-nn 将数据包中的域名与服务转为ip和端口
-X 以十六进制和ASCII码显示数据包内容
port 指定监听端口