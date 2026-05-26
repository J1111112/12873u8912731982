import { create } from 'zustand';

interface User {
  id: string;
  phone: string;
  name: string;
  avatar?: string;
}

interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  currentPage: string;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setCurrentPage: (page: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoggedIn: false,
  currentPage: 'home',
  
  setUser: (user) => set({ user }),
  
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  logout: () => set({ user: null, isLoggedIn: false, currentPage: 'home' }),
}));
