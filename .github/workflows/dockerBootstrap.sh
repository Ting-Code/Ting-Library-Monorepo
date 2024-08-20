# 停掉容器
docker stop web-admin

# 删除本地容器
docker rm web-admin

# 删除本地镜像
docker rmi tingcode/web-admin:latest

# 拉取镜像
docker pull tingcode/web-admin:latest

docker run --rm -d -p 80:80 -p 8081:8081 -p 8680:8680 --net host --name web-admin tingcode/web-admin:latest
