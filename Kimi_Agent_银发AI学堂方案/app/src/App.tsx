import { Header } from './sections/Header';
import { MobileNav } from './sections/MobileNav';
import { Footer } from './sections/Footer';
import { HomePage } from './sections/HomePage';
import { LoginPage } from './sections/LoginPage';
import { CoursesPage } from './sections/CoursesPage';
import { CourseDetailPage } from './sections/CourseDetailPage';
import { VideoPlayerPage } from './sections/VideoPlayerPage';
import { ProfilePage } from './sections/ProfilePage';
import { SubscriptionPage } from './sections/SubscriptionPage';
import { AdminPage } from './sections/AdminPage';
import { PaywallModal } from './sections/PaywallModal';
import { Toast } from './sections/Toast';
import { useNavigationStore, useAuthStore } from './store';

function App() {
  const { currentPage } = useNavigationStore();
  const { isAdmin } = useAuthStore();

  // 渲染当前页面
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'courses':
        return <CoursesPage />;
      case 'course-detail':
        return <CourseDetailPage />;
      case 'video-player':
        return <VideoPlayerPage />;
      case 'profile':
        return <ProfilePage />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'admin':
        return isAdmin ? <AdminPage /> : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  // 视频播放页和后台管理页使用全屏布局
  const isVideoPlayer = currentPage === 'video-player';
  const isAdminPage = currentPage === 'admin';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 顶部导航 - 视频页和管理页隐藏 */}
      {!isVideoPlayer && !isAdminPage && <Header />}

      {/* 主内容区 */}
      <div className={`flex-1 ${!isVideoPlayer && !isAdminPage ? 'pb-20 md:pb-0' : ''}`}>
        {renderPage()}
      </div>

      {/* 底部信息 - 视频页和管理页隐藏 */}
      {!isVideoPlayer && !isAdminPage && currentPage === 'home' && <Footer />}

      {/* 移动端底部导航 - 视频页和管理页隐藏 */}
      {!isVideoPlayer && !isAdminPage && <MobileNav />}

      {/* 付费墙弹窗 */}
      <PaywallModal />

      {/* Toast提示 */}
      <Toast />
    </div>
  );
}

export default App;
