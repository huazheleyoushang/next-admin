# 主题切换

基于 `next-themes` 的多主题支持方案。

## 概述

本项目使用 `next-themes` 实现亮色/暗色主题切换。主题样式通过 Tailwind CSS 的 `class` 策略控制，所有颜色变量定义在 CSS 自定义属性中，方便统一管理和扩展。

## 安装与配置

### 1. 安装依赖

```bash
pnpm add next-themes
```

### 2. 配置 Tailwind

在 `tailwind.config.ts` 中启用 `class` 策略：

```typescript
export default {
  darkMode: 'class',
  // ...
} satisfies Config;
```

### 3. 创建主题 Provider

```tsx
// components/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 4. 包裹根布局

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        {/* ... */}
      </body>
    </html>
  );
}
```

## 主题切换按钮

在 Header 中集成主题切换按钮：

```tsx
// components/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免 SSR 水合不匹配
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // 服务端渲染时不显示

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">切换主题</span>
    </Button>
  );
}
```

## 使用 Tailwind 暗色变体

在所有组件中使用 `dark:` 前缀定义暗色样式：

```tsx
// 示例：卡片组件
<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
  <h2 className="text-zinc-900 dark:text-zinc-100 font-semibold">标题</h2>
  <p className="text-zinc-600 dark:text-zinc-400">内容</p>
</div>
```

## 自定义主题色

在 `globals.css` 中定义 CSS 变量：

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
  }
}
```

然后在 shadcn 的 `components.json` 中配置 `cssVars` 引用这些变量。

## 最佳实践

1. **始终处理水合不匹配** — 使用 `useState` + `useEffect` 检测 `mounted`，或在 `useTheme()` 返回值中做空处理。
2. **`suppressHydrationWarning`** — 在 `<html>` 标签上添加此属性，避免主题切换时的水合警告。
3. **颜色用 CSS 变量** — 不要硬编码十六进制颜色，通过 Tailwind 的 `var(--color)` 引用 CSS 变量，确保主题切换时全局一致。
4. **测试暗色模式** — 在开发时在浏览器 DevTools 中强制切换暗色模式，检查所有组件的可见性。
