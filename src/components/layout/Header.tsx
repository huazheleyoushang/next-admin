'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/nav-config';

export function Header() {
  const pathname = usePathname();

  // 从 navItems 中找到当前面包屑标题
  const currentItem = navItems.find((item) => pathname === item.url || pathname.startsWith(item.url + '/'));
  const breadcrumb = currentItem?.title || '管理后台';

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
      {/* 面包屑 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 搜索框 */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索..."
            className="w-full pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>

      {/* 主题切换 */}
      <ThemeToggle />
    </header>
  );
}
