import { Clock, Play, Crown, ChevronRight, Star } from 'lucide-react';
import { useNavigationStore, useCourseStore, useSubscriptionStore, useUIStore } from '@/store';
import type { Course } from '@/types';
import { Button } from '@/components/ui/button';

// 国内AI模型课程数据
const mockCourses: Course[] = [
  {
    id: '1',
    category_id: '1',
    title: '豆包帮您安排一天',
    subtitle: '用豆包AI规划日常生活',
    cover_image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop',
    description: '学习如何使用豆包AI安排日常作息、提醒事项、生活规划，让每一天都井井有条。',
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
    description: '学习使用通义千问比较商品、查看评价、获取购买建议，做明智的购物决策。',
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
    description: '学习使用蚂蚁阿福获取健康知识、制定养生计划、管理日常健康。',
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
    description: '学习使用文心一言获取知识解答、学习新技能、解答日常疑问。',
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
    description: '学习使用豆包AI撰写退休游记、回忆录，记录人生精彩时刻。',
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
    description: '深入学习使用通义千问进行商品比价、找优惠券、识别促销套路。',
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
  {
    id: '7',
    category_id: '5',
    title: '清言帮您写文档',
    subtitle: '用智谱清言提升办公效率',
    cover_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    description: '学习使用智谱清言撰写文档、整理资料、提升办公效率。',
    instructor_name: '孙老师',
    instructor_avatar: null,
    instructor_bio: '办公软件专家',
    is_vip_only: false,
    is_free_preview: true,
    preview_minutes: 15,
    total_duration: 110,
    total_lessons: 7,
    difficulty: 'beginner',
    sort_order: 7,
    is_published: true,
    created_at: '2024-01-07',
    ai_model: '智谱清言',
    ai_model_icon: '💼',
  },
  {
    id: '8',
    category_id: '6',
    title: '混元陪您聊天解闷',
    subtitle: '用腾讯混元打发闲暇时光',
    cover_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    description: '学习使用腾讯混元进行有趣的对话、获取娱乐内容、打发闲暇时光。',
    instructor_name: '周老师',
    instructor_avatar: null,
    instructor_bio: '互联网产品专家',
    is_vip_only: false,
    is_free_preview: true,
    preview_minutes: 18,
    total_duration: 90,
    total_lessons: 5,
    difficulty: 'beginner',
    sort_order: 8,
    is_published: true,
    created_at: '2024-01-08',
    ai_model: '腾讯混元',
    ai_model_icon: '💬',
  },
];

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

function CourseCard({ course, onClick }: CourseCardProps) {
  const isVip = course.is_vip_only;

  return (
    <div 
      onClick={onClick}
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
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-elder-dark">
            {course.ai_model_icon} {course.ai_model}
          </span>
        </div>
        {/* VIP标签 */}
        <div className="absolute top-3 right-3">
          {isVip ? (
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
  );
}

interface CourseSectionProps {
  title: string;
  subtitle?: string;
  courses?: Course[];
  showViewAll?: boolean;
}

export function CourseSection({ 
  title, 
  subtitle, 
  courses = mockCourses,
  showViewAll = true 
}: CourseSectionProps) {
  const { setPage: navigate } = useNavigationStore();
  const { setCurrentCourse } = useCourseStore();
  const { isVip } = useSubscriptionStore();
  const { showPaywallModal } = useUIStore();

  const handleCourseClick = (course: Course) => {
    // 检查权限
    if (course.is_vip_only && !isVip()) {
      showPaywallModal(course.id);
      return;
    }
    
    setCurrentCourse(course);
    navigate('course-detail', course.id);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区 */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-elder-dark mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-elder-gray">{subtitle}</p>
            )}
          </div>
          {showViewAll && (
            <Button
              variant="ghost"
              onClick={() => navigate('courses')}
              className="hidden sm:flex items-center gap-1 text-elder-primary hover:text-elder-primary-dark hover:bg-elder-primary/10 text-lg"
            >
              查看全部
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* 课程网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onClick={() => handleCourseClick(course)}
            />
          ))}
        </div>

        {/* 移动端查看全部按钮 */}
        {showViewAll && (
          <div className="mt-8 text-center sm:hidden">
            <Button
              variant="outline"
              onClick={() => navigate('courses')}
              className="elder-btn-outline"
            >
              查看全部课程
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export { mockCourses };
