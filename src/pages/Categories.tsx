import { useState, useEffect } from 'react';
import { getCategories } from '@/services/mealApi';
import { CategoryTag } from '@/components/CategoryTag';
import { Loading } from '@/components/Loading';
import type { Category } from '@/types';

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">食谱分类</h1>
        
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map(category => (
              <CategoryTag
                key={category.idCategory}
                name={category.strCategory}
                image={category.strCategoryThumb}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
