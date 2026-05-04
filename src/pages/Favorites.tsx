import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import { getMealById } from '@/services/mealApi';
import { MealCard } from '@/components/MealCard';
import { Loading } from '@/components/Loading';
import { EmptyState } from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import type { Meal } from '@/types';

export function Favorites() {
  const { favorites } = useAppStore();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setMeals([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const promises = favorites.map(id => getMealById(id));
        const results = await Promise.all(promises);
        setMeals(results.filter((meal): meal is Meal => meal !== null));
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, [favorites]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">我的收藏</h1>
        
        {loading ? (
          <Loading />
        ) : meals.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="暂无收藏"
            description="浏览食谱时点击心形图标即可收藏喜欢的食谱"
            action={{
              label: '探索食谱',
              onClick: () => window.location.href = '/',
            }}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {meals.map(meal => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
