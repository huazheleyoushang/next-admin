import { Users, FileText, Settings, LogOut, PieChart } from 'lucide-react';
import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: '仪表盘',
    url: '/dashboard',
    icon: PieChart,
  },
  {
    title: '用户管理',
    url: '/dashboard/users',
    icon: Users,
  },
  {
    title: '内容管理',
    url: '/dashboard/content',
    icon: FileText,
  },
  {
    title: '系统设置',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export const userMenuItems = [
  { label: '退出登录', icon: LogOut, action: 'logout' },
];
