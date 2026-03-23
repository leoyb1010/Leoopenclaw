import { HeroSection } from './HeroSection';
import { CourseSection } from './CourseSection';
import { CategorySection } from './CategorySection';
import { FeatureSection } from './FeatureSection';

export function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 主横幅 */}
      <HeroSection />
      
      {/* 课程分类 */}
      <CategorySection />
      
      {/* 热门推荐 */}
      <CourseSection 
        title="热门推荐"
        subtitle="精选最受欢迎的国产AI课程，学员好评如潮"
      />
      
      {/* 最新课程 */}
      <CourseSection 
        title="最新上线"
        subtitle="紧跟国产AI发展，持续更新优质内容"
      />
      
      {/* 特色功能 */}
      <FeatureSection />
    </main>
  );
}
