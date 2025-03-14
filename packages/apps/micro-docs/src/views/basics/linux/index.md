### Linux常用命令

```bash
# 列出目录
ls

# 查看全部文件，包括隐藏文件
ls -a

# 查看所有文件，不包括隐藏目录
ls -l

# 查看当前路径
pwd

# 切换目录(相对路径，相对于当前目录)
cd ./XXX

# 切换目录(绝对路径，相对于根目录)
cd /XXX

# 创建目录
mkdir <directory name>

# 创建文件
touch <file name>

# 删除文件夹（空文件夹才可删除）
rmdir <directory name>

# 删除多个嵌套文件夹
rmdir -p <directory name / directory name>

# 拷贝文件
cp <directory name / file name> <directory name>

# 删除文件
rm <file name>

# 删除文件(强制删除)
rm -f <file name>

# 删除文件(强制递归删除)
rm -rf <directory name / file name>

# 重命名文件
mv <file name> <file name>

# 移动文件
mv <file name> <directory name / file name>
```

### vim

![](https://cdn.nlark.com/yuque/0/2023/png/2868710/1685622554891-8e0ebe29-30f8-421f-930d-49cc803d6a67.png)

```bash
# 打开文件
vim <file name>

# 进入后是命令模式，需要按i 就会进入编辑模式
-- INSERT --

# 编辑完成后按 Esc退出 + 英文:
# 保存退出
:wq
```

### Linux目录结构

![](https://cdn.nlark.com/yuque/0/2023/png/2868710/1685612332531-32ab8da4-8902-4377-9b11-c6943850c405.png)

- **/bin**：bin是Binary的缩写, 这个目录存放着最经常使用的命令。
- **/boot：** 这里存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。
- **/dev ：** dev是Device(设备)的缩写, 存放的是Linux的外部设备，在Linux中访问设备的方式和访问文件的方式是相同的。
- **/etc：** 这个目录用来存放所有的系统管理所需要的配置文件和子目录。
- **/home**：用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。
- **/lib**：这个目录里存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件。
- **/lost+found**：这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。
- **/media**：linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
- **/mnt**：系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。
- **/opt**：这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。
- **/proc**：这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。
- **/root**：该目录为系统管理员，也称作超级权限者的用户主目录。
- **/sbin**：s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。
- **/srv**：该目录存放一些服务启动之后需要提取的数据。
- **/sys**：这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
- **/tmp**：这个目录是用来存放一些临时文件的。
- **/usr**：这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录。
- **/usr/bin：** 系统用户使用的应用程序。
- **/usr/sbin：** 超级用户使用的比较高级的管理程序和系统守护程序。
- **/usr/src：** 内核源代码默认的放置目录。
- **/var**：这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。
- **/run**：是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。

### Linux文件属性

```bash
[root@VM-20-9-centos /]# ls -la
total 84
权限说明					属主 用户组 文件大小 时间
dr-xr-xr-x.  20 root root  4096 Jun  1 20:02 .
dr-xr-xr-x.  20 root root  4096 Jun  1 20:02 ..
lrwxrwxrwx.   1 root root     7 Mar  7  2019 bin -> usr/bin
dr-xr-xr-x.   5 root root  4096 Jul 20  2021 boot
drwxr-xr-x    2 root root  4096 Nov  5  2019 data
drwxr-xr-x   20 root root  3040 May 29 18:25 dev
drwxr-xr-x.  98 root root 12288 May 30 09:40 etc
drwxr-xr-x.   3 root root  4096 Jul 20  2021 home
```

第一个字符代表：

- 当为[ **d** ]则是目录
- 当为[ **-** ]则是文件；
- 若是[ **l** ]则表示为链接文档 ( link file )；
- 若是[ **b** ]则表示为装置文件里面的可供储存的接口设备 ( 可随机存取装置 )；
- 若是[ **c** ]则表示为装置文件里面的串行端口设备，例如键盘、鼠标 ( 一次性读取装置 )。

![](https://cdn.nlark.com/yuque/0/2023/png/2868710/1685621108373-f4dbc224-b5f1-488b-8805-08523ab192cd.png)

#### 文件属性命令

```bash
# 更改文件属组
chgrp [-R] <属组名> <文件名>

# 更改文件属主，也可以同时更改文件属组
chown [–R] <属主名> <文件名>
chown [-R] <属主名>：<属组名> <文件名>

# 更改文件9个属性
chmod [-R] xyz <文件或目录>
```

### Linux网络

```bash
# 查看ip地址
ifconfig

ip addr
```

#### 测试网络联通

```bash
# 测试ip
ping <ip or 域名>

# 测试端口
telnet www.baidu.com 80
```

[curl 的用法指南](http://www.ruanyifeng.com/blog/2019/09/curl-reference.html)

### Linux防火墙

第一次链接远程服务的时候发现连不上，安全组也开通了端口。

结果发现Linux防火墙关闭其实也是访问不了的，需要开启防火墙并且开放端口。

```bash
# 查看防火墙状态
systemctl status firewalld

● firewalld.service - firewalld - dynamic firewall daemon
Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)
# 未开器防火墙
Active: inactive (dead)
Docs: man:firewalld(1)

# 启动防火墙
systemctl start firewalld

# 停止某项服务，这里举例停止防火墙
systemctl stop firewalld

# 查看防火墙已经开放的端口
firewall-cmd --list-port

# 添加开放指定防火墙
firewall-cmd --zone=public --add-port=<port>/tcp --permanent
firewall-cmd --permanent --zone=public --add-port=22/tcp

# 不要忘记reload！
firewall-cmd --reload
```

### Linux用户管理

#### 用户管理

新账号，然后为新账号分配用户号、用户组、主目录和登录Shell等资源。

- [-c] comment 指定一段注释性描述
- [-d] 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录
- [-g] 用户组 指定用户所属的用户组
- [-G] 用户组，用户组 指定用户所属的附加组
- [-m] 使用者目录如不存在则自动建立
- [-s] Shell文件 指定用户的登录Shell
- [-u] 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号

```bash
# 查看主机名
hostname

# 修改主机名
hostname <new hostname>

# 添加用户
useradd -m <username>

# 删除用户并删除目录
userdel -r <username>

# 修改用户
usermod -m <username>
usermod -s /bin/xxx -d /home/xxx –g developer xxx
```

#### 用户口令

超级用户可以为自己和其他用户指定口令，普通用户只能用它修改自己的口令

- [-l] 锁定口令，即禁用账号
- [-u] 口令解锁
- [-d] 使账号无口令
- [-f] 强迫用户下次登录时修改口令

```bash
# 修改当前用户密码
passwd

# 锁定用户禁止登录
passwd -l <username>

# 清除密码也无法登录
passwd -d <username>
```

### 用户组管理

系统可以对一个用户组中的所有用户进行集中管理。

- [-g] GID 为用户组指定新的组标识号。
- [-o] 与 [-g] 选项同时使用，用户组的新GID可以与系统已有用户组的GID相同。
- [-n] 新用户组 将用户组的名字改为新名字

```bash
# 新增用户组
groupadd <name>

# 查看用户组
cat /etc/passwd

# 删除用户组
groupdel <name>

# 修改用户组
groupmod <name>

# 切换用户组
newgrp root
```

### 磁盘管理

Linux磁盘管理好坏直接关系到整个系统的性能问题。

[df] 命令参数功能：检查文件系统的磁盘空间占用情况。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

- -a ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；
- -k ：以 KBytes 的容量显示各文件系统；
- -m ：以 MBytes 的容量显示各文件系统；
- -h ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；
- -H ：以 M=1000K 取代 M=1024K 的进位方式；
- -T ：显示文件系统类型, 连同该 partition 的 filesystem 名称 (例如 ext3) 也列出；
- -i ：不用硬盘容量，而以 inode 的数量来显示

```bash
df -a <path/filename>
```

du命令也是查看使用空间的，但是与df命令不同的是Linux du命令是对文件和目录磁盘使用的空间的查看，还是和df命令有一些区别的，这里介绍Linux du命令。

- -a ：列出所有的文件与目录容量，因为默认仅统计目录底下的文件量而已。
- -h ：以人们较易读的容量格式 (G/M) 显示；
- -s ：列出总量而已，而不列出每个各别的目录占用容量；
- -S ：不包括子目录下的总计，与 -s 有点差别。
- -k ：以 KBytes 列出容量显示；
- -m ：以 MBytes 列出容量显示；

```bash
du -a <path/filename>
```

磁盘挂载与卸载

```bash
mount [-t 文件系统] [-L Label名] [-o 额外选项] [-n] 装置文件名 挂载点
```
