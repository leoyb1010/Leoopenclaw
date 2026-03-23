// ============================================
// 用户相关类型
// ============================================
export interface User {
  id: string;
  phone: string;
  nickname: string | null;
  avatar_url: string | null;
  birth_year: number | null;
  member_status: 'free' | 'monthly' | 'yearly';
  member_expire_at: string | null;
  created_at: string;
  last_login_at: string | null;
  role?: 'user' | 'admin';
  status?: 'active' | 'inactive' | 'banned';
}

// ============================================
// 课程相关类型
// ============================================
export interface CourseCategory {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
}

export interface CourseLesson {
  id: string;
  course_id: string;
  title: string;
  video_url: string;
  duration: number;
  sort_order: number;
  is_free: boolean;
}

export interface Course {
  id: string;
  category_id: string;
  category?: CourseCategory;
  title: string;
  subtitle: string | null;
  cover_image: string | null;
  description: string | null;
  instructor_name: string;
  instructor_avatar: string | null;
  instructor_bio: string | null;
  is_vip_only: boolean;
  is_free_preview: boolean;
  preview_minutes: number;
  total_duration: number;
  total_lessons: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
  lessons?: CourseLesson[];
  // 国内AI模型相关
  ai_model?: string;
  ai_model_icon?: string;
}

// ============================================
// 学习进度类型
// ============================================
export interface LearningProgress {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  progress_seconds: number;
  is_completed: boolean;
  last_watched_at: string;
  course?: Course;
  lesson?: CourseLesson;
}

// ============================================
// 订阅相关类型
// ============================================
export interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'monthly' | 'yearly';
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  amount: number;
  currency: string;
  started_at: string | null;
  expires_at: string | null;
  auto_renew: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  subscription_id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: 'wechat' | 'alipay';
  transaction_id: string | null;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paid_at: string | null;
  created_at: string;
}

// ============================================
// 页面路由类型
// ============================================
export type PageRoute = 
  | 'home' 
  | 'courses' 
  | 'course-detail' 
  | 'video-player' 
  | 'profile' 
  | 'login' 
  | 'subscription'
  | 'history'
  | 'admin';

// ============================================
// 后台管理页面类型
// ============================================
export type AdminPage = 
  | 'dashboard' 
  | 'courses' 
  | 'users' 
  | 'orders' 
  | 'settings';

// ============================================
// 应用状态类型
// ============================================
export interface AppState {
  currentPage: PageRoute;
  currentCourseId: string | null;
  currentLessonId: string | null;
  isMobileMenuOpen: boolean;
}

// ============================================
// 国内AI模型类型
// ============================================
export interface AIModel {
  id: string;
  name: string;
  company: string;
  icon: string;
  color: string;
  description: string;
  categories: string[];
}
