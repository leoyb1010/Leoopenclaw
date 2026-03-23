import { useNavigationStore } from '@/store';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  BookOpen, 
  Briefcase, 
  MessageCircle,
  ChevronRight
} from 'lucide-react';

// 国内AI模型分类
const categories = [
  {
    id: '1',
    name: '豆包·生活',
    description: '日常生活助手',
    icon: Home,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    model: '豆包',
  },
  {
    id: '2',
    name: '千问·购物',
    description: '智能购物帮手',
    icon: ShoppingBag,
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    model: '通义千问',
  },
  {
    id: '3',
    name: '阿福·健康',
    description: '健康管理顾问',
    icon: Heart,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    model: '蚂蚁阿福',
  },
  {
    id: '4',
    name: '一言·学习',
    description: '知识学习伙伴',
    icon: BookOpen,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    model: '文心一言',
  },
  {
    id: '5',
    name: '清言·办公',
    description: '办公效率工具',
    icon: Briefcase,
    color: 'from-sky-500 to-sky-600',
    bgColor: 'bg-sky-50',
    model: '智谱清言',
  },
  {
    id: '6',
    name: '混元·娱乐',
    description: '创意娱乐助手',
    icon: MessageCircle,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    model: '腾讯混元',
  },
];

export function CategorySection() {
  const { setPage } = useNavigationStore();

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-elder-dark mb-3">
            国产AI学习专区
          </h2>
          <p className="text-lg text-elder-gray max-w-2xl mx-auto">
            六大主流国产AI模型，总有一款适合您，从零开始轻松上手
          </p>
        </div>

        {/* 分类网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setPage('courses')}
                className={`
                  group relative p-6 rounded-2xl ${category.bgColor}
                  transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1
                `}
              >
                {/* 模型标签 */}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/80 rounded-full text-xs text-elder-gray">
                  {category.model}
                </div>

                {/* 图标 */}
                <div className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br ${category.color}
                  flex items-center justify-center mb-4 mx-auto
                  shadow-lg group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* 文字 */}
                <h3 className="text-lg font-bold text-elder-dark mb-1">
                  {category.name.split('·')[1]}
                </h3>
                <p className="text-sm text-elder-gray">
                  {category.description}
                </p>

                {/* 悬停箭头 */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-elder-gray" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
