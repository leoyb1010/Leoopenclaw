import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-elder-dark text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* 品牌信息 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-elder-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">AI</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">银发AI学堂</h2>
                <p className="text-gray-400 text-base">让国产AI成为您的生活助手</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              专为50岁以上中老年朋友设计的国产AI学习平台，
              教您使用豆包、通义千问、文心一言等国产AI工具，
              让生活更便捷、更精彩。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-xl font-bold mb-6">快速链接</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-elder-primary transition-colors text-lg">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-elder-primary transition-colors text-lg">
                  课程介绍
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-elder-primary transition-colors text-lg">
                  会员权益
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-elder-primary transition-colors text-lg">
                  帮助中心
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-elder-primary transition-colors text-lg">
                  隐私政策
                </a>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-xl font-bold mb-6">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-elder-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-lg font-medium">客服热线</p>
                  <p className="text-gray-300 text-lg">400-888-8888</p>
                  <p className="text-gray-400 text-base">周一至周日 9:00-21:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-elder-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-lg font-medium">电子邮箱</p>
                  <p className="text-gray-300 text-lg">help@yinfai-ai.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-elder-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-lg font-medium">公司地址</p>
                  <p className="text-gray-300 text-lg">北京市朝阳区科技园区</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-base text-center md:text-left">
              © 2024 银发AI学堂 版权所有
            </p>
            <p className="text-gray-400 text-base flex items-center gap-1">
              用 <Heart className="w-5 h-5 text-elder-error fill-elder-error" /> 为中老年朋友服务
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
