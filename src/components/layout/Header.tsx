'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/nav-config';
import { GlobalSearch } from '@/components/global-search';
import { useState, useCallback, useRef, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 从 navItems 中找到当前面包屑标题
  const currentItem = navItems.find((item) => pathname === item.url || pathname.startsWith(item.url + '/'));
  const breadcrumb = currentItem?.title || '管理后台';

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  return (
    <>
      <header className="flex h-12 items-center justify-between border-b bg-card px-6">
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

        {/* 右侧操作区 */}
        <div className="flex items-center gap-2">
          {/* 搜索触发按钮 */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 h-8 px-2 text-muted-foreground hover:text-foreground"
            onClick={openSearch}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">搜索</span>
          </Button>

          {/* 主题切换 */}
          <ThemeToggle />
        </div>
      </header>

      {/* 全局搜索面板 */}
      <GlobalSearch open={searchOpen} onClose={closeSearch} inputRef={inputRef} />
    </>
  );
}
