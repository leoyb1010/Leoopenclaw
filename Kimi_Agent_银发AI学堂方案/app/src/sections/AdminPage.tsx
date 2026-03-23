import { AdminSidebar } from './admin/AdminSidebar';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminCourses } from './admin/AdminCourses';
import { AdminUsers } from './admin/AdminUsers';
import { AdminOrders } from './admin/AdminOrders';
import { AdminSettings } from './admin/AdminSettings';
import { useAdminStore } from '@/store';

export function AdminPage() {
  const { adminPage } = useAdminStore();

  const renderContent = () => {
    switch (adminPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'courses':
        return <AdminCourses />;
      case 'users':
        return <AdminUsers />;
      case 'orders':
        return <AdminOrders />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-elder-bg">
      {/* 侧边栏 */}
      <AdminSidebar />

      {/* 主内容区 */}
      <main className="admin-content p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
