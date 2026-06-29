import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

/** 单个导航菜单项 */
export interface NavItem {
  /** 菜单标题 */
  title: string;
  /** 路由地址 */
  url: string;
  /** 图标组件 */
  icon: ComponentType<{ className?: string }>;
  /** 是否激活（由组件自动计算，无需手动维护） */
  isActive?: boolean;
  /** 子菜单（可选） */
  items?: NavItem[];
}

/** KPI 指标卡片数据 */
export interface KpiCard {
  title: string;
  value: string;
  change: number; // 百分比变化
  icon: ComponentType<{ className?: string }>;
}

/** 订单记录 */
export interface Order {
  id: string;
  customer: string;
  amount: string;
  status: "paid" | "pending" | "cancelled";
  date: string;
}
