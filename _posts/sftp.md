### 1.查看服务器资源

df -h 规划文件文件目录

例如/opt/file/sftp/ftp



### 2.添加用户，组操作

添加组

```
sudo groupadd sftp
```

添加用户，用户主目录是/srv/sftpuser

/sbin/nologin    不允许该账号登录，只能用于sftp

```text
sudo useradd -g sftp -d /srv/sftpuser -s /sbin/nologin sftp

```

修改密码

```text
passwd sftp
```



### 3、目录权限

**/opt/file  设置权限**

chown -R root:root  /opt/file

**/opt/file/sftp**

**/opt/file/sftp/ftp**      这两级目录给sftp账号

chmod 777 /opt/file

chown -R sftp:sftp /opt/file/sftp



### 4、修改配置文件

vim /etc/ssh/sshd_config

注释一行，添加一行

```
#Subsystem      sftp    /usr/libexec/openssh/sftp-
  Subsystem sftp internal-sftp

```



### 5、重启sftp

systemctl restart sshd



### 6、测试sftp

sftp sftp@localhost



### nginx配置

```
    server {
         listen    9000;
         server_name  localhost;
         client_max_body_size 200M;
                location ^~ /ftp/ {
                        root   /opt/file/sftp/;
                        autoindex       on;
                        autoindex_exact_size   off;
                        autoindex_localtime     on;
                }
     }
```







