#!/usr/bin/env sh
# 服务端一键部署参考脚本（与 CI 中 ssh 步骤保持一致）。
# 若仍使用自定义 web_admin.sh，请至少包含 stop → rm → pull → run，否则会同名容器占坑导致页面不更新。

set -e

IMAGE="${DOCKER_IMAGE:-tingcode/web-admin:latest}"
NAME="${DOCKER_CONTAINER:-web-admin}"

echo "---------stop/remove container--------"
docker stop "$NAME" 2>/dev/null || true
docker rm "$NAME" 2>/dev/null || true

echo "---------remove local image (avoid stale :latest digest)--------"
docker rmi "$IMAGE" 2>/dev/null || true

echo "---------pull image--------"
docker pull "$IMAGE"

echo "---------run container--------"
docker run -d -p 8680:8680 -p 80:80 --name "$NAME" "$IMAGE"

echo "---------done--------"
