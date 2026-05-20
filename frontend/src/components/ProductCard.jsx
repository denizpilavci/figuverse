import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="glass-card group flex flex-col h-full overflow-hidden">
      <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden block">
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300"></div>
        <img 
          src={product.image_url || '/images/samurai.png'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-semibold text-white shadow-lg">
          {product.universe}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
            <h3 className="text-lg font-bold text-gray-100 line-clamp-2">{product.name}</h3>
          </Link>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">
            ${product.price}
          </span>
          <button 
            onClick={() => addItem(product)}
            className="bg-primary hover:bg-purple-600 text-white p-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(109,40,217,0.5)] active:scale-95 flex items-center justify-center"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
