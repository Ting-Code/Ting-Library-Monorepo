## Docker 入门

安装过程自行查询，安装完成后检验是否安装成功

```bash
# 查看docker 信息
docker version

# 查看帮助文档
docker --help

# 重启Docker
systemctl restart docker
```

### image镜像

image 镜像是用来快速生成container容器的readonly文件。image具有分层的概念，可以在原来镜像基础是添加环境，生成新的镜像。

```bash
# 查看帮助文档
docker image --help

# 查看本地镜像
docker image ls

# 查看镜像详细信息
docker image inspect <image ID>

# 拉取镜像
docker image pull nginx:1.10.0

# 查看image层次
docker image history <image name or ID>
```

![](https://cdn.nlark.com/yuque/0/2023/png/2868710/1684392092110-c41b5594-10b3-4526-8b4d-49b282b063a1.png)

#### 构建镜像

1. Dockerfile

```bash
# 进入Dockerfile文件夹执行build
docker image build -t imageName .
docker image build -t <image name:tag> <path>
```

2. commit

```bash
#（容器需要暂停）
docker container stop <container name or ID>
docker ps -a

# 根据容器 commit 为镜像
docker container commit <container name or ID> <image name:tag>
```

3. 导出文件

```bash
# 导出镜像文件
docker image save nginx:1.10.0 -o nginx.image

# 导入镜像文件
docker image load -i ./nginx.image
```

#### 镜像上传Docker Hub

上传的镜像名格式必须为 username/imageName

```bash
# 直接 build 符合规范的image
docker image build -t  <username/image name> .

# 通过 tag 生成 符合规格的image
docker image tag <image name> <new image name:tag>

# 登录 填写登录信息
docker login

# push
docker image push <image name:tag>
```

#### 删除镜像

```bash
docker image rm <image ID>

# 有时候ID会重复通过name:tag删除
docker image rm <name:tag>

# 删除的时候要确保image 生成的 container都删除
docker ps -a
```

### container容器

Docker下可基于同一个image可以创建多个container，容器间环境互相隔离。

```bash
# 查看帮助文档
docker container --help
```

#### 容器的创建

```bash
# 根据镜像生成容器，如果本地没有该镜像则去docker hub下载
docker container run <image name>

# container 省略 container 效果一样， 老版本是省略的兼容了下来
docker run <image name>
```

#### 容器查询

```bash
# 新版本
docker container ls
# 老版本
docker ps

# -a 则停止的容器也显示
docker container ls -a
docker ps -a

# -aq 只显示ID
docker container ls -aq
docker ps -aq
```

#### 容器停止

```bash
# 一样省略 container 也可以
docker container stop <container name or ID>
docker stop <container name or ID>

# 停止多个 拼接即可
docker container stop <ID> <ID> <ID>
docker stop <ID> <ID> <ID>

# 停止所有容器
docker container stop $(docker ps -aq)
docker stop $(docker ps -aq)

# 启动容器 stop 变start 即可
docker container satrt <container name or ID>
```

#### 容器的删除

```bash
# 一样省略 container 也可以
docker container rm <container name or ID>
docker rm <container name or ID>

# 删除多个 拼接即可
docker container rm <ID> <ID> <ID>
docker rm <ID> <ID> <ID>

# 删除所有容器(正在运行是不能rm的， -f 可强制删除)
docker container rm -f $(docker ps -aq)
docker rm -f $(docker ps -aq)

# 一键删除已经退出容器
docker system prune -f
```

#### 交互模式

1. attached模式运行是默认运行模式,弊端是容易误操作

```bash
# 运行创建 nginx 服务器
docker run -p 80:80 nginx

# 按Ctrl + C 后nginx 就会停止

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS               NAMES
ab75b302388a        nginx               "/docker-entrypoint.…"   2 minutes ago       Exited (0) 11 seconds ago
```

2. detached模式后台运行模式

```bash
# 后台模式不会进入docker容器
docker run -d -p 80:80 nginx

# 后台模式后可以 attach进入 （不推荐）
docker attach <container name or ID>
```

3. 交互模式（推荐）

```bash
# 交互模式运行会进入docker
docker run -it -p 80:80 nginx sh

# 退出并停止docker
exit

# 退出但不停止docker
# 使用[ctrl + P][ctrl + Q]退出而不终止容器运行

# 重新进入已经运行docker
docker exec -it <container name or ID> sh

# tips: 后台模式创建容器退出不会停止容器
docker run -d -p 80:80 nginx
docker exec -it <container name or ID> sh
exit
```

### Dockerfile

Dockerfile是生成image镜像的脚本，是比较推荐的生成image的方式

```bash
docker image build -f <Dockerfile> -t <image name> <path>
docker image build -f Dockerfile -t image-name .
```

#### FROM 基础镜像

FROM会拉取容器的基础镜像，然后再通过其他命令添加层级

- 官方镜像优于非官方的镜像，如果没有官方镜像，则尽量选择Dockerfile开源的
- 固定版本tag而不是每次都使用latest
- 尽量选择体积小的镜像

```bash
FROM nginx:1.21.0-alpine
```

如果不需要基础环境可拉取空镜像

```bash
FROM scratch
```

#### RUN 执行指令

Dockerfile执行一个指令会多一层，为了减少层级冗余应尽量放到一个RUN里

```bash
FROM ubuntu:20.04
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo_2.0.1_linux_amd64.tar.gz && \
    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && \
    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

#### WORKDIR 进入

WORKDIR会进入指定目录，没有该目录则会创建并进入

```bash
FROM ubuntu:20.04
WORKDIR </path>
```

#### COPY vs ADD 复制

COPY是完全复制文件

```bash
FROM ubuntu:20.04
COPY <file name> </path/file name>
```

ADD是加入到某路径，压缩文件会被解压

```bash
FROM ubuntu:20.04
ADD <file name.gz> </path>
```

#### ARG vs ENV

ARG可以创建一个变量，并且在构建image时通过命令修改。ARG变量仅在构建image中有效

```bash
FROM ubuntu:20.04
ARG VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```

```bash
# 构建image时改变变量
docker image build -f <Dockerfile> -t <image name> --build-arg VERSION=2.0.0 <path>
```

ENV也可以创建一个变量，并且构建container时会保存到env里

```bash
FROM ubuntu:20.04
ENV VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```

#### CMD vs ENTRYPOINT

CMD 设置的命令，可以在docker container run 时传入其它命令，覆盖掉 CMD 的命令

```bash
FROM ubuntu:20.04
CMD ["echo", "hello docker"]

# 构建时有新的CMD则会覆盖
docker container run -it --rm demo-cmd echo "hello world"
# 只会打印 hello world
hello world
```

ENTRYPOINT 所设置的命令是一定会被执行，并且可以拼接

```bash
FROM ubuntu:20.04
ENTRYPOINT ["echo", "hello docker"]

# 构建时拼接命令
docker container run -it --rm demo-cmd echo "hello world"
hello docker
hello world
```

**Shell 格式和 Exec 格式**

```bash
# Shell格式
CMD echo "hello docker"

# Exec格式
CMD ["echo", "hello docker"]
```

一般Dockerfile都会用Exec格式，但当我们用shell变量时需要这样写

```bash
FROM ubuntu:20.04
ENV NAME=docker
CMD ["sh", "-c", "echo hello $NAME"]
```

#### Dockerfile技巧

**Dockerfile构建时会沿用CACHED缓存**，当某一行命令发生改变，该行以下命令都不用缓存了。

如COPY的文件发生改变，该命令尽量放下面有利于构建速度。

```bash
FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz

COPY <file name> </path/file name>
```

**Dockerfile构建时会把当前文件夹eontext都放到image**

.dockerignore可以把不需要的文件排除

```bash
.vscode/
env/
```

**多阶段构建**

假如有一个C的程序，我们想用gcc去做编译，但编译后并不需要gcc。那么可以多阶段构建，利用gcc编译后则不需要gcc来构建环境。

```bash
FROM gcc:9.4 AS builder

COPY hello.c /src/hello.c

WORKDIR /src

RUN gcc --static -o hello hello.c



FROM alpine:3.13.5

COPY --from=builder /src/hello /src/hello

ENTRYPOINT [ "/src/hello" ]

CMD []
```

**Root的危险性**

创建flask用户，来限制权限

```bash
FROM python:3.9.5-slim

RUN pip install flask && \
    groupadd -r flask && useradd -r -g flask flask && \
    mkdir /src && \
    chown -R flask:flask /src

USER flask

COPY app.py /src/app.py

WORKDIR /src
ENV FLASK_APP=app.py

EXPOSE 5000

CMD ["flask", "run", "-h", "0.0.0.0"]
```

### 存储 Volume

当删除container时，里面的数据也会删除。如果我们需要容器持久化存储时我们需要构建Volume。

#### Dockerfile方式创建Volume

```bash
FROM alpine:latest

...

VOLUME ["/app"]
```

构建镜像并且构建容器 ( 默认随机VOLUME NAME )

我们发现默认情况下创建的container的volume是一长串名字，这样的存储是无法复用的

```bash
# 构建镜像
$ docker image build -t my-cron .
# 构建容器
$ docker run -d my-cron
# 查看所有Valume
$ docker volume ls
DRIVER    VOLUME NAME
local     043a196c21202c484c69f2098b6b9ec22b9a9e4e4bb8d4f55a4c3dce13c15264
# 查看具体volume
$ docker volume inspect 043a196c21202c484c69f2098b6b9ec22b9a9e4e4bb8d4f55a4c3dce13c15264
[
    {
        "CreatedAt": "2021-06-22T23:06:13+02:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/043a196c21202c484c69f2098b6b9ec22b9a9e4e4bb8d4f55a4c3dce13c15264/_data",
        "Name": "043a196c21202c484c69f2098b6b9ec22b9a9e4e4bb8d4f55a4c3dce13c15264",
        "Options": null,
        "Scope": "local"
    }
]
```

具名volume

```bash
$ docker image build -t my-cron .
# docker container run -d -v <volume name:/path> <container name>
$ docker container run -d -v cron-data:/app my-cron
43c6d0357b0893861092a752c61ab01bdfa62ea766d01d2fcb8b3ecb6c88b3de
$ docker volume ls
DRIVER    VOLUME NAME
local     cron-data
$ docker volume inspect cron-data
[
    {
        "CreatedAt": "2021-06-22T23:25:02+02:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/cron-data/_data",
        "Name": "cron-data",
        "Options": null,
        "Scope": "local"
    }
]
```

路径volume

让本地路由挂载到docker路径上，不会创建volume

```bash
$ docker image build -t my-cron .
# docker container run -d -v <pwd path:/Docker path> <container name>
$ docker container run -d -v $(pwd):/app my-cron
```

#### 删除volume

删除valume前需要保证绑定的container已经删除

```bash
# 删除所有无绑定的volume
docker volume prune
```

#### 配置mysql

```bash
docker run -d --restart=always --name mysql \
-v /ting/dockerData/mysql/data:/var/lib/mysql \
-v /ting/dockerData/mysql/conf:/etc/mysql \
-v /ting/dockerData/mysql/log:/var/log/mysql \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=112716 \
mysql \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_general_ci

```

### Docker网络

Docker容器之间通过bridge（docker0）通信

![](https://cdn.nlark.com/yuque/0/2023/webp/2868710/1685415399419-65254881-8e0e-4115-8c33-cf4f2e5d8969.webp)

```bash
# 查看网络
docker network ls

NETWORK ID     NAME      DRIVER    SCOPE
4b5b378bb922   bridge    bridge    local
5fd0de1be7cc   host      host      local

# 查看NETWORK信息
docker network inspect 4b5b378bb922

# 查看容器信息
docker container inspect <container ID>

...
"Networks": {
    "bridge": {
        "IPAMConfig": null,
        "Links": null,
        "Aliases": null,
        "NetworkID": "4b5b378bb922a5238dc716fe6b4b2055278208f99dcfa7a082c27cc14919286e",
        "EndpointID": "4b2e188e59cf5ad4ea09714745cc6d20384e21c8e11654dd3e2caa14cfa15bb2",
        "Gateway": "172.17.0.1",
        "IPAddress": "172.17.0.2",
        "IPPrefixLen": 16,
        "IPv6Gateway": "",
        "GlobalIPv6Address": "",
        "GlobalIPv6PrefixLen": 0,
        "MacAddress": "02:42:ac:11:00:02",
        "DriverOpts": null
    }
```

#### 创建bridge

容器之间默认通过bridge（docker0）通信，也可以创建新的bridge

```bash
docker network create -d bridge <name>

# 创建时可以指定网关和子网掩码
docker network create -d bridge --geteway 172.200.0.2 --subnet 172.200.0.0/16 <name>

# 查看网络
docker network ls

NETWORK ID     NAME      DRIVER    SCOPE
4b5b378bb922   <name>    bridge    local

# 查看NETWORK信息
docker network inspect 4b5b378bb922
```

#### 建立连接

docker container 可以连接 多个 bridge

![画板](https://cdn.nlark.com/yuque/0/2023/jpeg/2868710/1685418213739-91e9e1fc-61b7-4d0b-abd6-4602c4859363.jpeg)

```bash
docker network connect <bridge name> <container name>
```

#### 网络bridge的意义

docker container之间通过ip可以ping通，那么bridge的意义是什么呢？

建立bridge连接后的容器可以互相通过container name 通信

```bash
docker container exec -it <container01> ping 172.17.0.3
docker container exec -it <container01> ping <container02>
```

#### 容器网络端口转发

上面知道容器之间可以通信，但是外部如何通过公网IP来访问容器内部呢？

![画板](https://cdn.nlark.com/yuque/0/2023/jpeg/2868710/1685419525998-9d6332a5-ad7d-4932-a38a-04203a12edc1.jpeg)

可以通过端口映射转发来访问容器内部`-p 80:80`

```bash
docker run --name nginx -p 80:80 -d nginx
```

Dockerfile EXPOSE更多是一直容器暴露端口解释，最终还是需要`-p 80:80`来转发端口

```bash
# 解析说明暴露80端口
EXPOSE 80
```

### Docker compose

通过一个yml声明式的配置文件描述整个应用，配置文件还可以置于版本控制系统中进行存储和管理。

```bash
version: "3.8"

services: # 容器
  servicename: # 服务名字，这个名字也是内部 bridge网络可以使用的 DNS name
  	container_name: # 可选，容器前缀名
    image: # 镜像的名字
    command: # 可选，如果设置，则会覆盖默认镜像里的 CMD命令
    environment: # 可选，相当于 docker run里的 --env
    volumes: # 可选，相当于docker run里的 -v
    networks: # 可选，相当于 docker run里的 --network
    ports: # 可选，相当于 docker run里的 -p
  servicename2:

volumes: # 可选，相当于 docker volume create

networks: # 可选，相当于 docker network create

# 构建镜像
services:
	build: <path> # Dockerfile文件夹路径
	dockerfile: <Dockerfile> # Dockerfile文件名
```

写好yml文件后和Dockerfile差不多，可以直接启动

```bash
docker-compose --help

# 启动yml定义的容器
docker-compose up

# 后台启动
docker-compose up -d

# 后台构建镜像
docker-compose up -d --build

# 查看日志
docker-compose log
docker-compose log -f

# 查看启动容器
docker-compose ps

# 停止容器
docker-compose stop

# 删除容器
docker-compose rm
```
