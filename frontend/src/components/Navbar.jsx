import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Package } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const { items } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Package size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gradient">
            FiguVerse
          </span>
        </Link>
        
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Evrenlerde figür ara (Örn: Marvel, Star Wars)..." 
            className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500"
          />
        </div>

        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative group">
            <ShoppingCart size={24} className="text-gray-300 group-hover:text-primary transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors font-medium">
            <User size={24} />
            <span className="hidden sm:inline">Giriş Yap</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
