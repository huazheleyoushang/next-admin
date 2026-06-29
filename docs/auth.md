# 认证系统

基于 localStorage Mock 的认证流程说明。

> **注意**：本项目的认证为 MVP 阶段的 Mock 实现，后续将替换为真实认证服务（如 Clerk、NextAuth.js 等）。

## 概述

当前认证系统使用 `localStorage` 存储模拟的用户登录态，配合路由守卫实现页面保护。整个流程完全在前端完成，不涉及后端 API。

## 核心文件

| 文件 | 职责 |
|------|------|
| `app/(auth)/login/page.tsx` | 登录页面 UI 与表单处理 |
| `lib/auth-context.tsx` | 认证状态管理（React Context） |
| `middleware.ts` | 路由守卫，拦截未登录请求 |
| `components/layout/AppLayout.tsx` | 受保护布局，包裹所有仪表盘页面 |

## 认证流程

### 1. 登录

```tsx
// 登录页面中的 onSubmit 处理
function onSubmit(values: LoginFormValues) {
  // Mock: 验证凭据（实际项目中调用 API）
  if (values.email && values.password.length >= 6) {
    // 写入认证状态
    setAuth({
      user: { email: values.email, name: '管理员' },
      token: 'mock-token-' + Date.now(),
    });
    // 持久化到 localStorage
    localStorage.setItem('auth', JSON.stringify(getAuth()));
    // 跳转到仪表盘
    router.push('/dashboard');
  }
}
```

### 2. 状态管理（Context）

```tsx
// lib/auth-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Auth {
  user: { email: string; name: string } | null;
  token: string | null;
}

const AuthContext = createContext<{ auth: Auth; setAuth: (a: Auth) => void }>({
  auth: { user: null, token: null },
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<Auth>({ user: null, token: null });

  // 初始化：从 localStorage 恢复
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) setAuthState(JSON.parse(stored));
  }, []);

  // 变更时持久化
  const setAuth = (next: Auth) => {
    setAuthState(next);
    if (next.user) {
      localStorage.setItem('auth', JSON.stringify(next));
    } else {
      localStorage.removeItem('auth');
    }
  };

  return <AuthContext.Provider value={{ auth: { ...auth }, setAuth }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

### 3. 路由守卫（Middleware）

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 保护 /dashboard 路径
  if (pathname.startsWith('/dashboard')) {
    const auth = request.cookies.get('auth')?.value;
    if (!auth) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
```

### 4. 退出登录

```tsx
function handleLogout() {
  setAuth({ user: null, token: null });
  localStorage.removeItem('auth');
  router.push('/login');
}
```

## 迁移到真实认证

当切换到真实认证服务时，只需修改以下位置：

| 当前位置 | 替换为 |
|----------|--------|
| `localStorage.getItem('auth')` | 认证 SDK 的 `getSession()` 或 `useSession()` |
| Mock 登录逻辑 | 调用 `signIn()` API |
| `middleware.ts` 中的 cookie 检查 | 使用认证 SDK 的服务端验证中间件 |
| `AuthProvider` Context | 认证 SDK 提供的 Provider |

## 最佳实践

1. **不要在 localStorage 中存储敏感数据** — localStorage 可被 XSS 读取，token 应优先使用 httpOnly cookie。
2. **Middleware 与服务端组件配合** — 客户端 Context 无法阻止直接 URL 访问，`middleware.ts` 是服务端的第一道防线。
3. **分离认证逻辑** — 将认证相关代码集中在 `lib/auth-context.tsx`，业务组件通过 `useAuth()` Hook 访问，方便后续替换。
4. **登录页公开路由** — `/login` 不应被中间件拦截，允许未登录用户访问。
