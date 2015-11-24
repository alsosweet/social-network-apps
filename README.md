#social-network-apps

sails 跨域访问设置 cors.js
手机端访问外部链接 "cordova-plugin-whitelist”,
================================================================================================
mysql 导入文件大小限制

You may need to check and change the upload size for both PHP and for MySQL.
Note, you’ll need to have root access to the server to do this.

Make these changes to php.ini:
>cd /etc/php5/apache2

edit the php.ini file and do the appropriate below changes
——————————————
# Maximum size of POST data that PHP will accept.
post_max_size = 100M

# Maximum allowed size for uploaded files.
upload_max_filesize = 100M

edit the my.cnf file with the right changes

>cd /etc/mysql

Here it finds the my.cnf
———————————-
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address	= 127.0.0.1
#
# * Fine Tuning
#
key_buffer	= 100M
max_allowed_packet	= 100M
—-
[mysqldump]
quick
quote-names
max_allowed_packet	= 100M

Don’t forget to restart the webserver (usually apache2) and MySQL after making these changes.

>/etc/init.d/mysql restart
>/etc/init.d/apache2 restart

Thats all
================================================================================================
connect mysql remotely
1.mysql -u root -p password
2.GRANT ALL ON *.* TO root@'%' IDENTIFIED BY 'password';
Query OK, 0 rows affected (0.00 sec)
3.root@ubuntu:/# vim /etc/mysql/my.cnf
4.comment the #bind-address           = 127.0.0.1
5.# service mysql restart

6.mysql -u root -p -h 10.211.55.4


ifconfig -a



show variables like 'character%';

set character to uft8,change the my.cnf
================================================================================================
去掉自动添加表格属性 models.js
  autoCreatedAt: false,
  autoUpdatedAt: false,
================================================================================================
token :
A more secure approach would be to store the token in SharedPreferences for Android, and Keychain for iOS
use SQlite for both instead of local storage
================================================================================================
http-auth-interceptor:

================================================================================================
================================================================================================
================================================================================================