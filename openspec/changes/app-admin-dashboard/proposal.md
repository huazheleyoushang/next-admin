## Why

团队需要一个现代化的应用管理后台（Admin Dashboard），用于日常运营管理和数据展示。目前缺少统一的前端管理界面，手动操作效率低且容易出错。基于 Next.js + shadcn/ui 构建可以快速搭建美观、可维护的管理后台，复用组件生态降低长期开发成本。

## What Changes

- 搭建基于 Next.js App Router 的管理后台项目骨架
- 集成 shadcn/ui 组件库，使用 Tailwind CSS 样式系统
- 实现核心页面结构：侧边栏导航、顶部栏、布局框架
- 提供仪表盘总览页（Overview），包含关键指标卡片和图表展示
- 集成路由权限基础结构，区分登录/未登录状态
- 添加常用运营功能页面占位：用户管理、内容管理、系统设置

## Capabilities

### New Capabilities

- `admin-layout`: 管理后台基础布局——侧边栏导航、顶部栏、响应式折叠、主题切换
- `dashboard-overview`: 仪表盘总览页——KPI 指标卡片、数据图表（折线图/柱状图）、最近活动列表
- `auth-login`: 登录认证页面——用户名密码登录表单、表单验证、登录状态管理
- `admin-pages`: 运营管理页面占位——用户管理、内容管理、系统设置等页面的路由与骨架

### Modified Capabilities
<!-- None yet -->

## Impact

- 全新项目，无已有代码影响
- 新增依赖：next, react, tailwindcss, shadcn/ui 及相关组件
- 后续可扩展：API 对接、数据库集成、权限系统
