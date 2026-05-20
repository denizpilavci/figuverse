import ProductCard from '../components/ProductCard';

const mockProducts = [
  {
    id: 1,
    name: 'Ronin - Shadow of the Moon (1/6 Scale)',
    description: 'Highly detailed anime samurai figure featuring a cinematic rock base and dynamic pose. Masterpiece collection.',
    price: 249.99,
    image_url: '/images/samurai.png',
    universe: 'Anime Originals',
    stock: 5
  },
  {
    id: 2,
    name: 'Cyber-Soldier 2077 (Premium Edition)',
    description: 'Sci-fi space soldier collectible action figure with glowing blue accents and heavily armored exoskeleton.',
    price: 329.50,
    image_url: '/images/scifi.png',
    universe: 'Sci-Fi Universe',
    stock: 2
  }
];

export default function Home() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* Skeleton placeholders to show layout scale */}
          <div className="glass-card animate-pulse h-[420px] flex flex-col">
            <div className="bg-white/5 h-64 w-full"></div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="bg-white/10 h-6 rounded w-3/4 mb-4"></div>
              <div className="bg-white/5 h-4 rounded w-full mb-2"></div>
              <div className="bg-white/5 h-4 rounded w-2/3 mb-4"></div>
              <div className="mt-auto flex justify-between">
                <div className="bg-white/10 h-8 rounded w-1/3"></div>
                <div className="bg-white/10 h-10 w-10 rounded-xl"></div>
              </div>
            </div>
          </div>
           <div className="glass-card animate-pulse h-[420px] flex flex-col">
            <div className="bg-white/5 h-64 w-full"></div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="bg-white/10 h-6 rounded w-3/4 mb-4"></div>
              <div className="bg-white/5 h-4 rounded w-full mb-2"></div>
              <div className="bg-white/5 h-4 rounded w-2/3 mb-4"></div>
              <div className="mt-auto flex justify-between">
                <div className="bg-white/10 h-8 rounded w-1/3"></div>
                <div className="bg-white/10 h-10 w-10 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
