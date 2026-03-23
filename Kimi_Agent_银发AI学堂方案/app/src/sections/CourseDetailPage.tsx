import { useState } from 'react';
import { 
  Clock, 
  Play, 
  CheckCircle2, 
  Lock, 
  Crown, 
  User, 
  Star,
  ArrowLeft
} from 'lucide-react';
import { useNavigationStore, useCourseStore, useProgressStore, useSubscriptionStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';

// 模拟课程章节数据
const mockLessons = [
  { id: 'l1', course_id: '1', title: '课程介绍：豆包能帮我们做什么', video_url: '', duration: 300, sort_order: 1, is_free: true },
  { id: 'l2', course_id: '1', title: '注册豆包账号', video_url: '', duration: 480, sort_order: 2, is_free: true },
  { id: 'l3', course_id: '1', title: '如何与豆包对话', video_url: '', duration: 600, sort_order: 3, is_free: false },
  { id: 'l4', course_id: '1', title: '让豆包帮您安排日程', video_url: '', duration: 720, sort_order: 4, is_free: false },
  { id: 'l5', course_id: '1', title: '豆包提醒您重要事项', video_url: '', duration: 540, sort_order: 5, is_free: false },
  { id: 'l6', course_id: '1', title: '总结与练习', video_url: '', duration: 420, sort_order: 6, is_free: false },
];

export function CourseDetailPage() {
  const [expandedSections] = useState(true);
  
  const { goBack, currentCourseId, setPage: navigate } = useNavigationStore();
  const { currentCourse, getCourseById } = useCourseStore();
  const { getProgressByLesson } = useProgressStore();
  const { isVip } = useSubscriptionStore();
  const { showPaywallModal } = useUIStore();

  const course = currentCourse || getCourseById(currentCourseId || '');
  
  if (!course) {
    return (
      <main className="min-h-screen bg-elder-bg py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-elder-dark mb-4">课程不存在</h1>
          <Button onClick={goBack} className="elder-btn-primary">
            返回上一页
          </Button>
        </div>
      </main>
    );
  }

  const lessons = course.lessons || mockLessons;
  const isUserVip = isVip();

  const handleLessonClick = (lesson: typeof lessons[0]) => {
    if (!lesson.is_free && !isUserVip) {
      showPaywallModal(course.id);
      return;
    }
    navigate('video-player', course.id, lesson.id);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-elder-bg">
      {/* 顶部封面区 */}
      <div className="relative bg-elder-dark">
        <div className="absolute inset-0">
          <img
            src={course.cover_image || '/placeholder-course.jpg'}
            alt={course.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-elder-dark via-elder-dark/50 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* 返回按钮 */}
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg">返回</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧信息 */}
            <div className="lg:col-span-2">
              {/* AI模型标签 */}
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                  {course.ai_model_icon} {course.ai_model}
                </span>
                {course.is_vip_only ? (
                  <span className="elder-badge-vip">
                    <Crown className="w-4 h-4 mr-1" />
                    VIP专属
                  </span>
                ) : (
                  <span className="elder-badge-free">免费课程</span>
                )}
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                  {course.difficulty === 'beginner' ? '入门' : 
                   course.difficulty === 'intermediate' ? '进阶' : '高级'}
                </span>
              </div>

              {/* 标题 */}
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-white/80 mb-6">
                {course.subtitle}
              </p>

              {/* 讲师信息 */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{course.instructor_name}</p>
                  <p className="text-white/70 text-base">{course.instructor_bio}</p>
                </div>
              </div>

              {/* 课程数据 */}
              <div className="flex flex-wrap gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-base">{course.total_lessons}课时</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  <span className="text-base">
                    {Math.floor(course.total_duration / 60)}小时{course.total_duration % 60}分
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-elder-accent fill-elder-accent" />
                  <span className="text-base">4.9分</span>
                </div>
              </div>
            </div>

            {/* 右侧操作区 */}
            <div className="lg:text-right">
              {course.is_vip_only && !isUserVip ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <p className="text-white text-lg mb-4">此课程为VIP专属</p>
                  <Button
                    onClick={() => showPaywallModal(course.id)}
                    className="elder-btn-primary w-full"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    开通VIP学习
                  </Button>
                  <p className="text-white/60 text-sm mt-3">
                    开通后可学习全部VIP课程
                  </p>
                </div>
              ) : (
                <Button
                  onClick={() => handleLessonClick(lessons[0])}
                  className="elder-btn-primary text-xl px-10 py-4 h-auto"
                >
                  <Play className="w-6 h-6 mr-2" fill="currentColor" />
                  开始学习
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：课程介绍 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 课程简介 */}
            <div className="elder-card">
              <h2 className="text-xl font-bold text-elder-dark mb-4">
                课程简介
              </h2>
              <p className="text-lg text-elder-gray leading-relaxed">
                {course.description || '本课程将带您从零开始学习国产AI工具的使用，通过详细的步骤讲解和实际操作演示，让您轻松掌握AI技能。'}
              </p>
            </div>

            {/* 讲师介绍 */}
            <div className="elder-card">
              <h2 className="text-xl font-bold text-elder-dark mb-4">
                讲师介绍
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-elder-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-elder-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-elder-dark mb-2">
                    {course.instructor_name}
                  </h3>
                  <p className="text-base text-elder-gray leading-relaxed">
                    {course.instructor_bio || '资深AI应用讲师，拥有丰富的教学经验，擅长用通俗易懂的方式讲解复杂的技术概念。'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：课程目录 */}
          <div>
            <div className="elder-card sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-elder-dark">
                  课程目录
                </h2>
                <span className="text-elder-gray text-base">
                  共{lessons.length}节
                </span>
              </div>

              {expandedSections && (
                <div className="mt-4 space-y-2">
                  {lessons.map((lesson, index) => {
                    const progress = getProgressByLesson(lesson.id);
                    const isCompleted = progress?.is_completed;
                    const isLocked = !lesson.is_free && !isUserVip;

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        className={`
                          flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                          ${isLocked 
                            ? 'bg-gray-50 cursor-not-allowed' 
                            : 'hover:bg-gray-50 cursor-pointer'
                          }
                        `}
                      >
                        {/* 序号/状态 */}
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          ${isCompleted 
                            ? 'bg-elder-success text-white' 
                            : isLocked 
                              ? 'bg-gray-200 text-gray-400'
                              : 'bg-elder-primary/10 text-elder-primary'
                          }
                        `}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isLocked ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>

                        {/* 内容 */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${isLocked ? 'text-gray-400' : 'text-elder-dark'}`}>
                            {lesson.title}
                          </p>
                          <p className="text-sm text-elder-gray">
                            {formatDuration(lesson.duration)}
                          </p>
                        </div>

                        {/* 标签 */}
                        {lesson.is_free && (
                          <span className="px-2 py-0.5 bg-elder-success/10 text-elder-success text-xs rounded-full">
                            免费
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
