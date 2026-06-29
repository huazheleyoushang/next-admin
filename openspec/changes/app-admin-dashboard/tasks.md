## 1. 项目初始化

- [x] 1.1 使用 `npx create-next-app@latest` 创建 Next.js 项目（启用 TypeScript、Tailwind、App Router）
- [x] 1.2 初始化 shadcn/ui：运行 `npx shadcn@latest init` 配置主题色和全局 CSS
- [x] 1.3 安装额外依赖：`pnpm add recharts lucide-react date-fns`
- [x] 1.4 安装 shadcn 组件：`npx shadcn@latest add button card table input label separator dropdown-menu avatar badge toast skeleton`

## 2. 项目结构搭建

- [x] 2.1 创建目录结构：`app/(auth)/login/page.tsx`、`app/dashboard/` 路由组
- [x] 2.2 创建 `components/layout/` 目录，准备布局组件
- [x] 2.3 创建 `components/dashboard/` 目录，准备仪表盘组件
- [x] 2.4 创建 `lib/utils.ts` 工具文件（cn 函数等）
- [x] 2.5 创建 `types/index.ts` 类型定义文件

## 3. 侧边栏导航组件

- [x] 3.1 创建 `components/layout/Sidebar.tsx`，实现可折叠侧边栏（含 Logo、菜单、用户信息）
- [x] 3.2 创建 `components/layout/Header.tsx`，实现顶部栏（面包屑、搜索、主题切换、用户菜单）
- [x] 3.3 创建 `components/layout/AppLayout.tsx`，组合 Sidebar + Header + 内容区域
- [x] 3.4 实现侧边栏折叠状态（使用 useState）
- [x] 3.5 实现响应式：移动端汉堡菜单 + 遮罩层侧滑效果

## 4. 主题切换功能

- [x] 4.1 配置 Tailwind CSS 支持 dark mode（class 策略）
- [x] 4.2 创建 `components/theme-provider.tsx`（使用 next-themes）
- [x] 4.3 实现 Header 中的主题切换按钮组件
- [x] 4.4 在 `app/layout.tsx` 中包裹 ThemeProvider

## 5. 登录页面

- [x] 5.1 在 `app/(auth)/login/page.tsx` 创建登录页面
- [x] 5.2 使用 shadcn Card + Input + Button 构建登录表单
- [x] 5.3 集成 react-hook-form + zod 做表单验证
- [x] 5.4 实现登录成功后的 mock 认证状态保存（localStorage）
- [x] 5.5 实现登录状态守卫（未登录重定向到 /login）

## 6. 仪表盘总览页面

- [x] 6.1 创建 `app/dashboard/page.tsx` 作为仪表盘首页
- [x] 6.2 创建 `components/dashboard/KpiCards.tsx`，展示 4 个 KPI 指标卡片
- [x] 6.3 创建 `components/dashboard/SalesChart.tsx`，使用 recharts 实现销售趋势折线图
- [x] 6.4 创建 `components/dashboard/RevenueChart.tsx`，使用 recharts 实现收入柱状图
- [x] 6.5 创建 `components/dashboard/RecentOrders.tsx`，展示最近订单列表（含状态标签）
- [x] 6.6 创建 `components/dashboard/CalendarWidget.tsx`，迷你日历组件
- [x] 6.7 组装所有组件到仪表盘页面，使用 mock 数据

## 7. 运营管理页面骨架

- [x] 7.1 创建 `app/dashboard/users/page.tsx` 用户管理页面骨架
- [x] 7.2 创建 `app/dashboard/content/page.tsx` 内容管理页面骨架
- [x] 7.3 创建 `app/dashboard/settings/page.tsx` 系统设置页面骨架
- [x] 7.4 在侧边栏导航菜单中添加这三个页面的入口

## 8. 收尾与优化

- [x] 8.1 配置 favicon 和页面标题
- [x] 8.2 检查所有页面路由导航是否正常
- [x] 8.3 检查暗色模式下各组件显示效果
- [x] 8.4 检查移动端响应式布局
- [x] 8.5 运行 `pnpm lint` 确保无 ESLint 错误
