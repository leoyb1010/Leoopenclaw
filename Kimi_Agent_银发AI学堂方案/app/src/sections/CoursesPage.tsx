import { useState } from 'react';
import { Search, Filter, Clock, Play, Crown, Star, ChevronRight } from 'lucide-react';
import { useNavigationStore, useCourseStore, useSubscriptionStore, useUIStore } from '@/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Course } from '@/types';

// 国内AI模型课程数据
const allCourses: Course[] = [
  {
    id: '1',
    category_id: '1',
    title: '豆包帮您安排一天',
    subtitle: '用豆包AI规划日常生活',
    cover_image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop',
    description: '学习如何使用豆包AI安排日常作息、提醒事项、生活规划。',
    instructor_name: '李老师',
    instructor_avatar: null,
    instructor_bio: '豆包认证讲师',
    is_vip_only: false,
    is_free_preview: true,
    preview_minutes: 10,
    total_duration: 90,
    total_lessons: 6,
    difficulty: 'beginner',
    sort_order: 1,
    is_published: true,
    created_at: '2024-01-01',
    ai_model: '豆包',
    ai_model_icon: '🏠',
  },
  {
    id: '2',
    category_id: '2',
    title: '千问帮您选商品',
    subtitle: '用通义千问做购物决策',
    cover_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    description: '学习使用通义千问比较商品、查看评价、获取购买建议。',
    instructor_name: '王老师',
    instructor_avatar: null,
    instructor_bio: '电商资深讲师',
    is_vip_only: false,
    is_free_preview: true,
    preview_minutes: 15,
    total_duration: 80,
    total_lessons: 5,
    difficulty: 'beginner',
    sort_order: 2,
    is_published: true,
    created_at: '2024-01-02',
    ai_model: '通义千问',
    ai_model_icon: '🛍️',
  },
  {
    id: '3',
    category_id: '3',
    title: '阿福教您养生知识',
    subtitle: '用蚂蚁阿福管理健康',
    cover_image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop',
    description: '学习使用蚂蚁阿福获取健康知识、制定养生计划。',
    instructor_name: '陈老师',
    instructor_avatar: null,
    instructor_bio: '健康管理师',
    is_vip_only: false,
    is_free_preview: true,
    preview_minutes: 20,
    total_duration: 100,
    total_lessons: 6,
    difficulty: 'beginner',
    sort_order: 3,
    is_published: true,
    created_at: '2024-01-03',
    ai_model: '蚂蚁阿福',
    ai_model_icon: '❤️',
  },
  {
    id: '4',
    category_id: '4',
    title: '一言陪您学知识',
    subtitle: '用文心一言学习新技能',
    cover_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    description: '学习使用文心一言获取知识解答、学习新技能。',
    instructor_name: '张老师',
    instructor_avatar: null,
    instructor_bio: '教育行业专家',
    is_vip_only: false,
    is_free_preview: true,
    preview_minutes: 12,
    total_duration: 120,
    total_lessons: 8,
    difficulty: 'beginner',
    sort_order: 4,
    is_published: true,
    created_at: '2024-01-04',
    ai_model: '文心一言',
    ai_model_icon: '📚',
  },
  {
    id: '5',
    category_id: '1',
    title: '豆包写退休游记',
    subtitle: '用豆包记录精彩人生',
    cover_image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    description: '学习使用豆包AI撰写退休游记、回忆录。',
    instructor_name: '刘老师',
    instructor_avatar: null,
    instructor_bio: '资深写作讲师',
    is_vip_only: true,
    is_free_preview: true,
    preview_minutes: 8,
    total_duration: 150,
    total_lessons: 10,
    difficulty: 'intermediate',
    sort_order: 5,
    is_published: true,
    created_at: '2024-01-05',
    ai_model: '豆包',
    ai_model_icon: '✍️',
  },
  {
    id: '6',
    category_id: '2',
    title: '千问教您比价省钱',
    subtitle: '聪明购物不花冤枉钱',
    cover_image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
    description: '深入学习使用通义千问进行商品比价、找优惠券。',
    instructor_name: '赵老师',
    instructor_avatar: null,
    instructor_bio: '消费理财专家',
    is_vip_only: true,
    is_free_preview: true,
    preview_minutes: 10,
    total_duration: 140,
    total_lessons: 8,
    difficulty: 'intermediate',
    sort_order: 6,
    is_published: true,
    created_at: '2024-01-06',
    ai_model: '通义千问',
    ai_model_icon: '💰',
  },
];

const filters = [
  { id: 'all', label: '全部课程' },
  { id: 'free', label: '免费课程' },
  { id: 'vip', label: 'VIP专属' },
  { id: 'beginner', label: '入门级别' },
  { id: 'intermediate', label: '进阶级别' },
];

