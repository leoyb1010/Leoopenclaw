import { useState } from 'react';
import { Search, Edit2, Ban, CheckCircle, Crown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// 模拟用户数据
const initialUsers = [
  { id: '1', phone: '13888888888', nickname: '张大爷', member_status: 'free', status: 'active', joinDate: '2024-01-15', lastLogin: '2024-01-20', studyHours: 12 },
  { id: '2', phone: '13966666666', nickname: '李阿姨', member_status: 'monthly', status: 'active', joinDate: '2024-01-14', lastLogin: '2024-01-19', studyHours: 28 },
  { id: '3', phone: '13799999999', nickname: '王叔叔', member_status: 'yearly', status: 'active', joinDate: '2024-01-13', lastLogin: '2024-01-20', studyHours: 45 },
  { id: '4', phone: '13677777777', nickname: '赵奶奶', member_status: 'free', status: 'active', joinDate: '2024-01-12', lastLogin: '2024-01-18', studyHours: 8 },
  { id: '5', phone: '13555555555', nickname: '刘爷爷', member_status: 'monthly', status: 'banned', joinDate: '2024-01-11', lastLogin: '2024-01-15', studyHours: 5 },
  { id: '6', phone: '13444444444', nickname: '陈大妈', member_status: 'free', status: 'active', joinDate: '2024-01-10', lastLogin: '2024-01-19', studyHours: 15 },
  { id: '7', phone: '13333333333', nickname: '周大爷', member_status: 'yearly', status: 'active', joinDate: '2024-01-09', lastLogin: '2024-01-20', studyHours: 62 },
];

export function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const filteredUsers = users.filter(user => 
    user.nickname.includes(searchQuery) || 
    user.phone.includes(searchQuery)
  );

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: user.status === 'active' ? 'banned' : 'active' };
      }
      return user;
    }));
  };

  const handleSaveUser = () => {
    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    setShowEditDialog(false);
    setEditingUser(null);
  };

  const getMemberBadge = (status: string) => {
    switch (status) {
      case 'yearly':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs flex items-center gap-1"><Crown className="w-3 h-3" />年VIP</span>;
      case 'monthly':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1"><Crown className="w-3 h-3" />月VIP</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">普通用户</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 标题和操作栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-elder-dark">用户管理</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-gray-500 text-sm">总用户数</p>
          <p className="text-2xl font-bold text-elder-dark">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-gray-500 text-sm">VIP用户</p>
          <p className="text-2xl font-bold text-amber-600">{users.filter(u => u.member_status !== 'free').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-gray-500 text-sm">今日活跃</p>
          <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-gray-500 text-sm">已禁用</p>
          <p className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'banned').length}</p>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">用户信息</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">会员状态</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">注册时间</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">最后登录</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">学习时长</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">账号状态</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-elder-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-elder-primary font-medium">{user.nickname.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-elder-dark">{user.nickname}</p>
                        <p className="text-sm text-gray-500">{user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getMemberBadge(user.member_status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.studyHours}小时</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status === 'active' ? '正常' : '已禁用'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setEditingUser(user);
                          setShowEditDialog(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg text-blue-500"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(user.id)}
                        className={`p-2 hover:bg-gray-100 rounded-lg ${
                          user.status === 'active' ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 编辑用户弹窗 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">编辑用户信息</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">昵称</label>
                <Input
                  value={editingUser.nickname}
                  onChange={(e) => setEditingUser({ ...editingUser, nickname: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                <Input
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">会员状态</label>
                <select
                  value={editingUser.member_status}
                  onChange={(e) => setEditingUser({ ...editingUser, member_status: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg"
                >
                  <option value="free">普通用户</option>
                  <option value="monthly">月度VIP</option>
                  <option value="yearly">年度VIP</option>
                </select>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowEditDialog(false)} className="flex-1">
              取消
            </Button>
            <Button onClick={handleSaveUser} className="flex-1 bg-elder-primary hover:bg-elder-primary-dark">
              保存
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
