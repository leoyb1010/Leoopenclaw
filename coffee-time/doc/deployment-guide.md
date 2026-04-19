# 职脉深聊 - 部署说明文档

## 目录
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [数据库配置](#数据库配置)
- [后端部署](#后端部署)
- [前端部署](#前端部署)
- [生产环境配置](#生产环境配置)
- [安全建议](#安全建议)

---

## 技术栈

### 前端
- React 18 / Vue 3
- Tailwind CSS 3
- WebSocket (实时通信)
- Signal Protocol (端到端加密)

### 后端
- Node.js 18+ / Python 3.10+
- Express.js / FastAPI
- PostgreSQL 14+
- Redis 7+ (缓存和会话)
- WebSocket Server

### 基础设施
- Docker & Docker Compose
- Nginx (反向代理)
- SSL/TLS证书
- 云存储 (阿里云OSS/Amazon S3)

---

## 环境要求

### 服务器要求
- **操作系统**: Ubuntu 22.04 LTS / macOS 13+ / Windows Server 2022
- **CPU**: 4核及以上
- **内存**: 8GB及以上
- **磁盘**: 50GB及以上可用空间
- **网络**: 公网IP，带宽10Mbps及以上

### 软件依赖
- Node.js 18.17.0+
- Python 3.10+
- PostgreSQL 14+
- Redis 7+
- Docker 24+ (可选，推荐)
- Nginx 1.24+

---

## 项目结构

```
zhimai-shenliao/
├── ui/                          # 前端代码
│   ├── index.html
│   ├── mentors.html
│   ├── verify.html
│   ├── privacy.html
│   ├── chat.html
│   └── assets/
├── backend/                     # 后端代码
│   ├── src/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   ├── tests/
│   ├── package.json
│   └── .env.example
├── doc/                         # 文档
│   ├── database-schema.sql
│   ├── api-documentation.md
│   └── deployment-guide.md
└── docker-compose.yml
```

---

## 快速开始

### 方式一：Docker Compose部署（推荐）

1. **克隆项目**
```bash
git clone <repository-url>
cd zhimai-shenliao
```

2. **配置环境变量**
```bash
cp backend/.env.example backend/.env
# 编辑 .env 文件，填入必要的配置
```

3. **启动服务**
```bash
docker-compose up -d
```

4. **初始化数据库**
```bash
docker-compose exec postgres psql -U postgres -d zhimai_business -f /doc/database-schema.sql
docker-compose exec postgres psql -U postgres -d zhimai_identity -f /doc/database-schema.sql
```

5. **访问应用**
- 前端: http://localhost:3000
- 后端API: http://localhost:8000
- API文档: http://localhost:8000/docs

### 方式二：手动部署

#### 1. 安装依赖

**Ubuntu/Debian:**
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# 安装 Redis
sudo apt install -y redis-server

# 安装 Nginx
sudo apt install -y nginx
```

**macOS (使用 Homebrew):**
```bash
brew install node postgresql redis nginx
```

---

## 数据库配置

### 1. 创建数据库

```sql
-- 连接到 PostgreSQL
sudo -u postgres psql

-- 创建业务数据库
CREATE DATABASE zhimai_business;
CREATE USER zhimai_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE zhimai_business TO zhimai_user;

-- 创建身份数据库（物理隔离）
CREATE DATABASE zhimai_identity;
GRANT ALL PRIVILEGES ON DATABASE zhimai_identity TO zhimai_user;

\q
```

### 2. 导入Schema

```bash
# 导入业务数据库Schema
psql -U zhimai_user -d zhimai_business -f doc/database-schema.sql

# 导入身份数据库Schema
psql -U zhimai_user -d zhimai_identity -f doc/database-schema.sql
```

### 3. 配置连接

编辑 `backend/.env`:
```env
# 业务数据库
DATABASE_URL=postgresql://zhimai_user:your_secure_password@localhost:5432/zhimai_business

# 身份数据库
IDENTITY_DATABASE_URL=postgresql://zhimai_user:your_secure_password@localhost:5432/zhimai_identity

# Redis
REDIS_URL=redis://localhost:6379/0
```

---

## 后端部署

### 1. 安装后端依赖

```bash
cd backend
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件
```

`.env` 示例:
```env
# 服务器配置
NODE_ENV=production
PORT=8000
HOST=0.0.0.0

# 数据库
DATABASE_URL=postgresql://user:pass@localhost:5432/zhimai_business
IDENTITY_DATABASE_URL=postgresql://user:pass@localhost:5432/zhimai_identity

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# 加密
ENCRYPTION_KEY=your-32-byte-encryption-key-here

# 支付配置 (示例)
PAYMENT_GATEWAY_URL=https://api.payment-gateway.com
PAYMENT_MERCHANT_ID=your_merchant_id
PAYMENT_SECRET_KEY=your_secret_key

# 文件存储
STORAGE_TYPE=oss
OSS_ACCESS_KEY_ID=your_access_key
OSS_ACCESS_KEY_SECRET=your_secret_key
OSS_BUCKET=zhimai-files
OSS_REGION=oss-cn-hangzhou

# CORS
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 3. 运行数据库迁移

```bash
npm run migrate
```

### 4. 启动后端服务

**开发模式:**
```bash
npm run dev
```

**生产模式:**
```bash
# 构建
npm run build

# 使用 PM2 管理进程
npm install -g pm2
pm2 start dist/main.js --name zhimai-backend
pm2 save
pm2 startup
```

---

## 前端部署

### 1. 安装前端依赖

```bash
cd ui
npm install
```

### 2. 配置API地址

创建 `ui/src/config.js`:
```javascript
export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.yourdomain.com/v1'
  : 'http://localhost:8000/v1';

export const WS_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'wss://api.yourdomain.com/v1/ws'
  : 'ws://localhost:8000/v1/ws';
```

### 3. 构建前端

```bash
npm run build
```

### 4. 部署到Web服务器

**使用 Nginx:**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/zhimai-shenliao/ui/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /ws {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 生产环境配置

### 1. SSL/TLS 证书配置

使用 Let's Encrypt 免费证书:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 2. 防火墙配置

```bash
# Ubuntu UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. 数据库备份

创建定时备份脚本 `/etc/cron.daily/zhimai-backup`:
```bash
#!/bin/bash
BACKUP_DIR=/var/backups/zhimai
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# 备份业务数据库
pg_dump -U zhimai_user zhimai_business | gzip > $BACKUP_DIR/zhimai_business_$DATE.sql.gz

# 备份身份数据库
pg_dump -U zhimai_user zhimai_identity | gzip > $BACKUP_DIR/zhimai_identity_$DATE.sql.gz

# 删除7天前的备份
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
```

设置执行权限:
```bash
sudo chmod +x /etc/cron.daily/zhimai-backup
```

### 4. 监控与日志

**使用 PM2 监控:**
```bash
pm2 monit
pm2 logs zhimai-backend
```

**配置日志轮转** `/etc/logrotate.d/zhimai`:
```
/var/log/zhimai/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

---

## 安全建议

### 1. 密钥管理
- 不要将密钥提交到代码仓库
- 使用环境变量或密钥管理服务
- 定期轮换密钥

### 2. 数据库安全
- 使用强密码
- 限制数据库访问IP
- 启用SSL连接
- 定期审计访问日志

### 3. 应用安全
- 保持依赖包更新
- 使用安全头（CSP、X-Frame-Options等）
- 实施速率限制
- 输入验证和清理

### 4. 隐私保护
- 敏感数据加密存储
- 实施数据最小化原则
- 定期进行安全审计
- 符合数据保护法规要求

---

## 故障排查

### 常见问题

**1. 数据库连接失败**
- 检查 PostgreSQL 服务状态: `sudo systemctl status postgresql`
- 验证连接参数
- 检查防火墙设置

**2. Redis连接失败**
- 检查 Redis 服务状态: `sudo systemctl status redis-server`
- 验证连接字符串

**3. 前端无法访问后端API**
- 检查 CORS 配置
- 验证 Nginx 反向代理设置
- 检查防火墙规则

**4. WebSocket连接失败**
- 确认 Nginx WebSocket 代理配置正确
- 检查 SSL/TLS 设置
- 验证后端 WebSocket 服务运行状态

---

## 下一步

- 参阅 [API文档](./api-documentation.md) 了解接口详情
- 查看 [数据库Schema](./database-schema.sql) 了解数据结构
- 根据业务需求定制功能模块
- 进行性能测试和安全审计

---

## 技术支持

如遇到问题，请:
1. 查看日志文件
2. 检查系统资源使用情况
3. 参阅本文档故障排查部分
4. 联系技术支持团队

---

**文档版本**: 1.0.0
**最后更新**: 2024-01-01
