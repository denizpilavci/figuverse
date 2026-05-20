import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Loader2, ShieldCheck, Truck, CreditCard, Headphones, ArrowRight, Zap, Star } from 'lucide-react';
import api from '../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/products');
        // Sadece ilk 8 ürünü göster
        setProducts(res.data.data.slice(0, 8));
      } catch (error) {
        console.error("Ürünler çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const goToProducts = () => {
    navigate('/products');
  };

  const categories = [
    { name: 'Marvel Evreni', desc: 'Süper Kahramanlar', color: 'from-red-600 to-red-900', searchQuery: 'Marvel' },
    { name: 'Star Wars', desc: 'Galaktik Macera', color: 'from-blue-600 to-indigo-900', searchQuery: 'Star Wars' },
    { name: 'Anime Seçkisi', desc: 'Efsanevi Seriler', color: 'from-orange-500 to-yellow-700', searchQuery: 'Anime' },
    { name: 'DC Comics', desc: 'Adaletin Koruyucuları', color: 'from-gray-700 to-black', searchQuery: 'DC' }
  ];

  const heroProduct = products.length > 0 ? products[0] : null;

  return (
    <div className="space-y-24 pb-20">

      {/* 1. ELITE HERO SECTION */}
      <section className="relative pt-10 pb-20 md:pt-20 md:pb-32 lg:min-h-[80vh] flex items-center animate-fade-in">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary font-medium text-sm mb-4">
                <Zap size={16} className="text-yellow-400" /> Yeni Koleksiyon Geldi
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-white">
                Koleksiyonunuza <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">
                  Hayat Verin
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
                Dünyanın en seçkin evrenlerinden, detaylara takıntılı koleksiyonerler için özel olarak üretilmiş, sınırlı sayıda premium figürler.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={goToProducts} className="bg-white text-gray-950 hover:bg-gray-200 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Koleksiyonu Keşfet <ArrowRight size={20} />
                </button>
                <button onClick={() => heroProduct ? navigate(`/product/${heroProduct.id}`) : goToProducts()} className="glass font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-white border border-white/20">
                  {heroProduct ? 'Yeni Figürü İncele' : 'VIP Üye Ol'}
                </button>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-white/10 mt-8">
                <div className="flex -space-x-4">
                  <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-12 h-12 rounded-full border-2 border-gray-950" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-12 h-12 rounded-full border-2 border-gray-950" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-12 h-12 rounded-full border-2 border-gray-950" />
                </div>
                <div className="text-sm">
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-gray-300">10,000+ Mutlu Koleksiyoner</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block h-[500px] xl:h-[600px] perspective-1000">
              {/* Floating Hero Image Container */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full blur-[100px] animate-pulse"></div>

              <div onClick={() => heroProduct && navigate(`/product/${heroProduct.id}`)} className="absolute inset-4 md:inset-8 xl:inset-12 rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(109,40,217,0.3)] transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 bg-gray-900 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                <img
                  src={heroProduct ? heroProduct.image_url : "/images/samurai.png"}
                  alt={heroProduct ? heroProduct.name : "Premium Figure"}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>

              {/* Glass Info Cards */}
              <div className="absolute top-1/4 -left-8 xl:-left-12 glass p-5 rounded-2xl border border-white/20 shadow-2xl animate-float z-20 pointer-events-none" style={{ animationDelay: '1s' }}>
                <p className="text-xs text-gray-400 mb-1">{heroProduct ? `${heroProduct.universe} Evreni` : 'Özel Seri'}</p>
                <p className="font-bold text-white text-lg">{heroProduct ? heroProduct.name : 'Ronin Samuray'}</p>
                <p className="text-primary font-black text-xl">${heroProduct ? heroProduct.price : '299.99'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES (Features) */}
      <section className="container mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex flex-col items-center text-center px-4 space-y-4 pt-4 md:pt-0">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">%100 Orijinal</h3>
              <p className="text-gray-400 text-sm">Tüm figürlerimiz lisanslı ve sertifikalıdır.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 space-y-4 pt-4 md:pt-0">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                <Truck size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">Ücretsiz Kargo</h3>
              <p className="text-gray-400 text-sm">Tüm siparişlerinizde ücretsiz kargo fırsatı.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 space-y-4 pt-4 md:pt-0">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                <CreditCard size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">Güvenli Ödeme</h3>
              <p className="text-gray-400 text-sm">256-bit SSL ile korunan ödeme altyapısı.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 space-y-4 pt-4 md:pt-0">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Headphones size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">7/24 Destek</h3>
              <p className="text-gray-400 text-sm">Uzman ekibimiz her an yardıma hazır.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR UNIVERSES (Categories) */}
      <section className="container mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Popüler Evrenler</h2>
            <div className="h-1 w-24 bg-accent rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/products?universe=${cat.searchQuery}`)}
              className={`relative overflow-hidden rounded-3xl aspect-[4/3] group cursor-pointer border border-white/10`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-80 group-hover:scale-110 transition-transform duration-700`}></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-white/80 font-medium mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{cat.desc}</p>
                <h3 className="text-2xl font-black text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section id="products" className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Trend Olan Figürler</h2>
            <div className="h-1 w-24 bg-accent rounded-full"></div>
          </div>
          <button
            onClick={goToProducts}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all"
          >
            Tüm Koleksiyonu Gör <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin text-primary" size={64} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center py-20 glass rounded-3xl">Henüz vitrine çıkarılmış ürün bulunmuyor.</p>
            )}
          </div>
        )}
      </section>

      {/* 5. ELITE NEWSLETTER CTA */}
      <section className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-black border border-white/10 p-10 md:p-16 lg:p-20 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              FiguVerse VIP Kulübüne Katılın
            </h2>
            <p className="text-lg text-gray-400">
              Yeni çıkan limitli serilerden, özel indirimlerden ve ön sipariş fırsatlarından ilk sizin haberiniz olsun. İlk siparişinize özel <span className="text-white font-bold">%10 İndirim</span> kazanın.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="E-posta adresiniz..."
                className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_30px_rgba(109,40,217,0.6)] transition-all transform hover:-translate-y-1 whitespace-nowrap"
              >
                Kayıt Ol
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-4">İstediğiniz zaman abonelikten çıkabilirsiniz. Gizlilik politikasını okuduğunuzu varsayıyoruz.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
