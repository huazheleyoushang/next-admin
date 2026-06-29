# 表单系统

基于 React Hook Form + Zod 的类型安全表单处理方案。

## 概述

本项目采用 `react-hook-form` 作为表单库，`zod` 作为 Schema 验证引擎，与 shadcn/ui 组件无缝集成。所有表单均遵循统一的模式：定义 Zod Schema → 生成 TypeScript 类型 → 绑定 React Hook Form → 渲染 shadcn 表单控件。

## 核心依赖

```bash
pnpm add react-hook-form @hookform/resolvers zod
```

## 基本模式

### 1. 定义 Schema

```typescript
// lib/form-schemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少 6 位'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
```

### 2. 创建表单组件

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/lib/form-schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    // 处理登录逻辑
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? '登录中...' : '登录'}
        </Button>
      </form>
    </Form>
  );
}
```

## 高级用法

### 受控与非受控混合

对于需要外部同步的字段（如从 URL 参数填充），使用 `watch` + `setValue`：

```tsx
const watchedEmail = form.watch('email');
form.setValue('email', 'default@example.com', { shouldValidate: true });
```

### 动态表单字段

使用 `useFieldArray` 处理可增减的字段列表（如联系人数组）：

```tsx
import { useFieldArray, Controller } from 'react-hook-form';

const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'contacts',
});

// 在模板中使用
{fields.map((field, index) => (
  <Controller
    key={field.id}
    name={`contacts.${index}.email`}
    render={({ field }) => <Input {...field} />}
  />
))}
<Button onClick={() => append({ email: '' })}>添加联系人</Button>
```

### 异步验证

Zod 支持 `z.string().refine` 进行异步校验：

```tsx
const userSchema = z.object({
  username: z.string().min(3).refine(
    async (username) => {
      const res = await fetch(`/api/users/${username}/exists`);
      return !(await res.json()).exists;
    },
    { message: '用户名已被占用' }
  ),
});
```

## 最佳实践

1. **Schema 集中管理** — 将所有表单 Zod Schema 放在 `lib/form-schemas.ts` 或按模块拆分，保持类型与验证逻辑一致。
2. **复用 FormField 渲染** — 将常用的字段组合封装为独立组件（如 `EmailField`、`PasswordField`）。
3. **禁用提交状态** — 始终通过 `form.formState.isSubmitting` 禁用提交按钮，防止重复提交。
4. **默认值必须提供** — `defaultValues` 需覆盖 Schema 中所有字段，避免 `undefined` 验证错误。
5. **错误提示本地化** — 所有错误消息使用中文，写在 Zod Schema 中而非组件内。

## 与 shadcn/ui 表单组件映射

| shadcn 组件 | 用途 |
|-------------|------|
| `Form` | FormProvider 容器 |
| `FormField` | 字段注册与绑定 |
| `FormItem` | 包裹 Label + Input + Message |
| `FormLabel` | 字段标签 |
| `FormControl` | 插入输入控件的占位符 |
| `FormMessage` | 错误/提示信息 |
| `FormDescription` | 可选的描述文字 |
