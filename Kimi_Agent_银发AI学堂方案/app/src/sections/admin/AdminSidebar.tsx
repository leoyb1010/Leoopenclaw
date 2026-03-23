import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Settings,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { useAdminStore, useAuthStore, useNavigationStore } from '@/store';

const menuItems = [
  { id: 'dashboard' as const, label: '数据概览', icon: LayoutDashboard },
  { id: 'courses' as const, label: '课程管理', icon: BookOpen },
  { id: 'users' as const, label: '用户管理', icon: Users },
  { id: 'orders' as const, label: '订单管理', icon: CreditCard },
  { id: 'settings' as const, label: '系统设置', icon: Settings },
];

export function AdminSidebar() {
  const { adminPage, setAdminPage } = useAdminStore();
  const { logout } = useAuthStore();
  const { goHome } = useNavigationStore();

  const handleLogout = () => {
    logout();
    goHome();
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-elder-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">银发AI学堂</h1>
            <p className="text-xs text-gray-400">后台管理系统</p>
          </div>
        </div>
      </div>

      {/* 返回前台 */}
      <div className="px-4 py-3">
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          返回前台
        </button>
      </div>

      {/* 菜单 */}
      <nav className="flex-1 px-4 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = adminPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setAdminPage(item.id)}
              className={`admin-sidebar-link w-full rounded-lg mb-1 ${
                isActive ? 'active' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 退出登录 */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">退出登录</span>
        </button>
      </div>
    </aside>
  );
}
