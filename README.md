# Next Admin

基于 [Next.js 16](https://nextjs.org/) + [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS v4](https://tailwindcss.com/) 的现代化管理后台模板。

## ✨ 特性

- 🚀 [Next.js 16](https://nextjs.org/) App Router 架构
- 🎨 [shadcn/ui](https://ui.shadcn.com/) 组件库 + [Radix UI](https://www.radix-ui.com/)
- 🌓 深色/浅色主题切换（[next-themes](https://github.com/pacocoursey/next-themes)）
- 📱 响应式布局，适配桌面端与移动端
- 🔐 模拟认证体系（localStorage），预留 Clerk/NextAuth 迁移路径
- 📊 数据可视化图表（[Recharts](https://recharts.org/)）
- 🧭 动态侧边栏导航 + 面包屑自动生成
- 🛡️ 路由守卫（Middleware）
- 📦 [TanStack Table](https://tanstack.com/table) 数据表格
- 🎯 TypeScript 全栈开发

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 路由
│   ├── (auth)/             # 认证路由组（登录页）
│   └── dashboard/          # 受管���区域
├── components/
│   ├── layout/             # 布局组件（Sidebar, Header, AppLayout）
│   ├── dashboard/          # 仪表盘组件（KPI, 图表, 订单）
│   └── ui/                 # shadcn/ui 基础组件
├── features/               # 功能模块
│   └── auth/               # 认证相关 UI
├── lib/                    # 核心逻辑
│   ├── auth-context.tsx    # 认证状态管理
│   └── nav-config.ts       # 导航配置
├── types/                  # TypeScript 类型定义
└── middleware.ts           # 路由中间件
```

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000 查看应用。

### 其他命令

```bash
pnpm build    # 生产构建
pnpm start    # 启动生产服务
pnpm lint     # ESLint 检查
```

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript 5.7 |
| 样式 | Tailwind CSS v4 |
| UI | shadcn/ui, Radix UI, Lucide Icons |
| 图表 | Recharts |
| 表单 | React Hook Form + Zod |
| 主题 | next-themes |
| 状态 | Zustand / React Context |
| 认证 | Clerk (预留) / Mock (当前) |

## 📝 关于认证

当前认证系统使用 `localStorage` 模拟，便于快速开发演示。生产环境建议迁移至 [Clerk](https://clerk.com/) 或 [NextAuth.js](https://next-auth.js.org/)。

迁移文档见 `docs/auth.md`。

## 📄 License

MIT
