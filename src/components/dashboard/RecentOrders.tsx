'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Order } from '@/types';

const orders: Order[] = [
  { id: 'ORD-001', customer: '张三', amount: '¥1,280', status: 'paid', date: '2026-06-20' },
  { id: 'ORD-002', customer: '李四', amount: '¥2,560', status: 'pending', date: '2026-06-19' },
  { id: 'ORD-003', customer: '王五', amount: '¥890', status: 'paid', date: '2026-06-18' },
  { id: 'ORD-004', customer: '赵六', amount: '¥3,200', status: 'cancelled', date: '2026-06-17' },
  { id: 'ORD-005', customer: '钱七', amount: '¥1,750', status: 'paid', date: '2026-06-16' },
  { id: 'ORD-006', customer: '孙八', amount: '¥4,100', status: 'pending', date: '2026-06-15' },
  { id: 'ORD-007', customer: '周九', amount: '¥680', status: 'paid', date: '2026-06-14' },
  { id: 'ORD-008', customer: '吴十', amount: '¥2,340', status: 'paid', date: '2026-06-13' },
  { id: 'ORD-009', customer: '郑一', amount: '¥1,560', status: 'cancelled', date: '2026-06-12' },
  { id: 'ORD-010', customer: '冯二', amount: '¥980', status: 'pending', date: '2026-06-11' },
];

const statusMap = {
  paid: { label: '已完成', variant: 'default' as const },
  pending: { label: '待处理', variant: 'secondary' as const },
  cancelled: { label: '已取消', variant: 'destructive' as const },
};

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近订单</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">日期</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const status = statusMap[order.status];
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{order.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
