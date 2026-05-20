import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';
import api from '../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.data);
      } catch (error) {
        console.error("Ürünler çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass mt-8 p-1">
        <div className="bg-gradient-to-r from-secondary to-gray-900 rounded-[1.4rem] p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 z-10">
            Koleksiyonunuza <br />
            <span className="text-gradient">Hayat Verin</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl z-10">
            En sevdiğiniz evrenlerden özenle seçilmiş, premium kalitede kurgusal karakter figürleri FiguVerse'te.
          </p>
          <button className="z-10 bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary text-white font-bold py-4 px-10 rounded-full shadow-[0_0_30px_rgba(109,40,217,0.4)] hover:shadow-[0_0_40px_rgba(109,40,217,0.7)] transition-all duration-300 transform hover:-translate-y-1">
            Koleksiyonu Keşfet
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Öne Çıkan Figürler</h2>
            <div className="h-1 w-20 bg-accent rounded-full"></div>
          </div>
          <button className="text-primary hover:text-purple-400 font-medium transition-colors">
            Tümünü Gör &rarr;
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center py-10">Henüz ürün bulunmuyor.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
