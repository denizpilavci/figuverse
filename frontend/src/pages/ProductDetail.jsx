import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ShoppingBag, Star, Shield, Truck } from 'lucide-react';

// Şimdilik mock veri kullanıyoruz. Gerçekte bu veriyi API'den çekeceğiz.
const mockProduct = {
  id: 1,
  name: 'Ronin - Shadow of the Moon (1/6 Scale)',
  description: 'Göz alıcı detaylara sahip, el boyaması katana kılıcı ve diorama tabanıyla tam bir şaheser. Özel yapım kumaş kıyafetler ve ekstra 3 farklı kafa modellemesi ile birlikte gelir. Koleksiyonerler için özel üretim.',
  price: 249.99,
  image_url: '/images/samurai.png',
  universe: 'Anime Originals',
  stock: 5
};

export default function ProductDetail() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  // Normalde burada useEffect ile API'den id'ye göre ürün çekilir.

  return (
    <div className="py-8 animate-fade-in">
      <Link to="/" className="text-gray-400 hover:text-primary mb-8 inline-block transition-colors">&larr; Mağazaya Dön</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Sol Taraf: Görsel */}
        <div className="glass p-4 rounded-3xl relative group">
          <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-semibold text-white z-10">
            {mockProduct.universe}
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden relative bg-gradient-to-tr from-gray-800 to-gray-900">
            <img 
              src={mockProduct.image_url} 
              alt={mockProduct.name} 
              className="w-full h-full object-cover animate-float"
            />
          </div>
        </div>

        {/* Sağ Taraf: Detaylar */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <span className="text-gray-400 text-sm">(12 Değerlendirme)</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {mockProduct.name}
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {mockProduct.description}
          </p>
          
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300 mb-8">
            ${mockProduct.price}
          </div>

          {/* Özellikler */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="glass p-4 rounded-xl flex items-center gap-3">
              <Shield className="text-primary" size={24} />
              <span className="text-sm text-gray-300 font-medium">%100 Orijinal Lisanslı</span>
            </div>
            <div className="glass p-4 rounded-xl flex items-center gap-3">
              <Truck className="text-accent" size={24} />
              <span className="text-sm text-gray-300 font-medium">Aynı Gün Kargo</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => addItem(mockProduct)}
              className="flex-grow bg-primary hover:bg-purple-600 text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(109,40,217,0.5)] transform hover:-translate-y-1"
            >
              <ShoppingBag size={24} />
              Sepete Ekle
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4 text-center">
            Stokta sadece <span className="font-bold text-white">{mockProduct.stock}</span> adet kaldı!
          </p>
        </div>
      </div>
    </div>
  );
}
