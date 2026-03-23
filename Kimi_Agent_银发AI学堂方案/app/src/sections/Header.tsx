import { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  User, 
  Crown, 
  Menu, 
  LogOut,
  ChevronLeft,
  Settings
} from 'lucide-react';
import { useAuthStore, useNavigationStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const { user, isAuthenticated, logout, isAdmin } = useAuthStore();
  const { currentPage, goBack, goHome, setPage } = useNavigationStore();
  const { setMobileMenuOpen } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = currentPage === 'home';

  const navItems = [
    { id: 'home' as const, label: '首页', icon: Home },
    { id: 'courses' as const, label: '全部课程', icon: BookOpen },
    { id: 'subscription' as const, label: '会员中心', icon: Crown },
    { id: 'profile' as const, label: '我的', icon: User },
  ];

  const handleNavClick = (page: typeof navItems[0]['id']) => {
    if (page === 'profile' && !isAuthenticated) {
      setPage('login');
    } else {
      setPage(page);
    }
    setIsOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    goHome();
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 safe-area-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 左侧：返回按钮或Logo */}
          <div className="flex items-center">
            {!isHome ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="mr-2 w-12 h-12 rounded-full hover:bg-gray-100"
                aria-label="返回"
              >
                <ChevronLeft className="w-7 h-7 text-elder-dark" />
              </Button>
            ) : null}
            
            {/* Logo */}
            <button 
              onClick={goHome}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-elder-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl md:text-2xl">AI</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-elder-dark leading-tight">
                  银发AI学堂
                </h1>
                <p className="text-xs text-elder-gray-light hidden md:block">
                  让AI成为您的生活助手
                </p>
              </div>
            </button>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-elder-primary/10 text-elder-primary font-semibold' 
                      : 'text-elder-gray hover:bg-gray-100 hover:text-elder-dark'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-lg">{item.label}</span>
                </button>
              );
            })}
            
            {/* 后台管理入口 */}
            {isAdmin && (
              <button
                onClick={() => setPage('admin')}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200
                  ${currentPage === 'admin'
                    ? 'bg-elder-accent/20 text-elder-dark font-semibold' 
                    : 'text-elder-gray hover:bg-gray-100 hover:text-elder-dark'
                  }
                `}
              >
                <Settings className="w-5 h-5" />
                <span className="text-lg">管理</span>
              </button>
            )}
          </nav>

          {/* 右侧：用户状态或登录按钮 */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                {user?.member_status !== 'free' && (
                  <span className="elder-badge-vip">
                    <Crown className="w-4 h-4 mr-1" />
                    VIP
                  </span>
                )}
                <button
                  onClick={() => setPage('profile')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {user?.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt={user.nickname || '用户头像'}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-elder-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-elder-primary" />
                    </div>
                  )}
                  <span className="text-lg font-medium text-elder-dark">
                    {user?.nickname || user?.phone?.slice(-4) || '用户'}
                  </span>
                </button>
              </div>
            ) : (
              <Button
                onClick={() => setPage('login')}
                className="hidden md:flex elder-btn-primary"
              >
                登录 / 注册
              </Button>
            )}

            {/* 移动端菜单按钮 */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden w-12 h-12 rounded-full hover:bg-gray-100"
                  aria-label="菜单"
                >
                  <Menu className="w-7 h-7 text-elder-dark" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[85vw] max-w-[360px] p-0"
              >
                <SheetHeader className="p-6 bg-elder-primary">
                  <SheetTitle className="text-white text-left">
                    {isAuthenticated ? (
                      <div className="flex items-center gap-3">
                        {user?.avatar_url ? (
                          <img 
                            src={user.avatar_url} 
                            alt=""
                            className="w-16 h-16 rounded-full object-cover border-3 border-white"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="text-xl font-bold">
                            {user?.nickname || '亲爱的用户'}
                          </p>
                          <p className="text-base text-white/80">
                            {user?.phone}
                          </p>
                          {user?.member_status !== 'free' && (
                            <span className="inline-flex items-center mt-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                              <Crown className="w-4 h-4 mr-1" />
                              VIP会员
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-xl mb-4">欢迎来到银发AI学堂</p>
                        <Button
                          onClick={() => {
                            setPage('login');
                            setIsOpen(false);
                          }}
                          className="bg-white text-elder-primary hover:bg-white/90 font-bold text-lg px-8 py-3 h-auto rounded-xl"
                        >
                          登录 / 注册
                        </Button>
                      </div>
                    )}
                  </SheetTitle>
                </SheetHeader>

                {/* 移动端导航菜单 */}
                <nav className="p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => handleNavClick(item.id)}
                            className={`
                              w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200
                              ${isActive 
                                ? 'bg-elder-primary/10 text-elder-primary font-semibold' 
                                : 'text-elder-dark hover:bg-gray-100'
                              }
                            `}
                          >
                            <Icon className={`w-7 h-7 ${isActive ? 'text-elder-primary' : 'text-elder-gray'}`} />
                            <span className="text-xl">{item.label}</span>
                            {isActive && (
                              <div className="ml-auto w-2 h-2 rounded-full bg-elder-primary" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                    
                    {/* 后台管理入口 */}
                    {isAdmin && (
                      <li>
                        <button
                          onClick={() => {
                            setPage('admin');
                            setIsOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200
                            ${currentPage === 'admin'
                              ? 'bg-elder-accent/20 text-elder-dark font-semibold' 
                              : 'text-elder-dark hover:bg-gray-100'
                            }
                          `}
                        >
                          <Settings className={`w-7 h-7 ${currentPage === 'admin' ? 'text-elder-dark' : 'text-elder-gray'}`} />
                          <span className="text-xl">后台管理</span>
                        </button>
                      </li>
                    )}
                  </ul>

                  {/* 退出登录 */}
                  {isAuthenticated && (
                    <div className="mt-6 pt-6 border-t-2 border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-elder-error hover:bg-red-50 transition-all duration-200"
                      >
                        <LogOut className="w-7 h-7" />
                        <span className="text-xl font-medium">退出登录</span>
                      </button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
