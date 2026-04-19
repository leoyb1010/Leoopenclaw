# 职脉深聊 - Coffee Time

> 连接求职者与资深职场导师的 1 对 1 咨询平台

## 简介

职脉深聊是一个面向职场人士的咨询平台，用户可以预约各行业资深导师进行 1 对 1 深度咨询，涵盖职业规划、面试准备、技能提升等话题。

**当前状态：前端 MVP 阶段** — 本项目为前端演示版本，所有数据为模拟数据，尚未对接后端服务。

## 技术栈

- 纯静态 HTML/CSS/JavaScript（ES6+），无框架依赖
- Tailwind CSS CDN（UI 框架）
- PWA 支持（Service Worker + Web App Manifest）
- localStorage 用于本地数据持久化

## 目录结构

```
ui/
├── assets/
│   ├── styles/
│   │   ├── base.css              # 全局基础样式
│   │   ├── components.css        # 公共组件样式
│   │   └── pages/
│   │       ├── home.css          # 首页样式
│   │       ├── chat.css          # 聊天页样式
│   │       ├── mentors.css       # 导师列表页样式
│   │       ├── verify.css        # 验证页样式
│   │       └── privacy.css       # 隐私页样式
│   ├── scripts/
│   │   ├── common/
│   │   │   ├── dom.js            # DOM 工具函数
│   │   │   ├── navigation.js     # 导航逻辑
│   │   │   └── pwa.js            # PWA 注册
│   │   └── pages/
│   │       ├── chat.js           # 聊天页逻辑
│   │       ├── mentors.js        # 导师列表逻辑
│   │       ├── verify.js         # 验证页逻辑
│   │       └── privacy.js        # 隐私页逻辑
│   └── data/
│       └── mentors.js            # 导师数据
├── index.html                    # 首页
├── chat.html                     # 聊天咨询页
├── mentors.html                  # 导师列表页
├── verify.html                   # 身份验证页
├── privacy.html                  # 隐私与安全页
├── offline.html                  # 离线页
├── sw.js                         # Service Worker
└── manifest.json                 # PWA 配置

doc/                              # 后端设计文档（仅供参考）
├── api-documentation.md
├── database-schema.sql
└── deployment-guide.md
```

## 本地运行

```bash
# 方式 1：直接打开
open ui/index.html

# 方式 2：使用本地服务器（推荐，PWA 功能需要）
cd ui
python3 -m http.server 8080
# 访问 http://localhost:8080

# 方式 3：使用 Node.js
npx serve ui
```

## 页面说明

| 页面 | 说明 |
|------|------|
| 首页 | 产品介绍、功能展示、CTA |
| 导师列表 | 导师卡片展示，支持搜索和行业/价格筛选 |
| 聊天咨询 | 模拟 1v1 聊天，支持发送消息、模拟回复、localStorage 持久化 |
| 身份验证 | 导师申请表单，含前端校验和文件上传 |
| 隐私与安全 | 隐私政策说明 |
| 离线页 | 网络不可用时的降级页面 |

## PWA 说明

本项目支持 PWA 安装：
- Service Worker 采用分级缓存策略（HTML network-first，静态资源 cache-first）
- 不缓存第三方 CDN 资源
- 离线时可访问已缓存页面和离线提示页

## 当前能力与限制

### 已实现（前端 demo）
- 响应式 UI，支持移动端和桌面端
- 聊天页：消息发送、模拟回复、localStorage 持久化、快捷回复
- 导师列表：数据驱动渲染、搜索和筛选
- 验证表单：前端校验、文件上传、提交反馈
- PWA 离线支持

### 未实现（需后端支持）
- 用户注册/登录
- 真实聊天通信（WebSocket）
- 支付功能
- 预约系统
- 导师审核流程
- 评价系统

## 后续扩展方向

1. 接入后端 API，替换模拟数据
2. 实现 WebSocket 实时聊天
3. 接入支付网关
4. 增加通知推送
5. 导师端管理后台
6. 数据分析看板

## License

MIT
