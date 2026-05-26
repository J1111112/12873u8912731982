import { useNavigate } from 'react-router-dom';
import { Dumbbell, Brain, BarChart3, ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const features = [
  {
    icon: Dumbbell,
    title: '专业课程',
    description: '由顶尖教练录制的高品质动作示范，覆盖减脂、增肌、塑形等全方位需求。',
  },
  {
    icon: Brain,
    title: 'AI训练计划',
    description: '根据您的身体状况与运动习惯，智能生成每日计划，让健身不再盲目。',
  },
  {
    icon: BarChart3,
    title: '进度可视化',
    description: '清晰的数据图表帮助您追踪每一次汗水，见证身体的每一个细微变化。',
  },
];

const footerLinks = {
  about: {
    title: '关于我们',
    links: ['公司简介', '加入我们', '品牌合作'],
  },
  support: {
    title: '支持',
    links: ['常见问题', '帮助中心', '联系我们'],
  },
  legal: {
    title: '法律',
    links: ['隐私政策', '服务条款', 'Cookie政策'],
  },
};

export default function Home() {
  const navigate = useNavigate();
  const setIsLoggedIn = useAppStore(state => state.setIsLoggedIn);

  const handleGuestEnter = () => {
    setIsLoggedIn(false);
    navigate('/dashboard');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">代起</span>
            </div>
            <button
              onClick={handleLogin}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              登录 / 注册
            </button>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900/95 to-blue-900/20" />
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=silhouette%20of%20people%20running%20at%20sunset%20athletes%20training%20fitness%20dark%20background&image_size=landscape_16_9"
            alt="Running silhouette"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-400 px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                代起 · FITNESS
              </div>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                为您量身定制的AI训练计划与高效视频课程。无需繁琐注册，即刻开启您的进化之旅。
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleGuestEnter}
                  className="btn-primary flex items-center gap-2"
                >
                  游客进入
                </button>
                <button
                  onClick={handleLogin}
                  className="btn-secondary flex items-center gap-2"
                >
                  登录 / 注册
                </button>
              </div>
            </div>

            <div className="animate-slide-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                从今天开始
                <br />
                <span className="gradient-text">成为更好的自己</span>
              </h1>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20 animate-scale-in">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:bg-dark-700/50 hover:transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-dark-800 border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">代起</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                为您量身定制的训练计划，让每一次运动都有意义。
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 bg-dark-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-dark-500 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-dark-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-dark-500 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-dark-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-dark-500 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-400 text-sm hover:text-primary-500 transition-colors flex items-center gap-1 group">
                        {link}
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-dark-700 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2026 代起. 运动改变生活.
          </div>
        </div>
      </footer>
    </div>
  );
}
