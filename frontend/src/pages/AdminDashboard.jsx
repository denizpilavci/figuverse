import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'products') {
          const res = await api.get('/products');
          setProducts(res.data.data);
        } else {
          // Token gerekli
          const res = await api.get('/orders');
          setOrders(res.data.data);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        // Hata durumunda 401 veya 403 ise auth eksiği olabilir
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert('Bu sayfayı görüntülemek için Admin girişi yapmalısınız.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Yönetici Paneli</h1>
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'products' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Package size={18} /> Ürünler
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <ShoppingCart size={18} /> Siparişler
          </button>
        </div>
      </div>

      <div className="glass p-6 md:p-8 rounded-3xl min-h-[60vh]">
        {loading ? (
          <div className="flex justify-center items-center h-full min-h-[40vh]">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : activeTab === 'products' ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">Ürün Envanteri</h2>
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg transform hover:-translate-y-0.5">
                <Plus size={18} /> Yeni Ürün
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Ürün Adı</th>
                    <th className="pb-3 font-medium">Evren</th>
                    <th className="pb-3 font-medium">Fiyat</th>
                    <th className="pb-3 font-medium">Stok</th>
                    <th className="pb-3 font-medium text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4">#{product.id}</td>
                      <td className="py-4 font-bold text-white">{product.name}</td>
                      <td className="py-4">
                        <span className="bg-white/10 px-2 py-1 rounded-md text-xs">{product.universe}</span>
                      </td>
                      <td className="py-4 text-accent font-medium">${product.price}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock > 3 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {product.stock} Adet
                        </span>
                      </td>
                      <td className="py-4 flex justify-end gap-2">
                        <button className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr><td colSpan="6" className="text-center py-8 text-gray-500">Hiç ürün bulunamadı.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">Sipariş Yönetimi</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="pb-3 font-medium">Sipariş ID</th>
                    <th className="pb-3 font-medium">Müşteri</th>
                    <th className="pb-3 font-medium">Tarih</th>
                    <th className="pb-3 font-medium">Toplam</th>
                    <th className="pb-3 font-medium">Durum</th>
                    <th className="pb-3 font-medium text-right">Detay</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 font-mono text-gray-400">#{order.id}</td>
                      <td className="py-4 font-bold text-white">{order.user_name} ({order.user_email})</td>
                      <td className="py-4 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="py-4 font-medium text-accent">${order.total}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-sm font-medium text-primary hover:text-white transition-colors border border-primary hover:bg-primary px-3 py-1 rounded-lg">
                          İncele
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan="6" className="text-center py-8 text-gray-500">Sipariş bulunmuyor.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
