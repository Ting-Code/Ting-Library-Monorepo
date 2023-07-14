FROM nginx
# 复制构建文件到容器中
COPY ./packages/apps/element-admin/dist/ /usr/share/nginx/html/
# 复制nginx配置到容器中
COPY ./.github/workflows/nginx.conf /etc/nginx/nginx.conf
# 指定端口
EXPOSE 80
# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
