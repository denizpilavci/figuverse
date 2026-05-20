import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ShoppingBag, Star, Shield, Truck, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        setError("Ürün bulunamadı veya yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-bold text-white mb-4">Hata</h2>
        <p className="text-gray-400 mb-8">{error}</p>
        <Link to="/" className="bg-primary hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-colors">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  return (
    <div className="py-8 animate-fade-in">
      <Link to="/" className="text-gray-400 hover:text-primary mb-8 inline-block transition-colors">&larr; Mağazaya Dön</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Sol Taraf: Görsel */}
        <div className="glass p-4 rounded-3xl relative group">
          <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-semibold text-white z-10">
            {product.universe}
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden relative bg-gradient-to-tr from-gray-800 to-gray-900">
            <img 
              src={product.image_url} 
              alt={product.name} 
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
            {product.name}
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>
          
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300 mb-8">
            ${product.price}
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
              onClick={() => addItem(product)}
              disabled={product.stock <= 0}
              className={`flex-grow font-bold py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all transform ${product.stock > 0 ? 'bg-primary hover:bg-purple-600 text-white hover:shadow-[0_0_30px_rgba(109,40,217,0.5)] hover:-translate-y-1' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
            >
              <ShoppingBag size={24} />
              {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4 text-center">
            Stokta sadece <span className="font-bold text-white">{product.stock}</span> adet kaldı!
          </p>
        </div>
      </div>
    </div>
  );
}
