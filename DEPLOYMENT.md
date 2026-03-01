# Dokploy 部署指南

本项目已配置好 Dokploy 部署所需的文件。

## 部署文件说明

- **Dockerfile** - 主要的容器构建文件
- **docker-compose.yml** - Docker Compose 配置（可选）
- **nixpacks.toml** - Nixpacks 自动构建配置（备选方案）
- **.dockerignore** - Docker 构建忽略文件
- **.env.example** - 环境变量示例

## Dokploy 部署步骤

### 方式一：使用 Dockerfile（推荐）

1. 在 Dokploy 中创建新应用
2. 选择 "Dockerfile" 部署方式
3. 连接你的 Git 仓库
4. 配置环境变量（见下方）
5. 点击部署

### 方式二：使用 Nixpacks

1. 在 Dokploy 中创建新应用
2. 选择 "Nixpacks" 部署方式
3. 连接你的 Git 仓库
4. 配置环境变量
5. 点击部署

## 环境变量配置

在 Dokploy 的环境变量设置中添加以下变量：

### 必需变量

```bash
# GitHub API 配置
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repository_name

# JWT 密钥（生成一个随机字符串）
JWT_SECRET=your_random_jwt_secret_min_32_chars

# 域名配置
DOMAIN=your-domain.com

# 访问密码
ACCESS_PASSWORD=your_access_password

# 应用公开 URL（构建时变量）
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 变量说明

- **GITHUB_TOKEN** - GitHub Personal Access Token，需要有仓库读取权限
- **GITHUB_OWNER** - GitHub 用户名或组织名
- **GITHUB_REPO** - 仓库名称
- **JWT_SECRET** - 用于签发 JWT 的密钥，建议使用 32 位以上随机字符串
- **DOMAIN** - 部署域名
- **ACCESS_PASSWORD** - 访问密码
- **NEXT_PUBLIC_BASE_URL** - 应用公开访问地址

## 构建设置

- **Build Context**: `/`（根目录）
- **Dockerfile Path**: `Dockerfile`
- **Port**: `3000`

## 健康检查

应用配置了健康检查端点，Dokploy 会自动监控应用状态：
- 检查间隔：30秒
- 超时时间：10秒
- 重试次数：3次
- 启动等待：40秒

## 本地测试

在部署前，你可以使用 Docker Compose 在本地测试：

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件，填入实际值
nano .env

# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 故障排查

### 构建失败

1. 检查 `next.config.js` 中的 `output: 'standalone'` 配置
2. 确认所有环境变量已设置
3. 查看构建日志获取详细错误信息

### 运行时错误

1. 检查环境变量是否正确设置
2. 确认 GITHUB_TOKEN 有足够的权限
3. 查看应用日志：`docker-compose logs -f app`

### 性能优化

- 使用 `output: 'standalone'` 减小镜像体积
- 配置了 `NODE_OPTIONS="--max-old-space-size=4096"` 增加内存限制
- 使用 Alpine Linux 基础镜像减小体积

## 更新部署

当代码推送到 Git 仓库后：

1. Dokploy 会自动检测到更新
2. 点击 "Redeploy" 按钮触发重新部署
3. 等待构建完成

## 资源限制建议

- **内存**: 最小 512MB，推荐 1GB
- **CPU**: 最小 0.5 核，推荐 1 核
- **存储**: 最小 1GB

## 域名配置

在 Dokploy 中配置自定义域名：

1. 进入应用设置
2. 添加域名
3. 配置 DNS 指向 Dokploy 服务器
4. Dokploy 会自动配置 SSL 证书（Let's Encrypt）

## 备份建议

建议定期备份：
- GitHub Token（如果有过期时间）
- JWT Secret
- 环境变量配置

这些信息应保存在安全的位置，不要提交到 Git 仓库。
