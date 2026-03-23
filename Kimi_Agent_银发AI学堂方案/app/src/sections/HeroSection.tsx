import { ArrowRight, Play, Sparkles, BookOpen } from 'lucide-react';
import { useNavigationStore, useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';

// 国内AI模型
const domesticModels = [
  { name: '豆包', desc: '生活助手' },
  { name: '通义千问', desc: '购物帮手' },
  { name: '文心一言', desc: '学习伙伴' },
  { name: '智谱清言', desc: '办公利器' },
];

export function HeroSection() {
  const { setPage } = useNavigationStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative bg-gradient-to-br from-elder-bg-warm via-white to-elder-bg py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* 装饰元素 */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-elder-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-elder-accent/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 左侧内容 */}
          <div className="text-center lg:text-left">
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-elder-primary/10 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-elder-primary" />
              <span className="text-elder-primary font-medium text-base">
                专为50岁+朋友设计
              </span>
            </div>

            {/* 主标题 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-elder-dark leading-tight mb-6">
              轻松学会
              <span className="text-elder-primary"> 国产AI</span>
              <br />
              让生活更智能
            </h1>

            {/* 副标题 */}
            <p className="text-lg md:text-xl text-elder-gray leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              大字大屏、步骤详细、讲解慢速，从零开始教您使用豆包、通义千问、文心一言等国产AI工具，
              让生活更便捷、更精彩。
            </p>

            {/* 国内AI模型标签 */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
              {domesticModels.map((model, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-elder-gray"
                >
                  <span className="font-medium text-elder-dark">{model.name}</span>
                  <span className="text-elder-gray-light ml-1">· {model.desc}</span>
                </span>
              ))}
            </div>

            {/* CTA按钮组 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => setPage('courses')}
                className="elder-btn-primary gap-2"
              >
                <BookOpen className="w-6 h-6" />
                浏览课程
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              {!isAuthenticated && (
                <Button
                  onClick={() => setPage('login')}
                  variant="outline"
                  className="elder-btn-outline gap-2"
                >
                  <Play className="w-6 h-6" />
                  免费试看
                </Button>
              )}
            </div>

            {/* 数据统计 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10 mt-10 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-elder-primary">30+</p>
                <p className="text-base text-elder-gray mt-1">精品课程</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-elder-accent">6</p>
                <p className="text-base text-elder-gray mt-1">主流国产AI</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-elder-success">98%</p>
                <p className="text-base text-elder-gray mt-1">好评率</p>
              </div>
            </div>
          </div>

          {/* 右侧插图 */}
          <div className="relative hidden lg:block">
            <div className="relative bg-white rounded-3xl shadow-card-hover p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* 课程卡片预览 */}
              <div className="bg-gradient-to-br from-elder-primary to-elder-primary-light rounded-2xl p-6 text-white mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">豆包AI生活助手</p>
                    <p className="text-white/80 text-base">让AI帮您安排日常生活</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-white/20 rounded-lg">8课时</span>
                  <span className="px-2 py-1 bg-white/20 rounded-lg">免费试看</span>
                </div>
              </div>

              {/* 学习进度预览 */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-lg text-elder-dark">我的学习</p>
                  <span className="text-elder-primary font-medium">2门进行中</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-elder-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-elder-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-elder-dark">通义千问购物指南</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div className="w-3/5 h-2 bg-elder-primary rounded-full" />
                      </div>
                    </div>
                    <span className="text-elder-gray text-sm">60%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-elder-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-elder-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-elder-dark">文心一言养生问答</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div className="w-1/4 h-2 bg-elder-accent rounded-full" />
                      </div>
                    </div>
                    <span className="text-elder-gray text-sm">25%</span>
                  </div>
                </div>
              </div>

              {/* 悬浮装饰 */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-elder-accent rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <span className="text-2xl font-bold text-elder-dark">VIP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
