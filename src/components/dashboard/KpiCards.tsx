'use client';

import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KpiCard } from '@/types';

const kpiData: KpiCard[] = [
  {
    title: '总收入',
    value: '¥52,340',
    change: 12.5,
    icon: DollarSign,
  },
  {
    title: '订阅用户',
    value: '2,340',
    change: 8.2,
    icon: Users,
  },
  {
    title: '新销售',
    value: '+1,240',
    change: -3.1,
    icon: ShoppingBag,
  },
  {
    title: '当前在线',
    value: '128',
    change: 5.4,
    icon: Activity,
  },
];

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon;
        const isPositive = kpi.change >= 0;
        return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <Badge variant="secondary" className={isPositive ? 'text-green-600' : 'text-red-600'}>
                  {isPositive ? '+' : ''}{kpi.change}%
                </Badge>
                <span className="text-xs text-muted-foreground ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
