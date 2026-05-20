import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    // Normalde burada API'ye sipariş (order) oluşturma isteği atılır.
    setIsSuccess(true);
    clearCart();
    
    // 3 saniye sonra anasayfaya yönlendir
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <CheckCircle size={80} className="text-green-400 mb-6" />
        <h2 className="text-4xl font-bold text-white mb-4">Siparişiniz Alındı!</h2>
        <p className="text-gray-400 mb-8 max-w-md">Figürleriniz güvenle paketleniyor. Sipariş detayları e-posta adresinize gönderildi.</p>
        <p className="text-sm text-gray-500">Ana sayfaya yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <Link to="/cart" className="text-gray-400 hover:text-primary mb-8 inline-block transition-colors">&larr; Sepete Dön</Link>
      
      <h1 className="text-3xl font-bold text-white mb-8">Güvenli Ödeme</h1>
      
      <div className="glass p-8 rounded-3xl">
        <div className="flex items-center gap-2 mb-8 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20">
          <ShieldCheck size={24} />
          <span className="font-medium">256-bit SSL şifreleme ile ödemeniz güvende.</span>
        </div>

        <form onSubmit={handleCheckout} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Teslimat Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Ad Soyad</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">E-posta</label>
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Açık Adres</label>
                <textarea required rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"></textarea>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Ödeme Bilgileri (Demo)</h3>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Kart Numarası</label>
                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Son Kullanma (AA/YY)</label>
                  <input required type="text" placeholder="12/25" className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">CVV</label>
                  <input required type="text" placeholder="123" className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-purple-600 hover:to-yellow-500 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg transform hover:-translate-y-1">
            ${total.toFixed(2)} Öde ve Siparişi Tamamla
          </button>
        </form>
      </div>
    </div>
  );
}
