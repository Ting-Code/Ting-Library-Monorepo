  # 停掉容器
  docker stop web-admin
  echo -e "---------删除本地容器和镜像--------"

  # 删除本地镜像
  docker rmi tingcode/web-admin:latest
  echo -e "---------拉取镜像--------"

  # 拉取镜像
  docker pull tingcode/web-admin:latest
  echo -e "---------创建容器并运行容器--------"

  docker run --rm -d -p 8680:8680 -p 80:80 --name web-admin tingcode/web-admin:latest
  echo -e "---------执行完毕--------"

