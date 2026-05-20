import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
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
      <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
        <Navbar />

        <main className="flex-grow container mx-auto px-6">
          <Routes>
            <Route path="/" element={<Home />} />
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
    </Router>
  );
}

export default App;