// AI模型筛选
const aiModelFilters = [
  { id: 'all', label: '全部模型' },
  { id: '豆包', label: '豆包' },
  { id: '通义千问', label: '通义千问' },
  { id: '蚂蚁阿福', label: '蚂蚁阿福' },
  { id: '文心一言', label: '文心一言' },
  { id: '智谱清言', label: '智谱清言' },
  { id: '腾讯混元', label: '腾讯混元' },
];

export function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModelFilter, setActiveModelFilter] = useState('all');
  
  const { setPage: navigate } = useNavigationStore();
  const { setCurrentCourse } = useCourseStore();
  const { isVip } = useSubscriptionStore();
  const { showPaywallModal } = useUIStore();

  // 过滤课程
  const filteredCourses = allCourses.filter((course) => {
    // 搜索过滤
    if (searchQuery && !course.title.includes(searchQuery) && !course.subtitle?.includes(searchQuery)) {
      return false;
    }
    
    // AI模型过滤
    if (activeModelFilter !== 'all' && course.ai_model !== activeModelFilter) {
      return false;
    }
    
    // 分类过滤
    switch (activeFilter) {
      case 'free':
        return !course.is_vip_only;
      case 'vip':
        return course.is_vip_only;
      case 'beginner':
        return course.difficulty === 'beginner';
      case 'intermediate':
        return course.difficulty === 'intermediate';
      default:
        return true;
    }
  });

  const handleCourseClick = (course: Course) => {
    if (course.is_vip_only && !isVip()) {
      showPaywallModal(course.id);
      return;
    }
    
    setCurrentCourse(course);
    navigate('course-detail', course.id);
  };

  return (
    <main className="min-h-screen bg-elder-bg py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-elder-dark mb-2">
            全部课程
          </h1>
          <p className="text-lg text-elder-gray">
            探索国产AI学习内容，找到适合您的课程
          </p>
        </div>

        {/* 搜索和过滤 */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-card mb-8">
          {/* 搜索框 */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索课程名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="elder-input pl-14"
            />
          </div>

          {/* AI模型过滤器 */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-sm text-elder-gray">AI模型:</span>
            {aiModelFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveModelFilter(filter.id)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${activeModelFilter === filter.id
                    ? 'bg-elder-primary text-white'
                    : 'bg-gray-100 text-elder-gray hover:bg-gray-200'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* 类型过滤器 */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-elder-gray flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  px-4 py-2 rounded-full text-base font-medium transition-all duration-200
                  ${activeFilter === filter.id
                    ? 'bg-elder-primary text-white'
                    : 'bg-gray-100 text-elder-gray hover:bg-gray-200'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 课程列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="elder-card-hover cursor-pointer group"
            >
              {/* 封面图 */}
              <div className="relative rounded-xl overflow-hidden mb-4 aspect-video">
                <img
                  src={course.cover_image || '/placeholder-course.jpg'}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* AI模型标签 */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-elder-dark">
                    {course.ai_model_icon} {course.ai_model}
                  </span>
                </div>
                {/* VIP标签 */}
                <div className="absolute top-3 right-3">
                  {course.is_vip_only ? (
                    <span className="elder-badge-vip">
                      <Crown className="w-4 h-4 mr-1" />
                      VIP
                    </span>
                  ) : (
                    <span className="elder-badge-free">免费</span>
                  )}
                </div>
                {/* 播放按钮 */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-elder-primary ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* 时长 */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded-lg text-white text-sm">
                  {Math.floor(course.total_duration / 60)}小时{course.total_duration % 60}分
                </div>
              </div>

              {/* 内容 */}
              <div>
                <h3 className="text-xl font-bold text-elder-dark mb-2 line-clamp-1 group-hover:text-elder-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-base text-elder-gray mb-3 line-clamp-2">
                  {course.subtitle}
                </p>

                {/* 讲师和评分 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-elder-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-elder-primary">
                        {course.instructor_name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-base text-elder-gray">{course.instructor_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-elder-accent fill-elder-accent" />
                    <span className="text-base font-medium">4.9</span>
                  </div>
                </div>

                {/* 课程信息 */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-sm text-elder-gray">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.total_lessons}课时
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                      {course.difficulty === 'beginner' ? '入门' : 
                       course.difficulty === 'intermediate' ? '进阶' : '高级'}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-elder-gray group-hover:text-elder-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-elder-dark mb-2">
              没有找到相关课程
            </h3>
            <p className="text-lg text-elder-gray mb-6">
              试试其他关键词或筛选条件
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setActiveModelFilter('all');
              }}
              className="elder-btn-secondary"
            >
              清除筛选
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
