'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 有活动的日期标记（mock）
const activeDays = [3, 7, 12, 15, 20, 25, 28];

export function CalendarWidget() {
  const year = 2026;
  const month = 6;
  const monthName = '6';

  // 2026年6月第一天是周二(2)，共30天
  const firstDay = 2;
  const daysInMonth = 30;

  // 中文星期
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  // 生成日历格子
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">日历</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* 月份导航 */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {year}年{monthName}月
            </span>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* 星期标题 */}
          <div className="grid grid-cols-7 text-center">
            {weekDays.map((d) => (
              <span key={d} className="text-xs text-muted-foreground">{d}</span>
            ))}
          </div>

          {/* 日期格子 */}
          <div className="grid grid-cols-7 text-center gap-1">
            {cells.map((day, i) => (
              <div
                key={i}
                className={
                  'relative flex h-8 w-8 items-center justify-center text-sm mx-auto' +
                  (day !== null && activeDays.includes(day)
                    ? ' font-semibold text-primary'
                    : ' text-muted-foreground')
                }
              >
                {day ?? ''}
                {day !== null && activeDays.includes(day) && (
                  <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
