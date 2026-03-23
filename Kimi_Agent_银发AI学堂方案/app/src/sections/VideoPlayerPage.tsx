import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useNavigationStore, useCourseStore, useProgressStore, useSubscriptionStore, useUIStore } from '@/store';
import { Slider } from '@/components/ui/slider';

// 模拟视频数据
const mockLessons = [
  { id: 'l1', course_id: '1', title: '课程介绍：豆包能帮我们做什么', video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', duration: 300, sort_order: 1, is_free: true },
  { id: 'l2', course_id: '1', title: '注册豆包账号', video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', duration: 480, sort_order: 2, is_free: true },
  { id: 'l3', course_id: '1', title: '如何与豆包对话', video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', duration: 600, sort_order: 3, is_free: false },
  { id: 'l4', course_id: '1', title: '让豆包帮您安排日程', video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', duration: 720, sort_order: 4, is_free: false },
];

export function VideoPlayerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const { goBack, currentLessonId } = useNavigationStore();
  const { currentCourse } = useCourseStore();
  const { getProgressByLesson, updateProgress } = useProgressStore();
  const { isVip } = useSubscriptionStore();
  const { showPaywallModal } = useUIStore();

  const course = currentCourse;
  const lessons = course?.lessons || mockLessons;
  const activeLesson = lessons.find(l => l.id === (activeLessonId || currentLessonId)) || lessons[0];
  const savedProgress = getProgressByLesson(activeLesson?.id || '');

  // 初始化视频进度
  useEffect(() => {
    if (videoRef.current && savedProgress) {
      videoRef.current.currentTime = savedProgress.progress_seconds;
    }
  }, [activeLesson?.id]);

  // 检查权限
  useEffect(() => {
    if (activeLesson && !activeLesson.is_free && !isVip()) {
      showPaywallModal(course?.id || '');
    }
  }, [activeLesson?.id]);

  // 自动保存进度
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && activeLesson) {
        updateProgress(activeLesson.id, Math.floor(videoRef.current.currentTime));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeLesson?.id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.volume = value[0];
      setVolume(value[0]);
      setIsMuted(value[0] === 0);
    }
  };

  const handlePlaybackRateChange = () => {
    const rates = [0.75, 1, 1.25, 1.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
    setPlaybackRate(nextRate);
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('video-container');
    if (!isFullscreen && container) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleLessonChange = (lesson: typeof lessons[0]) => {
    if (!lesson.is_free && !isVip()) {
      showPaywallModal(course?.id || '');
      return;
    }
    setActiveLessonId(lesson.id);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (activeLesson) {
      updateProgress(activeLesson.id, activeLesson.duration, true);
    }
    // 自动播放下一集
    const currentIndex = lessons.findIndex(l => l.id === activeLesson.id);
    const nextLesson = lessons[currentIndex + 1];
    if (nextLesson) {
      handleLessonChange(nextLesson);
    }
  };

  return (
    <main className="min-h-screen bg-elder-dark">
      {/* 视频播放器 */}
      <div 
        id="video-container"
        className="relative bg-black aspect-video"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={activeLesson?.video_url}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          onClick={togglePlay}
        />

        {/* 控制栏 */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40
          transition-opacity duration-300
          ${showControls ? 'opacity-100' : 'opacity-0'}
        `}>
          {/* 顶部导航 */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-4">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg hidden sm:inline">返回</span>
            </button>
            <h2 className="text-white font-medium truncate flex-1">
              {activeLesson?.title}
            </h2>
          </div>

          {/* 中央播放按钮 */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
              </button>
            </div>
          )}

          {/* 底部控制栏 */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* 进度条 */}
            <div className="mb-4">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              {/* 左侧控制 */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-white/80"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" fill="currentColor" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                  )}
                </button>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                {/* 音量控制 */}
                <div className="hidden sm:flex items-center gap-2 group">
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 flex items-center justify-center text-white hover:text-white/80"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <div className="w-0 overflow-hidden group-hover:w-20 transition-all">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.1}
                      onValueChange={handleVolumeChange}
                      className="w-16"
                    />
                  </div>
                </div>
              </div>

              {/* 右侧控制 */}
              <div className="flex items-center gap-2">
                {/* 倍速 */}
                <button
                  onClick={handlePlaybackRateChange}
                  className="px-3 py-1.5 text-white text-sm font-medium hover:bg-white/20 rounded-lg transition-colors"
                >
                  {playbackRate}x
                </button>

                {/* 全屏 */}
                <button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-white/80"
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 课程信息区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：课程信息 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-elder-primary/20 rounded text-sm text-elder-primary">
                {course?.ai_model}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
              {activeLesson?.title}
            </h1>
            <p className="text-gray-400 mb-4">
              {course?.title}
            </p>
            
            {/* 讲师信息 */}
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-10 h-10 bg-elder-primary/20 rounded-full flex items-center justify-center">
                <span className="text-elder-primary font-medium">
                  {course?.instructor_name?.charAt(0)}
                </span>
              </div>
              <span>{course?.instructor_name}</span>
            </div>
          </div>

          {/* 右侧：课程目录 */}
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-white mb-4">
              课程目录 ({lessons.length}节)
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {lessons.map((lesson, index) => {
                const isActive = lesson.id === activeLesson?.id;
                const lessonProgress = getProgressByLesson(lesson.id);
                const isCompleted = lessonProgress?.is_completed;
                const isLocked = !lesson.is_free && !isVip();

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonChange(lesson)}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                      ${isActive 
                        ? 'bg-elder-primary/20 border border-elder-primary/50' 
                        : 'hover:bg-white/5'
                      }
                      ${isLocked ? 'opacity-60' : ''}
                    `}
                  >
                    {/* 序号/状态 */}
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      ${isCompleted 
                        ? 'bg-elder-success text-white' 
                        : isLocked
                          ? 'bg-gray-600 text-gray-400'
                          : isActive
                            ? 'bg-elder-primary text-white'
                            : 'bg-white/10 text-gray-400'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatTime(lesson.duration)}
                      </p>
                    </div>

                    {/* 标签 */}
                    {lesson.is_free && (
                      <span className="px-2 py-0.5 bg-elder-success/20 text-elder-success text-xs rounded-full">
                        免费
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
