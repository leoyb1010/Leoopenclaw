import { Home, BookOpen, User, Crown } from 'lucide-react';
import { useAuthStore, useNavigationStore } from '@/store';

export function MobileNav() {
  const { isAuthenticated, user } = useAuthStore();
  const { currentPage, setPage } = useNavigationStore();

  const navItems = [
    { id: 'home' as const, label: '首页', icon: Home },
    { id: 'courses' as const, label: '课程', icon: BookOpen },
    { id: 'subscription' as const, label: '会员', icon: Crown },
    { id: 'profile' as const, label: '我的', icon: User },
  ];

  const handleClick = (page: typeof navItems[0]['id']) => {
    if (page === 'profile' && !isAuthenticated) {
      setPage('login');
    } else {
      setPage(page);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                mobile-nav-item flex-1 transition-all duration-200
                ${isActive ? 'text-elder-primary' : 'text-elder-gray'}
              `}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon 
                  className={`
                    mobile-nav-icon transition-all duration-200
                    ${isActive ? 'text-elder-primary scale-110' : 'text-elder-gray'}
                  `} 
                />
                {/* VIP标识 */}
                {item.id === 'subscription' && user?.member_status !== 'free' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-elder-accent rounded-full border-2 border-white" />
                )}
              </div>
              <span 
                className={`
                  mobile-nav-text transition-all duration-200
                  ${isActive ? 'font-semibold text-elder-primary' : ''}
                `}
              >
                {item.label}
              </span>
              {/* 激活指示器 */}
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-elder-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
