## Context

从零搭建 Next.js 管理后台项目。参考 [next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter)，采用类似布局和交互风格。项目预览：https://shadcn-dashboard.kiranism.dev/dashboard/overview

## Goals / Non-Goals

**Goals:**
- 搭建可运行的 Next.js 项目骨架，包含完整布局框架
- 集成 shadcn/ui + Tailwind CSS，实现一致的 UI 风格
- 实现仪表盘总览页，包含 KPI 卡片和数据图表
- 实现登录页面和基础路由结构
- 代码结构清晰，便于后续扩展 API 和业务逻辑

**Non-Goals:**
- 不涉及真实后端 API 对接（先用 mock 数据）
- 不涉及真实的数据库集成
- 不涉及复杂的权限管理系统（仅基础路由保护）
- 不涉及国际化/i18n

## Decisions

| 决策 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 14+ App Router | 官方推荐，服务端组件性能更好，路由更直观 |
| UI 组件 | shadcn/ui | 可定制性强，代码级控制，MIT 协议 |
| 样式 | Tailwind CSS v4 | shadcn 默认依赖，原子化样式开发效率高 |
| 图表 | recharts | React 生态最成熟的图表库，与 shadcn 风格兼容 |
| 状态管理 | React Context + useHook | 管理后台复杂度不高，无需引入 zustand/jotai |
| 图标 | lucide-react | shadcn 默认图标库，轻量且风格统一 |
| 表单 | react-hook-form + zod | shadcn 推荐方案，类型安全 |
| 认证 | 前端 Mock（localStorage） | MVP 阶段，后续替换为真实 Auth |

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| shadcn 组件更新可能导致样式漂移 | 锁定版本，定期手动审查 diff |
| Mock 数据到真实 API 的迁移成本 | 抽象数据层接口，前期定义好类型契约 |
| 图表库在 SSR 下的兼容问题 | 动态导入图表组件（next/dynamic） |
| 侧边栏在大屏/小屏的响应式适配 | 使用 Tailwind 断点 + shadcn 内置响应式类 |
