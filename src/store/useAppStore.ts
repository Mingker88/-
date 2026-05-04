import { create } from 'zustand';
import { getFavorites, addFavorite, removeFavorite, getSearchHistory, addSearchHistory, clearSearchHistory } from '@/utils/storage';

interface AppState {
  favorites: string[];
  searchHistory: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addSearchHistory: (keyword: string) => void;
  clearSearchHistory: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  favorites: getFavorites(),
  searchHistory: getSearchHistory(),
  
  addFavorite: (id: string) => {
    addFavorite(id);
    set({ favorites: getFavorites() });
  },
  
  removeFavorite: (id: string) => {
    removeFavorite(id);
    set({ favorites: getFavorites() });
  },
  
  isFavorite: (id: string) => {
    return get().favorites.includes(id);
  },
  
  addSearchHistory: (keyword: string) => {
    addSearchHistory(keyword);
    set({ searchHistory: getSearchHistory() });
  },
  
  clearSearchHistory: () => {
    clearSearchHistory();
    set({ searchHistory: [] });
  },
}));
