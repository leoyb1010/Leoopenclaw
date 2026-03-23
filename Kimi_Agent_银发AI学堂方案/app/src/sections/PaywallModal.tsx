import { Crown, Check, Sparkles } from 'lucide-react';
import { useUIStore, useNavigationStore } from '@/store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

const benefits = [
  '解锁本课程全部内容',
  '30+ VIP课程无限学',
  '视频倍速播放',
  '专属学习群',
];

export function PaywallModal() {
  const { showPaywall, hidePaywallModal } = useUIStore();
  const { setPage: navigate } = useNavigationStore();

  const handleSubscribe = () => {
    hidePaywallModal();
    navigate('subscription');
  };

  const handleClose = () => {
    hidePaywallModal();
  };

  return (
    <Dialog open={showPaywall} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* 顶部装饰 */}
        <div className="bg-elder-primary p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            解锁VIP专属内容
          </h2>
          <p className="text-white/80 text-base">
            开通会员，畅享全部国产AI课程
          </p>
        </div>

        {/* 内容区 */}
        <div className="p-6">
          {/* 权益列表 */}
          <div className="space-y-3 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-elder-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-elder-primary" />
                </div>
                <span className="text-base text-elder-dark">{benefit}</span>
              </div>
            ))}
          </div>

          {/* 价格信息 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
            <p className="text-elder-gray text-sm mb-1">月度会员</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-lg">¥</span>
              <span className="text-3xl font-bold text-elder-primary">29</span>
              <span className="text-elder-gray">/月</span>
            </div>
            <p className="text-sm text-gray-400 line-through mt-1">原价 ¥39</p>
          </div>

          {/* 按钮组 */}
          <div className="space-y-3">
            <Button
              onClick={handleSubscribe}
              className="w-full elder-btn-primary"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              立即开通VIP
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full h-14 text-lg rounded-xl border-2"
            >
              稍后再说
            </Button>
          </div>

          {/* 提示 */}
          <p className="text-center text-sm text-elder-gray mt-4">
            开通后可随时取消，无额外费用
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
