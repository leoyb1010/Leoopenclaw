import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

// 模拟订单数据
const initialOrders = [
  { id: 'ORD20240120001', user: '李阿姨', phone: '139****6666', plan: '月度会员', amount: 29, status: 'success', date: '2024-01-20 14:30:00', method: '微信支付' },
  { id: 'ORD20240119002', user: '王叔叔', phone: '137****9999', plan: '年度会员', amount: 199, status: 'success', date: '2024-01-19 09:15:00', method: '支付宝' },
  { id: 'ORD20240118003', user: '张大爷', phone: '138****8888', plan: '月度会员', amount: 29, status: 'pending', date: '2024-01-18 16:45:00', method: '微信支付' },
  { id: 'ORD20240117004', user: '赵奶奶', phone: '136****7777', plan: '年度会员', amount: 199, status: 'failed', date: '2024-01-17 11:20:00', method: '支付宝' },
  { id: 'ORD20240116005', user: '刘爷爷', phone: '135****5555', plan: '月度会员', amount: 29, status: 'success', date: '2024-01-16 20:00:00', method: '微信支付' },
  { id: 'ORD20240115006', user: '陈大妈', phone: '134****4444', plan: '月度会员', amount: 29, status: 'success', date: '2024-01-15 08:30:00', method: '支付宝' },
  { id: 'ORD20240114007', user: '周大爷', phone: '133****3333', plan: '年度会员', amount: 199, status: 'success', date: '2024-01-14 15:45:00', method: '微信支付' },
];

export function AdminOrders() {
  const [orders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => 
    order.id.includes(searchQuery) || 
    order.user.includes(searchQuery) ||
    order.phone.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" />支付成功</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs flex items-center gap-1"><Clock className="w-3 h-3" />待支付</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1"><XCircle className="w-3 h-3" />支付失败</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">未知</span>;
    }
  };

  const totalAmount = orders.filter(o => o.status === 'success').reduce((sum, o) => sum + o.amount, 0);
  const todayAmount = orders.filter(o => o.status === 'success' && o.date.startsWith(new Date().toISOString().split('T')[0])).reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-6">
      {/* 标题和操作栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-elder-dark">订单管理</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索订单号、用户..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-gray-500 text-sm">总订单数</p>
          <p className="text-2xl font-bold text-elder-dark">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-gray-500 text-sm">总收入</p>
          <p className="text-2xl font-bold text-green-600">¥{totalAmount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-gray-500 text-sm">今日收入</p>
          <p className="text-2xl font-bold text-elder-primary">¥{todayAmount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-gray-500 text-sm">成功订单</p>
          <p className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'success').length}</p>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">订单号</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">用户信息</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">套餐类型</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">支付金额</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">支付方式</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">下单时间</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-elder-dark">{order.user}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.plan}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-elder-dark">¥{order.amount}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.method}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
