import { User, Crown, Clock, BookOpen, ChevronRight, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuthStore, useNavigationStore, useProgressStore } from '@/store';
import { Button } from '@/components/ui/button';

// 模拟学习记录
const mockLearningHistory = [
  { id: '1', course_title: '豆包帮您安排一天', progress: 60, last_study: '2小时前', cover: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&h=150&fit=crop', model: '豆包' },
  { id: '2', course_title: '千问帮您选商品', progress: 25, last_study: '昨天', cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=150&fit=crop', model: '通义千问' },
];

export function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { setPage: navigate } = useNavigationStore();
  const { progress } = useProgressStore();

  const handleLogout = () => {
    logout();
    navigate('home');
  };

  const menuItems = [
    { id: 'history', label: '学习记录', icon: Clock, onClick: () => navigate('history') },
    { id: 'vip', label: '会员中心', icon: Crown, onClick: () => navigate('subscription') },
    { id: 'settings', label: '账号设置', icon: Settings, onClick: () => {} },
    { id: 'help', label: '帮助与反馈', icon: HelpCircle, onClick: () => {} },
  ];

  return (
    <main className="min-h-screen bg-elder-bg py-6 md:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 用户信息卡片 */}
        <div className="bg-elder-primary rounded-3xl p-6 md:p-8 text-white mb-6">
          <div className="flex items-center gap-4 md:gap-6">
            {/* 头像 */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white/30">
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt="" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
              )}
            </div>

            {/* 信息 */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                {user?.nickname || '亲爱的用户'}
              </h1>
              <p className="text-white/80 text-lg mb-3">
                {user?.phone}
              </p>
              
              {/* 会员状态 */}
              <div className="flex items-center gap-3">
                {user?.member_status !== 'free' ? (
                  <span className="inline-flex items-center px-3 py-1.5 bg-elder-accent rounded-full text-base text-elder-dark">
                    <Crown className="w-4 h-4 mr-1" />
                    VIP会员
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 bg-white/20 rounded-full text-base">
                    普通用户
                  </span>
                )}
                {user?.member_expire_at && (
                  <span className="text-white/70 text-sm">
                    有效期至: {new Date(user.member_expire_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-3xl font-bold">{progress.length}</p>
              <p className="text-white/80 text-base">已学课程</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">
                {progress.filter(p => p.is_completed).length}
              </p>
              <p className="text-white/80 text-base">已完成</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">
                {Math.floor(progress.reduce((acc, p) => acc + p.progress_seconds, 0) / 3600)}
              </p>
              <p className="text-white/80 text-base">学习时长(小时)</p>
            </div>
          </div>
        </div>

        {/* 最近学习 */}
        <div className="elder-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-elder-dark">最近学习</h2>
            <button 
              onClick={() => navigate('history')}
              className="text-elder-primary hover:underline text-base"
            >
              查看全部
            </button>
          </div>

          {mockLearningHistory.length > 0 ? (
            <div className="space-y-4">
              {mockLearningHistory.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => navigate('course-detail', item.id)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <img 
                    src={item.cover} 
                    alt={item.course_title}
                    className="w-24 h-16 md:w-32 md:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-elder-primary/10 rounded text-xs text-elder-primary">
                        {item.model}
                      </span>
                    </div>
                    <h3 className="font-bold text-elder-dark truncate mb-1">
                      {item.course_title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-elder-primary rounded-full transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-elder-gray">{item.progress}%</span>
                    </div>
                    <p className="text-sm text-elder-gray">上次学习: {item.last_study}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-elder-gray flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-elder-gray">还没有学习记录</p>
              <Button 
                onClick={() => navigate('courses')}
                className="elder-btn-primary mt-4"
              >
                去选课
              </Button>
            </div>
          )}
        </div>

        {/* 功能菜单 */}
        <div className="elder-card">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-elder-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-elder-primary" />
                  </div>
                  <span className="flex-1 text-lg font-medium text-elder-dark">
                    {item.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-elder-gray" />
                </button>
              );
            })}

            {/* 退出登录 */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <span className="flex-1 text-lg font-medium text-red-500">
                退出登录
              </span>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
