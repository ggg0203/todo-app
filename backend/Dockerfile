# ① 基础镜像：轻量 Python 3.13
FROM python:3.13-slim

# ② 设置工作目录（容器里的路径）
WORKDIR /app

# ③ 先只拷 requirements.txt，利用 Docker 缓存层
#    这样只要依赖不变，就不会重复 pip install
COPY requirements.txt .

# ④ 安装 Python 依赖（用国内镜像加速）
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# ⑤ 拷贝所有后端代码
COPY . .

# ⑥ 暴露端口 8000
EXPOSE 8000

# ⑦ 容器启动时运行 uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
