'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { month: '1月', sales: 4200 },
  { month: '2月', sales: 3800 },
  { month: '3月', sales: 5100 },
  { month: '4月', sales: 4600 },
  { month: '5月', sales: 5800 },
  { month: '6月', sales: 6200 },
  { month: '7月', sales: 5900 },
  { month: '8月', sales: 7100 },
  { month: '9月', sales: 6800 },
  { month: '10月', sales: 7500 },
  { month: '11月', sales: 8200 },
  { month: '12月', sales: 9100 },
];

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>销售趋势</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{ fill: 'var(--primary)', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
