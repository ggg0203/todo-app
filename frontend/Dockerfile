# ============================================
# Stage 1: 构建阶段（Node 环境）
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# 先拷依赖文件，利用缓存
COPY package*.json ./
RUN npm install --registry=https://registry.npmmirror.com

# 拷所有源码并构建
COPY . .
RUN npm run build

# ============================================
# Stage 2: 运行阶段（Nginx）
# ============================================
FROM nginx:alpine

# 删掉 nginx 默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 用自己的 nginx 配置覆盖
COPY nginx.conf /etc/nginx/conf.d/

# 从 Stage 1 拿构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
