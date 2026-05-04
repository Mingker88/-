import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getMealsByCategory } from '@/services/mealApi';
import { MealCard } from '@/components/MealCard';
import { Loading } from '@/components/Loading';
import { EmptyState } from '@/components/EmptyState';
import type { Meal } from '@/types';

export function CategoryDetail() {
  const { name } = useParams<{ name: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!name) return;
      setLoading(true);
      try {
        const data = await getMealsByCategory(decodeURIComponent(name));
        setMeals(data);
      } catch (error) {
        console.error('Failed to fetch meals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [name]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/category"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          返回分类
        </Link>
        
        <h1 className="text-2xl font-bold mb-8">{decodeURIComponent(name || '')}</h1>
        
        {loading ? (
          <Loading />
        ) : meals.length === 0 ? (
          <EmptyState
            icon={ChevronLeft}
            title="暂无食谱"
            description="该分类下暂无食谱，请查看其他分类"
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
