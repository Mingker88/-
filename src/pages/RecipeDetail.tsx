import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, ExternalLink, Youtube, Clock, Users } from 'lucide-react';
import { getMealById } from '@/services/mealApi';
import { LoadingFull } from '@/components/Loading';
import { EmptyState } from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import type { Meal } from '@/types';

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { isFavorite, addFavorite, removeFavorite } = useAppStore();
  const favorite = meal ? isFavorite(meal.idMeal) : false;

  useEffect(() => {
    const fetchMeal = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getMealById(id);
        setMeal(data);
      } catch (error) {
        console.error('Failed to fetch meal:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  const handleFavorite = () => {
    if (!meal) return;
    if (favorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  if (loading) {
    return <LoadingFull />;
  }

  if (!meal) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            返回首页
          </Link>
          <EmptyState
            icon={ChevronLeft}
            title="食谱未找到"
            description="该食谱可能已被删除或不存在"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full aspect-[16/9] md:aspect-[21/9] object-cover"
          />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Link
              to="/"
              className="p-2 bg-white/90 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <button
              onClick={handleFavorite}
              className={cn(
                'p-2 transition-colors',
                favorite
                  ? 'bg-black text-white'
                  : 'bg-white/90 hover:bg-white'
              )}
            >
              <Heart className={cn('w-5 h-5', favorite && 'fill-current')} />
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{meal.strMeal}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {meal.strCategory && (
                <span>{meal.strCategory}</span>
              )}
              {meal.strCategory && meal.strArea && (
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
              )}
              {meal.strArea && (
                <span>{meal.strArea}</span>
              )}
            </div>
          </div>

          {meal.ingredients && meal.ingredients.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">食材清单</h2>
              <div className="border border-gray-100">
                {meal.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-sm">{ingredient.name}</span>
                    <span className="text-sm text-gray-500">{ingredient.measure}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {meal.strInstructions && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">烹饪步骤</h2>
              <div className="prose prose-sm max-w-none">
                {meal.strInstructions.split('\n').filter(Boolean).map((step, index) => (
                  <p key={index} className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {step}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm hover:border-black transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                查看原文
              </a>
            )}
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
              >
                <Youtube className="w-4 h-4" />
                观看视频
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
