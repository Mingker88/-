import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Meal } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

interface MealCardProps {
  meal: Meal;
  showFavorite?: boolean;
}

export function MealCard({ meal, showFavorite = true }: MealCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useAppStore();
  const favorite = isFavorite(meal.idMeal);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className="group block relative overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
      </div>
      
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-900 group-hover:underline underline-offset-2 decoration-1 line-clamp-2">
          {meal.strMeal}
        </h3>
        {meal.strCategory && (
          <p className="text-xs text-gray-400 mt-1">{meal.strCategory}</p>
        )}
      </div>

      {showFavorite && (
        <button
          onClick={handleFavorite}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full transition-all',
            favorite
              ? 'bg-black text-white'
              : 'bg-white/90 text-gray-600 hover:bg-white'
          )}
        >
          <Heart
            className={cn('w-4 h-4', favorite && 'fill-current')}
          />
        </button>
      )}
    </Link>
  );
}
