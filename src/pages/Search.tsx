import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { searchMeals } from '@/services/mealApi';
import { MealCard } from '@/components/MealCard';
import { SearchBar } from '@/components/SearchBar';
import { Loading } from '@/components/Loading';
import { EmptyState } from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import type { Meal } from '@/types';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const { searchHistory, addSearchHistory, clearSearchHistory } = useAppStore();

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setMeals([]);
        setSearched(false);
        return;
      }
      
      setLoading(true);
      setSearched(true);
      try {
        const data = await searchMeals(query);
        setMeals(data);
        addSearchHistory(query);
      } catch (error) {
        console.error('Failed to search meals:', error);
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [query]);

  const handleSearch = (keyword: string) => {
    setSearchParams({ q: keyword });
  };

  const handleHistoryClick = (keyword: string) => {
    setSearchParams({ q: keyword });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar initialValue={query} onSearch={handleSearch} />
        </div>

        {!searched && searchHistory.length > 0 && (
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">搜索历史</h2>
              <button
                onClick={clearSearchHistory}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                清除
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map(keyword => (
                <button
                  key={keyword}
                  onClick={() => handleHistoryClick(keyword)}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <Loading />}

        {!loading && searched && meals.length === 0 && (
          <EmptyState
            icon={SearchIcon}
            title="未找到相关食谱"
            description={`没有找到与"${query}"相关的食谱，请尝试其他关键词`}
          />
        )}

        {!loading && searched && meals.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-6">
              找到 {meals.length} 个与"{query}"相关的食谱
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {meals.map(meal => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
