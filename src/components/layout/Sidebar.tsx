'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-config';
import { Button } from '@/components/ui/button';
import { LayoutGrid, LogOut, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  function isActive(url: string): boolean {
    return pathname === url || pathname.startsWith(url + '/');
  }

  function handleLogout() {
    setAuth({ user: null, token: null });
    router.push('/login');
  }

  const initials = auth.user?.name?.charAt(0) || 'A';

  return (
    <>
      <aside className="flex h-full w-64 flex-col border-r bg-card">
        {/* Logo */}
        <div className={cn('flex h-14 items-center border-b px-4', collapsed && 'justify-center')}>
          <LayoutGrid className="h-6 w-6" />
          {!collapsed && <span className="ml-2 font-bold">Next Admin</span>}
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = isActive(item.url);
            const Icon = item.icon;
            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* 底部用户信息 */}
        <div className="border-t p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{auth.user?.name || '管理员'}</p>
                    <p className="text-xs text-muted-foreground">{auth.user?.email || 'admin@example.com'}</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* 收起/展开按钮（当收起时显示在侧边栏底部） */}
      {collapsed && onToggleCollapse && (
        <div className="absolute bottom-2 left-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md border bg-card shadow"
            onClick={onToggleCollapse}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
