import { KpiCards } from '@/components/dashboard/KpiCards';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <KpiCards />
      <div className="grid gap-4 md:grid-cols-2">
        <SalesChart />
        <RevenueChart />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RecentOrders />
        </div>
        <div className="lg:col-span-3">
          <CalendarWidget />
        </div>
      </div>
    </div>
  );
}
