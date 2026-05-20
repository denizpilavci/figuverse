import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Plus, Edit2, Trash2, Loader2, X } from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    universe: '',
    category_id: 1 // Varsayılan Kategori
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const res = await api.get('/products');
        setProducts(res.data.data);
      } else {
        const res = await api.get('/orders');
        setOrders(res.data.data);
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Bu sayfayı görüntülemek için Admin girişi yapmalısınız.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', parseFloat(formData.price));
      data.append('stock', parseInt(formData.stock));
      data.append('universe', formData.universe);
      data.append('category_id', parseInt(formData.category_id));
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      await api.post('/products', data);
      
      setShowModal(false);
      setFormData({ name: '', description: '', price: '', stock: '', universe: '', category_id: 1 });
      setImageFile(null);
      fetchData(); // Listeyi yenile
    } catch (error) {
      alert(error.response?.data?.message || 'Ürün oluşturulurken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchData();
      } catch (error) {
        alert('Ürün silinemedi.');
      }
    }
  };

  return (
    <div className="py-8">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-gray-900 border border-white/10 p-6 md:p-8 rounded-3xl w-full max-w-2xl shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Yeni Ürün Ekle</h2>
            
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ürün Adı</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Evren (Örn: Marvel, Anime)</label>
                  <input required value={formData.universe} onChange={e => setFormData({...formData, universe: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Fiyat ($)</label>
                  <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" step="0.01" min="0.01" className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Stok Miktarı</label>
                  <input required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} type="number" min="0" className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Açıklama</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ürün Görseli Yükle</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => setImageFile(e.target.files[0])} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-purple-600 transition-all cursor-pointer" 
                    />
                  </div>
                  {imageFile && <p className="text-sm text-green-400 mt-2">Seçilen dosya: {imageFile.name}</p>}
                </div>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full mt-6 bg-primary hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Ürünü Kaydet'}
              </button>
            </form>
          </div>
        </div>
      )}

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
              <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg transform hover:-translate-y-0.5">
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
                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
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
