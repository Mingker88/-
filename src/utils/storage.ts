const FAVORITES_KEY = 'recipe_favorites';
const SEARCH_HISTORY_KEY = 'recipe_search_history';

export function getFavorites(): string[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(id: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.unshift(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter(f => f !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function getSearchHistory(): string[] {
  try {
    const data = localStorage.getItem(SEARCH_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addSearchHistory(keyword: string): void {
  const history = getSearchHistory().filter(h => h !== keyword);
  history.unshift(keyword);
  const trimmed = history.slice(0, 10);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(trimmed));
}

export function clearSearchHistory(): void {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
}
