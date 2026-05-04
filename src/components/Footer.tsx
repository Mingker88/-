import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Heart, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/category', label: '分类', icon: Grid3X3 },
    { path: '/search', label: '搜索', icon: Search },
    { path: '/favorites', label: '收藏', icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <nav className="flex items-center justify-around h-16">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 py-2 px-4 transition-colors',
                isActive(item.path) ? 'text-black' : 'text-gray-400'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
