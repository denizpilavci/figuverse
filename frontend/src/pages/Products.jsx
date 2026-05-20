import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Loader2, Search } from 'lucide-react';
import api from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('search') || '';
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = searchQuery ? `/products?search=${searchQuery}` : '/products';
        const res = await api.get(url);
        setProducts(res.data.data);
      } catch (error) {
        console.error("Ürünler çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchParams({ search: localSearch });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="py-8 animate-fade-in min-h-[70vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            {searchQuery ? `"${searchQuery}" Sonuçları` : 'Tüm Koleksiyon'}
          </h1>
          <div className="h-1 w-24 bg-accent rounded-full"></div>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto min-w-[300px]">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Figürlerde ara..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
          />
        </form>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="animate-spin text-primary" size={64} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 glass rounded-3xl text-center p-8">
              <Search size={64} className="text-gray-600 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Sonuç Bulunamadı</h2>
              <p className="text-gray-400 max-w-md">
                "{searchQuery}" aramasına uygun bir figür evrenimizde henüz mevcut değil. Lütfen başka bir anahtar kelime deneyin.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
