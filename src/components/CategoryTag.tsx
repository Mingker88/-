import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryTagProps {
  name: string;
  image?: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryTag({ name, image, active, onClick }: CategoryTagProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap transition-colors',
          active
            ? 'text-black font-medium'
            : 'text-gray-500 hover:text-black'
        )}
      >
        {image && (
          <img src={image} alt={name} className="w-6 h-6 rounded-full object-cover" />
        )}
        <span className={active ? 'underline underline-offset-4' : ''}>{name}</span>
      </button>
    );
  }

  return (
    <Link
      to={`/category/${encodeURIComponent(name)}`}
      className="group block"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 border border-gray-100 group-hover:border-gray-300 transition-colors">
        {image && (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <p className="mt-2 text-sm text-center text-gray-700 group-hover:text-black transition-colors">
        {name}
      </p>
    </Link>
  );
}
