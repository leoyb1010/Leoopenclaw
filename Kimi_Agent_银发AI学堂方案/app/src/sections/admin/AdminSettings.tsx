import { useState } from 'react';
import { Save, Bell, Shield, CreditCard, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: '银发AI学堂',
    siteDescription: '专为50岁以上中老年人群设计的AI在线学习平台',
    monthlyPrice: 29,
    yearlyPrice: 199,
    freePreviewMinutes: 10,
    enableRegistration: true,
    enableSms: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    alert('设置已保存');
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-elder-dark">系统设置</h2>
        <Button onClick={handleSave} className="bg-elder-primary hover:bg-elder-primary-dark">
          <Save className="w-5 h-5 mr-2" />
          保存设置
        </Button>
      </div>

      {/* 设置表单 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 基础设置 */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-elder-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-elder-primary" />
            </div>
            <h3 className="text-lg font-bold text-elder-dark">基础设置</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">网站名称</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">网站描述</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
              />
            </div>
          </div>
        </div>

        {/* 价格设置 */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-elder-dark">会员价格</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">月度会员价格 (元)</label>
              <input
                type="number"
                value={settings.monthlyPrice}
                onChange={(e) => setSettings({ ...settings, monthlyPrice: parseInt(e.target.value) || 0 })}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">年度会员价格 (元)</label>
              <input
                type="number"
                value={settings.yearlyPrice}
                onChange={(e) => setSettings({ ...settings, yearlyPrice: parseInt(e.target.value) || 0 })}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">免费试看时长 (分钟)</label>
              <input
                type="number"
                value={settings.freePreviewMinutes}
                onChange={(e) => setSettings({ ...settings, freePreviewMinutes: parseInt(e.target.value) || 0 })}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-lg"
              />
            </div>
          </div>
        </div>

        {/* 功能开关 */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-elder-dark">功能开关</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
              <span className="text-gray-700">开放注册</span>
              <input
                type="checkbox"
                checked={settings.enableRegistration}
                onChange={(e) => setSettings({ ...settings, enableRegistration: e.target.checked })}
                className="w-6 h-6"
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
              <span className="text-gray-700">短信通知</span>
              <input
                type="checkbox"
                checked={settings.enableSms}
                onChange={(e) => setSettings({ ...settings, enableSms: e.target.checked })}
                className="w-6 h-6"
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
              <span className="text-gray-700">维护模式</span>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="w-6 h-6"
              />
            </label>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-elder-dark">联系方式</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">客服电话</label>
              <input
                type="text"
                placeholder="400-888-8888"
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">客服邮箱</label>
              <input
                type="email"
                placeholder="help@yinfai-ai.com"
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">工作时间</label>
              <input
                type="text"
                placeholder="周一至周日 9:00-21:00"
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
