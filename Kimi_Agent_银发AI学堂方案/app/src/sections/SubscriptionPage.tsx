import { useState } from 'react';
import { Crown, Check, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';
import { useAuthStore, useNavigationStore, useSubscriptionStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const benefits = [
  '全部VIP课程无限学',
  '新课上架优先看',
  '视频倍速播放',
  '离线下载观看',
  '专属学习群',
  '一对一答疑服务',
];

const plans = [
  {
    id: 'monthly',
    name: '月度会员',
    price: 29,
    originalPrice: 39,
    period: '月',
    description: '适合短期体验',
    popular: false,
  },
  {
    id: 'yearly',
    name: '年度会员',
    price: 199,
    originalPrice: 468,
    period: '年',
    description: '最划算的选择',
    popular: true,
  },
];

export function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useAuthStore();
  const { setPage: navigate } = useNavigationStore();
  const { subscription, setSubscription } = useSubscriptionStore();
  const { showToast } = useUIStore();

  const isVip = subscription?.status === 'active' && 
    subscription?.expires_at && 
    new Date(subscription.expires_at) > new Date();

  const handleSubscribe = () => {
    if (!user) {
      navigate('login');
      return;
    }
    setShowPaymentDialog(true);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // 模拟支付流程
    setTimeout(() => {
      const plan = plans.find(p => p.id === selectedPlan);
      const now = new Date();
      const expiresAt = new Date();
      
      if (selectedPlan === 'monthly') {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      setSubscription({
        id: 'sub-' + Date.now(),
        user_id: user?.id || '',
        plan_type: selectedPlan as 'monthly' | 'yearly',
        status: 'active',
        amount: plan?.price || 0,
        currency: 'CNY',
        started_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        auto_renew: true,
        created_at: now.toISOString(),
      });

      setIsProcessing(false);
      setShowPaymentDialog(false);
      showToast('支付成功，恭喜您成为VIP会员！', 'success');
    }, 2000);
  };

  // 如果已经是VIP，显示会员状态
  if (isVip) {
    return (
      <main className="min-h-screen bg-elder-bg py-6 md:py-10">
        <div className="max-w-2xl mx-auto px-4">
          {/* VIP状态卡片 */}
          <div className="bg-elder-accent rounded-3xl p-8 text-elder-dark text-center mb-8">
            <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-12 h-12 text-elder-dark" />
            </div>
            <h1 className="text-3xl font-bold mb-2">您是VIP会员</h1>
            <p className="text-elder-dark/80 text-lg mb-6">
              有效期至: {new Date(subscription!.expires_at!).toLocaleDateString()}
            </p>
            <div className="flex items-center justify-center gap-2 text-elder-dark/70">
              <Check className="w-5 h-5" />
              <span>自动续费已开启</span>
            </div>
          </div>

          {/* 会员权益 */}
          <div className="elder-card">
            <h2 className="text-xl font-bold text-elder-dark mb-6">您的专属权益</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-elder-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-elder-primary" />
                  </div>
                  <span className="text-lg text-elder-dark">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-elder-bg py-6 md:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-elder-primary/10 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-elder-primary" />
            <span className="text-elder-primary font-medium">解锁全部课程</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-elder-dark mb-3">
            开通VIP会员
          </h1>
          <p className="text-lg text-elder-gray max-w-xl mx-auto">
            加入银发AI学堂VIP，畅享全部国产AI精品课程
          </p>
        </div>

        {/* 会员权益 */}
        <div className="elder-card mb-8">
          <h2 className="text-xl font-bold text-elder-dark mb-6 text-center">
            VIP专属权益
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-elder-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-elder-primary" />
                </div>
                <span className="text-base text-elder-dark font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 套餐选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`
                relative p-6 rounded-2xl cursor-pointer transition-all duration-300
                ${selectedPlan === plan.id
                  ? 'bg-elder-primary text-white shadow-lg scale-105'
                  : 'bg-white text-elder-dark hover:shadow-card'
                }
              `}
            >
              {/* 热门标签 */}
              {plan.popular && (
                <div className={`
                  absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold
                  ${selectedPlan === plan.id ? 'bg-white text-elder-primary' : 'bg-elder-accent text-elder-dark'}
                `}>
                  最受欢迎
                </div>
              )}

              <div className="text-center pt-2">
                <h3 className={`text-xl font-bold mb-2 ${selectedPlan === plan.id ? 'text-white' : 'text-elder-dark'}`}>
                  {plan.name}
                </h3>
                <p className={`text-base mb-4 ${selectedPlan === plan.id ? 'text-white/80' : 'text-elder-gray'}`}>
                  {plan.description}
                </p>
                
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-sm">¥</span>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-base ${selectedPlan === plan.id ? 'text-white/80' : 'text-elder-gray'}`}>
                    /{plan.period}
                  </span>
                </div>
                
                <p className={`text-sm line-through ${selectedPlan === plan.id ? 'text-white/60' : 'text-gray-400'}`}>
                  原价 ¥{plan.originalPrice}
                </p>

                {/* 选择指示器 */}
                <div className={`
                  mt-4 w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center
                  ${selectedPlan === plan.id 
                    ? 'border-white bg-white' 
                    : 'border-gray-300'
                  }
                `}>
                  {selectedPlan === plan.id && (
                    <Check className="w-4 h-4 text-elder-primary" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 开通按钮 */}
        <Button
          onClick={handleSubscribe}
          className="w-full elder-btn-primary text-xl py-4 h-auto"
        >
          <Crown className="w-6 h-6 mr-2" />
          立即开通VIP
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>

        {/* 安全提示 */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-elder-gray">
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>安全支付</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            <span>即时开通</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4" />
            <span>随时取消</span>
          </div>
        </div>
      </div>

      {/* 支付弹窗 */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">确认支付</DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <div className="text-center mb-6">
              <p className="text-elder-gray mb-2">开通{plans.find(p => p.id === selectedPlan)?.name}</p>
              <p className="text-4xl font-bold text-elder-primary">
                ¥{plans.find(p => p.id === selectedPlan)?.price}
              </p>
            </div>

            {/* 支付方式 */}
            <div className="space-y-3 mb-6">
              <p className="text-base font-medium text-elder-dark">选择支付方式</p>
              <div className="flex gap-3">
                <button className="flex-1 p-4 border-2 border-elder-primary rounded-xl bg-elder-primary/5">
                  <p className="font-medium text-elder-primary">微信支付</p>
                </button>
                <button className="flex-1 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300">
                  <p className="font-medium text-elder-gray">支付宝</p>
                </button>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full elder-btn-primary"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  支付处理中...
                </span>
              ) : (
                '确认支付'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
