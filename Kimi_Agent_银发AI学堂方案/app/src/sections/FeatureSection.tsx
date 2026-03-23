import { 
  Monitor, 
  Volume2, 
  RotateCcw, 
  HeadphonesIcon,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: Monitor,
    title: '大字大屏设计',
    description: '字号不低于18px，按钮清晰醒目，让您看得清、点得准',
    color: 'text-elder-primary',
    bgColor: 'bg-elder-primary/10',
  },
  {
    icon: Volume2,
    title: '慢速清晰讲解',
    description: '视频语速适中，可自由调节倍速，重要内容重复强调',
    color: 'text-elder-accent',
    bgColor: 'bg-elder-accent/20',
  },
  {
    icon: RotateCcw,
    title: '自动记忆进度',
    description: '自动保存学习进度，下次打开从上次位置继续观看',
    color: 'text-elder-success',
    bgColor: 'bg-elder-success/10',
  },
  {
    icon: HeadphonesIcon,
    title: '专属客服支持',
    description: '遇到任何问题，随时联系客服，电话微信都能找得到人',
    color: 'text-elder-primary',
    bgColor: 'bg-elder-primary/10',
  },
];

const highlights = [
  '零基础也能学会',
  '步骤详细拆解',
  '反复观看不限次',
  '手机电脑都能学',
  '学习群互助交流',
  '定期更新内容',
];

export function FeatureSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-elder-dark mb-3">
            专为中老年设计
          </h2>
          <p className="text-lg text-elder-gray max-w-2xl mx-auto">
            每一个细节都为您着想，让学习变得简单轻松
          </p>
        </div>

        {/* 特色功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="elder-card text-center group hover:shadow-card-hover transition-all duration-300"
              >
                {/* 图标 */}
                <div className={`
                  w-16 h-16 rounded-2xl ${feature.bgColor} 
                  flex items-center justify-center mx-auto mb-5
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* 内容 */}
                <h3 className="text-xl font-bold text-elder-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-elder-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 亮点标签 */}
        <div className="bg-elder-primary/5 rounded-3xl p-8">
          <div className="flex flex-wrap justify-center gap-4">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-elder-success" />
                <span className="text-lg font-medium text-elder-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
