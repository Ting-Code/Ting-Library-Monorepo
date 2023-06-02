# 指定基础镜像，必须为第一个命令
FROM nginx
# 复制构建文件到容器中
COPY ./dist/ /usr/share/nginx/html/
# 复制nginx配置到容器中
COPY ./.github/workflows/nginx.conf /etc/nginx/conf.d/web-admin.conf
# 指定端口
EXPOSE 80
