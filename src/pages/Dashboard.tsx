import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dumbbell,
  Search,
  User,
  ChevronRight,
  Play,
  Clock,
  Flame,
  Trophy,
  CheckCircle2,
  Circle,
  Zap,
  Target,
  Activity,
  Settings,
  Bell,
  LogOut,
} from 'lucide-react';
import {
  getCourses,
  getTrainingPlan,
  getDailyTasks,
  getWeeklyStats,
  getUserStats,
  toggleTask,
} from '@/api/courses';
import { useAppStore } from '@/store/appStore';
import type { Course, TrainingPlan, DailyTask, WeeklyStats } from '@/data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = useAppStore(state => state.logout);
  const user = useAppStore(state => state.user);

  const [courses, setCourses] = useState<Course[]>([]);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([]);
  const [userStats, setUserStats] = useState({
    totalCalories: 0,
    totalMinutes: 0,
    weeklyWorkouts: 0,
    streak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [coursesData, planData, tasksData, weeklyStatsData, userStatsData] = await Promise.all([
          getCourses(),
          getTrainingPlan(),
          getDailyTasks(),
          getWeeklyStats(),
          getUserStats(),
        ]);
        setCourses(coursesData);
        setPlan(planData);
        setTasks(tasksData);
        setWeeklyStats(weeklyStatsData);
        setUserStats(userStatsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTaskToggle = async (taskId: string) => {
    try {
      const updatedTasks = await toggleTask(taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const maxCalories = Math.max(...weeklyStats.map(s => s.calories), 1);

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">代起</span>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索课程、训练计划..."
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-500">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-12 w-48 bg-dark-800 rounded-xl border border-dark-600 shadow-xl opacity-0 invisible transition-all hover:opacity-100 hover:visible group">
                  <div className="p-4 border-b border-dark-700">
                    <p className="text-white font-semibold">{user?.name || '游客'}</p>
                    <p className="text-gray-400 text-sm">{user?.phone || '未登录'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-gray-400 hover:text-red-400 hover:bg-dark-700 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    退出登录
                  </button>
                </div>
              </div>
              <span className="text-gray-300 text-sm hidden sm:block">登录 / 注册</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-8 animate-fade-in">
            <div className="card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-transparent to-blue-500/20" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 p-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">准备好流汗了吗？</h2>
                  <p className="text-gray-400">无论你有多少时间，我们都有适合你的方案。</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  开始快速训练
                </button>
              </div>
              <div className="flex gap-6 mt-4 pt-4 border-t border-dark-600">
                <div className="flex items-center gap-2 text-gray-400">
                  <Zap className="w-5 h-5 text-primary-500" />
                  <span className="text-sm">30分钟HIIT极速燃脂</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Target className="w-5 h-5 text-primary-500" />
                  <span className="text-sm">自定义训练模板</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <section className="animate-slide-up">
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">我的计划概览</h3>
                    <button className="text-primary-500 text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      查看详情 <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {plan && (
                    <div className="space-y-4">
                      <div className="bg-dark-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold">{plan.name}</h4>
                          <span className="text-gray-400 text-sm">{plan.description}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 transform -rotate-90">
                              <circle
                                cx="40"
                                cy="40"
                                r="36"
                                stroke="#242424"
                                strokeWidth="8"
                                fill="none"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="36"
                                stroke="#f97316"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${plan.progress * 2.26} 226`}
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-white">{plan.progress}%</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Flame className="w-5 h-5 text-primary-500" />
                              <span className="text-white font-semibold">进阶打卡 {plan.currentDay}/{plan.totalDays} 天</span>
                            </div>
                            <div className="w-full bg-dark-600 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${(plan.currentDay / plan.totalDays) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-3">今日剩余任务</h4>
                        <div className="space-y-3">
                          {tasks.map((task) => (
                            <div
                              key={task.id}
                              onClick={() => handleTaskToggle(task.id)}
                              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                                task.completed
                                  ? 'bg-dark-700/50'
                                  : 'bg-dark-700 hover:bg-dark-600'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {task.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-400" />
                                )}
                                <span className={task.completed ? 'text-gray-400 line-through' : 'text-white'}>
                                  {task.title}
                                </span>
                              </div>
                              <span className="text-primary-500 text-sm">{task.calories} 卡</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">推荐课程</h3>
                  <button className="text-primary-500 text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    查看全部 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="card overflow-hidden hover:transform hover:-translate-y-1 cursor-pointer group"
                    >
                      <div className="relative h-36 mb-4 overflow-hidden">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-primary-500/90 text-white text-xs px-3 py-1 rounded-full">
                            {course.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center gap-2 text-white text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}分钟</span>
                            <span className="text-gray-400">·</span>
                            <span className="bg-dark-700/50 px-2 py-0.5 rounded">
                              {course.level}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-white font-semibold mb-1 group-hover:text-primary-400 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-500 text-sm flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          {course.calories} 卡
                        </span>
                        <button className="text-white bg-primary-500/20 hover:bg-primary-500/30 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                          <Play className="w-4 h-4" />
                          开始
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">本周统计概览</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-700 rounded-xl p-4 text-center">
                      <Flame className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{userStats.totalCalories}</p>
                      <p className="text-gray-400 text-sm">卡路里消耗</p>
                    </div>
                    <div className="bg-dark-700 rounded-xl p-4 text-center">
                      <Clock className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{userStats.totalMinutes}</p>
                      <p className="text-gray-400 text-sm">训练时长(分钟)</p>
                    </div>
                    <div className="bg-dark-700 rounded-xl p-4 text-center">
                      <Activity className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{userStats.weeklyWorkouts}</p>
                      <p className="text-gray-400 text-sm">本周训练次数</p>
                    </div>
                    <div className="bg-dark-700 rounded-xl p-4 text-center">
                      <Trophy className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{userStats.streak}</p>
                      <p className="text-gray-400 text-sm">连续打卡天数</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">本周趋势</h3>
                  <div className="flex items-end justify-between gap-2 h-40">
                    {weeklyStats.map((stat, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex flex-col items-end gap-1">
                          <span className="text-gray-400 text-xs">{stat.calories}卡</span>
                          <div className="w-full bg-dark-600 rounded-t-lg overflow-hidden">
                            <div
                              className="bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-700"
                              style={{
                                height: `${(stat.calories / maxCalories) * 100}%`,
                                minHeight: '8px',
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-gray-500 text-xs">{stat.day.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">快捷操作</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary-500" />
                        </div>
                        <span className="text-white">快速训练</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-primary-500" />
                        </div>
                        <span className="text-white">目标设置</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 h-5 text-primary-500" />
                        </div>
                        <span className="text-white">运动数据</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </section>

              <section className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="card bg-gradient-to-br from-primary-500/20 to-blue-500/20 border-primary-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary-500/30 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">同步你的训练数据</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    当设备处于闲置状态，连接蓝牙即可将你的训练数据同步到其他设备。
                  </p>
                  <button className="btn-primary w-full">
                    立即连接 / 登录
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-dark-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary-500" />
              <span className="text-white font-semibold">代起 FITNESS</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 代起. All rights reserved.</p>
            <div className="flex gap-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-primary-500 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-primary-500 transition-colors">服务条款</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
