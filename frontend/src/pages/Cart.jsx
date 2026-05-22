import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { items, total, updateItem, removeItem, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-white/5 p-8 rounded-full mb-6">
          <ShoppingBag size={64} className="text-gray-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Sepetiniz Boş</h2>
        <p className="text-gray-400 mb-8 max-w-md">Koleksiyonunuza ekleyecek harika figürler bulmak için mağazamızı keşfetmeye başlayın.</p>
        <Link to="/" className="bg-primary hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-colors">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Alışveriş Sepeti</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-4">
          <div className="glass p-4 rounded-2xl flex justify-between items-center mb-4">
            <span className="text-gray-300 font-medium">{items.length} Ürün Seçildi</span>
            <button 
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
            >
              Sepeti Temizle
            </button>
          </div>
          
          {items.map(item => (
            <div key={item.product_id} className="glass p-4 rounded-2xl flex gap-6 items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <p className="text-accent font-semibold">${item.unit_price}</p>
              </div>
              
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1">
                <button
                  onClick={() => updateItem(item.product_id, item.quantity - 1)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white font-bold min-w-[24px] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateItem(item.product_id, item.quantity + 1)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="text-right min-w-[100px]">
                <p className="text-xl font-bold text-white">${item.subtotal.toFixed(2)}</p>
              </div>
              
              <button 
                onClick={() => removeItem(item.product_id)}
                className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="w-full lg:w-96">
          <div className="glass p-6 rounded-3xl sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Sipariş Özeti</h2>
            
            <div className="space-y-4 mb-6 text-gray-300">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo</span>
                <span className="text-green-400">Ücretsiz</span>
              </div>
              <div className="h-px bg-white/10 w-full my-4"></div>
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Toplam</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full bg-primary hover:bg-purple-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(109,40,217,0.5)]"
            >
              Ödemeye Geç <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
