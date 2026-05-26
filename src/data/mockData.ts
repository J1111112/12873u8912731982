export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  imageUrl: string;
  category: string;
  calories: number;
}

export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalDays: number;
  currentDay: number;
}

export interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  calories: number;
}

export interface WeeklyStats {
  day: string;
  calories: number;
  minutes: number;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: '晨间唤醒：20分钟瑜伽拉伸',
    description: '唤醒身体，激活肌肉，开启活力一天',
    duration: 20,
    level: '入门',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=morning%20yoga%20stretching%20exercise%20woman%20doing%20yoga%20pose%20sunrise%20peaceful%20meditation&image_size=landscape_16_9',
    category: '瑜伽',
    calories: 80,
  },
  {
    id: '2',
    title: '燃脂挑战：高强度间歇训练',
    description: '快速燃烧卡路里，提升心肺功能',
    duration: 15,
    level: '进阶',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=HIIT%20workout%20high%20intensity%20interval%20training%20fitness%20gym%20exercise&image_size=landscape_16_9',
    category: 'HIIT',
    calories: 200,
  },
  {
    id: '3',
    title: '力量基础：哑铃全身训练',
    description: '增强肌肉力量，塑造完美身材',
    duration: 40,
    level: '进阶',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=strength%20training%20dumbbell%20workout%20gym%20fitness%20bodybuilding&image_size=landscape_16_9',
    category: '力量',
    calories: 150,
  },
  {
    id: '4',
    title: '腹肌训练：核心强化',
    description: '强化核心肌群，打造紧致腹部',
    duration: 12,
    level: '入门',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=abs%20workout%20core%20training%20plank%20exercise%20fitness&image_size=landscape_16_9',
    category: '核心',
    calories: 60,
  },
];

export const mockTrainingPlan: TrainingPlan = {
  id: 'plan-1',
  name: '进阶打卡',
  description: '21天进阶训练计划',
  progress: 43,
  totalDays: 21,
  currentDay: 12,
};

export const mockDailyTasks: DailyTask[] = [
  { id: '1', title: '今日挑战', completed: true, calories: 380 },
  { id: '2', title: '晨间拉伸', completed: true, calories: 80 },
  { id: '3', title: '平板支撑', completed: false, calories: 45 },
  { id: '4', title: '夜跑3公里', completed: false, calories: 220 },
];

export const mockWeeklyStats: WeeklyStats[] = [
  { day: '周一', calories: 320, minutes: 35 },
  { day: '周二', calories: 180, minutes: 20 },
  { day: '周三', calories: 420, minutes: 45 },
  { day: '周四', calories: 280, minutes: 30 },
  { day: '周五', calories: 560, minutes: 60 },
  { day: '周六', calories: 680, minutes: 75 },
  { day: '周日', calories: 340, minutes: 40 },
];

export const mockUserStats = {
  totalCalories: 3420,
  totalMinutes: 185,
  weeklyWorkouts: 6,
  streak: 12,
};
