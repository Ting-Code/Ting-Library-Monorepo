FROM nginx
# 复制构建文件到容器中
COPY ./packages/apps/admin/dist/ /usr/share/nginx/html/
COPY ./packages/apps/micro/dist/ /usr/share/nginx/html/micro/
COPY ./packages/apps/micro-docs/dist/ /usr/share/nginx/html/docs/
# 复制nginx配置到容器中
COPY ./.github/workflows/nginx.conf /etc/nginx/nginx.conf
# 指定端口
EXPOSE 80 8680
# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
