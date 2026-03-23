import { Users, BookOpen, CreditCard, TrendingUp, Eye } from 'lucide-react';

const stats = [
  { title: '总用户数', value: '1,234', change: '+12%', icon: Users, color: 'bg-blue-500' },
  { title: '课程总数', value: '32', change: '+3', icon: BookOpen, color: 'bg-green-500' },
  { title: 'VIP会员', value: '286', change: '+8%', icon: CreditCard, color: 'bg-amber-500' },
  { title: '本月收入', value: '¥8,520', change: '+15%', icon: TrendingUp, color: 'bg-rose-500' },
];

const recentUsers = [
  { id: 1, phone: '138****8888', nickname: '张大爷', status: 'active', joinDate: '2024-01-15' },
  { id: 2, phone: '139****6666', nickname: '李阿姨', status: 'active', joinDate: '2024-01-14' },
  { id: 3, phone: '137****9999', nickname: '王叔叔', status: 'vip', joinDate: '2024-01-13' },
  { id: 4, phone: '136****7777', nickname: '赵奶奶', status: 'active', joinDate: '2024-01-12' },
  { id: 5, phone: '135****5555', nickname: '刘爷爷', status: 'vip', joinDate: '2024-01-11' },
];

const recentCourses = [
  { id: 1, title: '豆包帮您安排一天', model: '豆包', students: 156, rating: 4.9 },
  { id: 2, title: '千问帮您选商品', model: '通义千问', students: 128, rating: 4.8 },
  { id: 3, title: '阿福教您养生知识', model: '蚂蚁阿福', students: 203, rating: 4.9 },
  { id: 4, title: '一言陪您学知识', model: '文心一言', students: 89, rating: 4.7 },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-elder-dark">数据概览</h2>
        <span className="text-gray-500">更新时间: {new Date().toLocaleString()}</span>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-elder-dark">{stat.value}</p>
                  <p className="text-green-500 text-sm mt-2">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 最近用户和课程 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近注册用户 */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-elder-dark">最近注册用户</h3>
            <button className="text-elder-primary hover:underline text-sm">查看全部</button>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elder-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-elder-primary font-medium">{user.nickname.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-elder-dark">{user.nickname}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'vip' 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {user.status === 'vip' ? 'VIP' : '普通用户'}
                  </span>
                  <span className="text-sm text-gray-400">{user.joinDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 热门课程 */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-elder-dark">热门课程</h3>
            <button className="text-elder-primary hover:underline text-sm">查看全部</button>
          </div>
          <div className="space-y-3">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-elder-dark">{course.title}</p>
                  <p className="text-sm text-gray-500">{course.model}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
