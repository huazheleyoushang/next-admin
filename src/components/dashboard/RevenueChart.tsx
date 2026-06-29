'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { month: '1月', revenue: 2400 },
  { month: '2月', revenue: 1800 },
  { month: '3月', revenue: 3200 },
  { month: '4月', revenue: 2800 },
  { month: '5月', revenue: 3600 },
  { month: '6月', revenue: 4200 },
  { month: '7月', revenue: 3800 },
  { month: '8月', revenue: 4800 },
  { month: '9月', revenue: 4500 },
  { month: '10月', revenue: 5200 },
  { month: '11月', revenue: 5800 },
  { month: '12月', revenue: 6400 },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近收入</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
            <YAxis className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
