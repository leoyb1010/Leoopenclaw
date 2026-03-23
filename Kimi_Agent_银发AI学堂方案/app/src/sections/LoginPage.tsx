import { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuthStore, useNavigationStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginPage() {
  const [loginType, setLoginType] = useState<'code' | 'password'>('code');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCodeSending, setIsCodeSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { setUser, setAuthenticated, setAdmin } = useAuthStore();
  const { goHome } = useNavigationStore();
  const { showToast } = useUIStore();

  // 发送验证码
  const handleSendCode = async () => {
    if (!phone || phone.length !== 11) {
      showToast('请输入正确的手机号', 'error');
      return;
    }
    
    setIsCodeSending(true);
    setCountdown(60);
    
    // 模拟发送验证码
    showToast('验证码已发送，请查收', 'success');
    
    // 倒计时
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCodeSending(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 登录
  const handleLogin = async () => {
    if (!phone || phone.length !== 11) {
      showToast('请输入正确的手机号', 'error');
      return;
    }

    if (loginType === 'code' && !code) {
      showToast('请输入验证码', 'error');
      return;
    }

    if (loginType === 'password' && !password) {
      showToast('请输入密码', 'error');
      return;
    }

    setIsLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      // 模拟用户数据
      const isAdminUser = phone === '13800138000'; // 管理员账号
      const mockUser = {
        id: 'user-' + Date.now(),
        phone: phone,
        nickname: isAdminUser ? '管理员' : null,
        avatar_url: null,
        birth_year: null,
        member_status: isAdminUser ? 'yearly' as const : 'free' as const,
        member_expire_at: isAdminUser ? '2025-12-31' : null,
        created_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
        role: isAdminUser ? 'admin' as const : 'user' as const,
        status: 'active' as const,
      };

      setUser(mockUser);
      setAuthenticated(true);
      setAdmin(isAdminUser);
      setIsLoading(false);
      showToast(isAdminUser ? '管理员登录成功！' : '登录成功，欢迎回来！', 'success');
      goHome();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-elder-bg py-8 md:py-16">
      <div className="max-w-md mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-elder-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">AI</span>
          </div>
          <h1 className="text-3xl font-bold text-elder-dark mb-2">
            欢迎回来
          </h1>
          <p className="text-lg text-elder-gray">
            登录后继续您的AI学习之旅
          </p>
        </div>

        {/* 登录卡片 */}
        <div className="elder-card">
          {/* 切换登录方式 */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
            <button
              onClick={() => setLoginType('code')}
              className={`
                flex-1 py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200
                ${loginType === 'code' 
                  ? 'bg-white text-elder-primary shadow-sm' 
                  : 'text-elder-gray hover:text-elder-dark'
                }
              `}
            >
              验证码登录
            </button>
            <button
              onClick={() => setLoginType('password')}
              className={`
                flex-1 py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200
                ${loginType === 'password' 
                  ? 'bg-white text-elder-primary shadow-sm' 
                  : 'text-elder-gray hover:text-elder-dark'
                }
              `}
            >
              密码登录
            </button>
          </div>

          {/* 表单 */}
          <div className="space-y-5">
            {/* 手机号 */}
            <div>
              <label className="block text-lg font-medium text-elder-dark mb-2">
                手机号码
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="请输入11位手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  className="elder-input pl-14"
                  maxLength={11}
                />
              </div>
            </div>

            {/* 验证码或密码 */}
            {loginType === 'code' ? (
              <div>
                <label className="block text-lg font-medium text-elder-dark mb-2">
                  验证码
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="请输入6位验证码"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="elder-input pl-14"
                      maxLength={6}
                    />
                  </div>
                  <Button
                    onClick={handleSendCode}
                    disabled={isCodeSending || countdown > 0}
                    className={`
                      px-4 h-14 rounded-xl font-medium text-base whitespace-nowrap
                      ${countdown > 0 
                        ? 'bg-gray-300 text-gray-500' 
                        : 'bg-elder-primary text-white hover:bg-elder-primary-dark'
                      }
                    `}
                  >
                    {countdown > 0 ? `${countdown}秒后重发` : '获取验证码'}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-lg font-medium text-elder-dark mb-2">
                  登录密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="elder-input pl-14 pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 登录按钮 */}
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full elder-btn-primary mt-6"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  登录中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  立即登录
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </div>

          {/* 其他选项 */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-base text-elder-gray">
              还没有账号？
              <button 
                onClick={handleLogin}
                className="text-elder-primary font-medium hover:underline ml-1"
              >
                立即注册
              </button>
            </p>
          </div>
        </div>

        {/* 服务说明 */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <CheckCircle2 className="w-4 h-4 text-elder-success" />
          <span>登录即表示同意</span>
          <a href="#" className="text-elder-primary hover:underline">用户协议</a>
          <span>和</span>
          <a href="#" className="text-elder-primary hover:underline">隐私政策</a>
        </div>

        {/* 管理员提示 */}
        <div className="mt-6 p-4 bg-elder-primary/5 rounded-xl text-center">
          <p className="text-sm text-elder-gray">
            管理员测试账号: <span className="font-mono text-elder-primary">13800138000</span>
          </p>
        </div>
      </div>
    </main>
  );
}
