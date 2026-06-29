# 导航系统

管理后台侧边栏导航的结构、路由与高亮机制。

## 概述

导航系统由三部分组成：**导航配置**（静态菜单数据）、**Sidebar 组件**（UI 渲染）、**路由高亮**（基于 `usePathname` 自动匹配）。所有导航项集中在一个配置文件中，便于统一维护。

## 导航配置

```typescript
// lib/nav-config.ts
import { LayoutGrid, Users, FileText, Settings, PieChart } from 'lucide-react';
import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: '仪表盘',
    url: '/dashboard/overview',
    icon: PieChart,
    isActive: false,
  },
  {
    title: '用户管理',
    url: '/dashboard/users',
    icon: Users,
    isActive: false,
  },
  {
    title: '内容管理',
    url: '/dashboard/content',
    icon: FileText,
    isActive: false,
  },
  {
    title: '系统设置',
    url: '/dashboard/settings',
    icon: Settings,
    isActive: false,
  },
];
```

### 类型定义

```typescript
// types/index.ts
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  url: string;
  icon: ComponentType<{ className?: string }>; // Lucide 图标组件
  isActive?: boolean;
  items?: NavItem[]; // 支持二级菜单
}
```

## 路由高亮

使用 Next.js 的 `usePathname` Hook 判断当前路径是否匹配导航项：

```tsx
// components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-config';

export function Sidebar() {
  const pathname = usePathname();

  function isActive(item: NavItem): boolean {
    // 精确匹配或前缀匹配（如 /dashboard/users 匹配 /dashboard/*）
    return pathname === item.url || pathname.startsWith(item.url + '/');
  }

  return (
    <aside className="w-64 border-r bg-card">
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

## 可折叠侧边栏

通过 `useState` 控制折叠状态，配合 CSS 过渡动画：

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 大屏默认可展开，小屏默认收起
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {/* 桌面端侧边栏 */}
      <div
        className={cn(
          'hidden md:flex flex-col border-r bg-card transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <Sidebar collapsed={collapsed} />
        <Button
          variant="ghost"
          size="icon"
          className="mt-auto m-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* 移动端侧边栏（Drawer） */}
      {/* ... */}

      {/* 主内容区 */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
```

## 二级菜单（可选）

在 `NavItem` 类型中已包含 `items` 字段，支持嵌套菜单：

```tsx
{
  title: '内容管理',
  url: '/dashboard/content',
  icon: FileText,
  items: [
    { title: '文章列表', url: '/dashboard/content/posts' },
    { title: '分类管理', url: '/dashboard/content/categories' },
  ],
}
```

渲染时对 `item.items` 递归展开，使用缩进或手风琴交互。

## 最佳实践

1. **导航配置集中管理** — 所有菜单项在 `lib/nav-config.ts` 中定义，避免在多个组件中硬编码路由。
2. **路径前缀匹配** — 使用 `startsWith(url + '/')` 确保子路由也能激活父菜单项（如 `/dashboard/users/123` 激活"用户管理"）。
3. **图标类型安全** — 使用 Lucide 图标组件并通过 `ComponentType` 类型约束，确保 `className` prop 正确传递。
4. **移动端 Drawer** — 小屏幕下侧边栏隐藏，通过汉堡菜单触发覆盖层（Drawer），避免占用内容空间。
