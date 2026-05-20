import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { useAuthStore } from './store/useAuthStore';
import { useCartStore } from './store/useCartStore';

function App() {
  const { token } = useAuthStore();
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white bg-gray-950 text-gray-100 relative">
        {/* Global Animated Background Gradients */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse"></div>
          <div className="absolute top-[40%] left-[-10%] w-[30%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow container mx-auto px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="mt-auto border-t border-white/10 py-8 text-center text-gray-500">
          <div className="container mx-auto px-6">
            <p className="mb-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">FiguVerse</p>
            <p>&copy; 2026 FiguVerse Inc. Tüm hakları saklıdır. Bu site eğitim amaçlıdır.</p>
          </div>
        </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
