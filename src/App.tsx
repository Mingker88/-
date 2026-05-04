import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Categories } from '@/pages/Categories';
import { CategoryDetail } from '@/pages/CategoryDetail';
import { Search } from '@/pages/Search';
import { RecipeDetail } from '@/pages/RecipeDetail';
import { Favorites } from '@/pages/Favorites';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/category/:name" element={<CategoryDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
