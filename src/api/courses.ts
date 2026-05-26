import { mockCourses, mockTrainingPlan, mockDailyTasks, mockWeeklyStats, mockUserStats } from '@/data/mockData';
import type { Course, TrainingPlan, DailyTask, WeeklyStats } from '@/data/mockData';

export interface UserStats {
  totalCalories: number;
  totalMinutes: number;
  weeklyWorkouts: number;
  streak: number;
}

export const getCourses = async (): Promise<Course[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCourses;
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCourses.find(course => course.id === id) || null;
};

export const getTrainingPlan = async (): Promise<TrainingPlan> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockTrainingPlan;
};

export const getDailyTasks = async (): Promise<DailyTask[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockDailyTasks;
};

export const getWeeklyStats = async (): Promise<WeeklyStats[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockWeeklyStats;
};

export const getUserStats = async (): Promise<UserStats> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockUserStats;
};

export const toggleTask = async (taskId: string): Promise<DailyTask[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockDailyTasks.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};
