FROM nginx
# 复制构建文件到容器中
COPY ./packages/apps/admin/dist/ /usr/share/nginx/html/
COPY ./packages/apps/micro-demo/dist/ /usr/share/nginx/html/demo/
COPY ./packages/apps/micro-docs/dist/ /usr/share/nginx/html/docs/
COPY ./packages/apps/micro-i18n/dist/ /usr/share/nginx/html/i18n/
COPY ./packages/apps/micro-modeling/dist/ /usr/share/nginx/html/modeling/
COPY ./packages/apps/micro-nexus/dist/ /usr/share/nginx/html/nexus/
# 复制nginx配置到容器中
COPY ./.github/workflows/nginx.conf /etc/nginx/nginx.conf
# 指定端口
EXPOSE 80
# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
