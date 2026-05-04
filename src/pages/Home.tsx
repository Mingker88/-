import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getRandomMeals, getCategories } from '@/services/mealApi';
import { MealCard } from '@/components/MealCard';
import { CategoryTag } from '@/components/CategoryTag';
import { SearchBar } from '@/components/SearchBar';
import { Loading } from '@/components/Loading';
import type { Meal, Category } from '@/types';

export function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [mealsData, categoriesData] = await Promise.all([
          getRandomMeals(8),
          getCategories(),
        ]);
        setMeals(mealsData);
        setCategories(categoriesData.slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              发现美食灵感
            </h1>
            <p className="text-gray-500 text-center mb-6">
              探索来自世界各地的美味食谱
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">分类浏览</h2>
            <Link
              to="/category"
              className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {categories.map(category => (
              <CategoryTag
                key={category.idCategory}
                name={category.strCategory}
                image={category.strCategoryThumb}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium mb-6">精选推荐</h2>
          
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {meals.map(meal => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
