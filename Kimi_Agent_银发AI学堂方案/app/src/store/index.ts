import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Course, CourseCategory, LearningProgress, Subscription, PageRoute } from '@/types';

// ============================================
// 认证状态 Store
// ============================================
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setAdmin: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAdmin: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setLoading: (value) => set({ isLoading: value }),
      setAdmin: (value) => set({ isAdmin: value }),
      logout: () => set({ user: null, isAuthenticated: false, isAdmin: false }),
    }),
    {
      name: 'elder-auth-storage',
    }
  )
);

// ============================================
// 导航状态 Store
// ============================================
interface NavigationStore {
  currentPage: PageRoute;
  currentCourseId: string | null;
  currentLessonId: string | null;
  navigationHistory: PageRoute[];
  setPage: (page: PageRoute, courseId?: string, lessonId?: string) => void;
  goBack: () => void;
  goHome: () => void;
}

export const useNavigationStore = create<NavigationStore>()(
  (set, get) => ({
    currentPage: 'home',
    currentCourseId: null,
    currentLessonId: null,
    navigationHistory: ['home'],
    setPage: (page, courseId, lessonId) => {
      const state = get();
      set({
        currentPage: page,
        currentCourseId: courseId || state.currentCourseId,
        currentLessonId: lessonId || state.currentLessonId,
        navigationHistory: [...state.navigationHistory, page],
      });
    },
    goBack: () => {
      const state = get();
      const history = [...state.navigationHistory];
      history.pop();
      const previousPage = history[history.length - 1] || 'home';
      set({
        currentPage: previousPage,
        navigationHistory: history,
      });
    },
    goHome: () => set({
      currentPage: 'home',
      navigationHistory: ['home'],
    }),
  })
);

// ============================================
// 课程数据 Store
// ============================================
interface CourseStore {
  categories: CourseCategory[];
  courses: Course[];
  featuredCourses: Course[];
  currentCourse: Course | null;
  isLoading: boolean;
  setCategories: (categories: CourseCategory[]) => void;
  setCourses: (courses: Course[]) => void;
  setFeaturedCourses: (courses: Course[]) => void;
  setCurrentCourse: (course: Course | null) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  setLoading: (value: boolean) => void;
  getCourseById: (id: string) => Course | undefined;
  getCoursesByCategory: (categoryId: string) => Course[];
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      categories: [],
      courses: [],
      featuredCourses: [],
      currentCourse: null,
      isLoading: false,
      setCategories: (categories) => set({ categories }),
      setCourses: (courses) => set({ courses }),
      setFeaturedCourses: (courses) => set({ featuredCourses: courses }),
      setCurrentCourse: (course) => set({ currentCourse: course }),
      addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
      updateCourse: (course) => set((state) => ({
        courses: state.courses.map((c) => c.id === course.id ? course : c)
      })),
      deleteCourse: (id) => set((state) => ({
        courses: state.courses.filter((c) => c.id !== id)
      })),
      setLoading: (value) => set({ isLoading: value }),
      getCourseById: (id) => get().courses.find((c) => c.id === id),
      getCoursesByCategory: (categoryId) => 
        get().courses.filter((c) => c.category_id === categoryId),
    }),
    {
      name: 'elder-course-storage',
    }
  )
);

// ============================================
// 学习进度 Store
// ============================================
interface ProgressStore {
  progress: LearningProgress[];
  isLoading: boolean;
  setProgress: (progress: LearningProgress[]) => void;
  updateProgress: (lessonId: string, seconds: number, isCompleted?: boolean) => void;
  getProgressByCourse: (courseId: string) => LearningProgress[];
  getProgressByLesson: (lessonId: string) => LearningProgress | undefined;
  setLoading: (value: boolean) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: [],
      isLoading: false,
      setProgress: (progress) => set({ progress }),
      updateProgress: (lessonId, seconds, isCompleted) => {
        const state = get();
        const existingIndex = state.progress.findIndex((p) => p.lesson_id === lessonId);
        
        if (existingIndex >= 0) {
          const updated = [...state.progress];
          updated[existingIndex] = {
            ...updated[existingIndex],
            progress_seconds: seconds,
            is_completed: isCompleted ?? updated[existingIndex].is_completed,
            last_watched_at: new Date().toISOString(),
          };
          set({ progress: updated });
        } else {
          set({ progress: [...state.progress, {
            id: 'progress-' + Date.now(),
            user_id: '',
            course_id: '',
            lesson_id: lessonId,
            progress_seconds: seconds,
            is_completed: isCompleted || false,
            last_watched_at: new Date().toISOString(),
          }]});
        }
      },
      getProgressByCourse: (courseId) => 
        get().progress.filter((p) => p.course_id === courseId),
      getProgressByLesson: (lessonId) => 
        get().progress.find((p) => p.lesson_id === lessonId),
      setLoading: (value) => set({ isLoading: value }),
    }),
    {
      name: 'elder-progress-storage',
    }
  )
);

// ============================================
// 订阅状态 Store
// ============================================
interface SubscriptionStore {
  subscription: Subscription | null;
  isLoading: boolean;
  setSubscription: (subscription: Subscription | null) => void;
  setLoading: (value: boolean) => void;
  isVip: () => boolean;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscription: null,
      isLoading: false,
      setSubscription: (subscription) => set({ subscription }),
      setLoading: (value) => set({ isLoading: value }),
      isVip: () => {
        const sub = get().subscription;
        if (!sub) return false;
        if (sub.status !== 'active') return false;
        if (!sub.expires_at) return false;
        return new Date(sub.expires_at) > new Date();
      },
    }),
    {
      name: 'elder-subscription-storage',
    }
  )
);

// ============================================
// UI 状态 Store
// ============================================
interface UIStore {
  isMobileMenuOpen: boolean;
  showPaywall: boolean;
  paywallCourseId: string | null;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | null;
  setMobileMenuOpen: (value: boolean) => void;
  showPaywallModal: (courseId: string) => void;
  hidePaywallModal: () => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIStore>()(
  (set) => ({
    isMobileMenuOpen: false,
    showPaywall: false,
    paywallCourseId: null,
    toastMessage: null,
    toastType: null,
    setMobileMenuOpen: (value) => set({ isMobileMenuOpen: value }),
    showPaywallModal: (courseId) => set({ showPaywall: true, paywallCourseId: courseId }),
    hidePaywallModal: () => set({ showPaywall: false, paywallCourseId: null }),
    showToast: (message, type) => set({ toastMessage: message, toastType: type }),
    hideToast: () => set({ toastMessage: null, toastType: null }),
  })
);

// ============================================
// 后台管理 Store
// ============================================
interface AdminStore {
  adminPage: 'dashboard' | 'courses' | 'users' | 'orders' | 'settings';
  users: User[];
  orders: any[];
  setAdminPage: (page: AdminStore['adminPage']) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  setOrders: (orders: any[]) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      adminPage: 'dashboard',
      users: [],
      orders: [],
      setAdminPage: (page) => set({ adminPage: page }),
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (user) => set((state) => ({
        users: state.users.map((u) => u.id === user.id ? user : u)
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter((u) => u.id !== id)
      })),
      setOrders: (orders) => set({ orders }),
    }),
    {
      name: 'elder-admin-storage',
    }
  )
);
