import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProductsByCategory } from '../store/productSlice';
import { logout } from '../store/authSlice';
import { Category, Gender, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, ShoppingBag, Star, Search, Filter } from 'lucide-react';

const MALE_CATEGORIES: Category[] = ['mens-shirts', 'mens-shoes', 'mens-watches'];
const FEMALE_CATEGORIES: Category[] = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

interface HomeScreenProps {
  onSelectProduct: (id: number) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectProduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeGender, setActiveGender] = useState<Gender>('male');

  useEffect(() => {
    const categories = activeGender === 'male' ? MALE_CATEGORIES : FEMALE_CATEGORIES;
    dispatch(fetchProductsByCategory(categories));
  }, [activeGender, dispatch]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <div>
          <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Olá, {user?.name}</p>
          <h2 className="text-2xl font-bold text-neutral-900">Descubra</h2>
        </div>
        <button 
          onClick={() => dispatch(logout())}
          className="p-2 bg-neutral-100 rounded-full text-neutral-600 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-6">
        <div className="flex bg-neutral-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveGender('male')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeGender === 'male' ? 'bg-white shadow-sm text-black' : 'text-neutral-500'}`}
          >
            Masculino
          </button>
          <button 
            onClick={() => setActiveGender('female')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeGender === 'female' ? 'bg-white shadow-sm text-black' : 'text-neutral-500'}`}
          >
            Feminino
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mt-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input 
            type="text"
            placeholder="Procurar produtos..."
            className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black rounded-xl">
            <Filter className="text-white w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 pb-20 scrollbar-hide">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-10 h-10 border-4 border-neutral-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-neutral-400 text-sm font-medium">Carregando produtos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 font-medium">{error}</p>
            <button 
              onClick={() => dispatch(fetchProductsByCategory(activeGender === 'male' ? MALE_CATEGORIES : FEMALE_CATEGORIES))}
              className="mt-4 text-black font-bold underline"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {items.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => onSelectProduct(product.id)} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom Nav Simulation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-neutral-100 px-8 py-4 flex justify-between items-center">
        <ShoppingBag className="w-6 h-6 text-black" />
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center -mt-10 shadow-xl border-4 border-white">
          <Search className="w-5 h-5 text-white" />
        </div>
        <div className="w-6 h-6 rounded-full bg-neutral-200"></div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] bg-neutral-100 rounded-3xl overflow-hidden mb-3">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-bold">{product.rating}</span>
        </div>
        {product.discountPercentage > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-neutral-900 truncate">{product.title}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-bold text-black">${product.price}</span>
        <span className="text-xs text-neutral-400 line-through">
          ${Math.round(product.price * (1 + product.discountPercentage / 100))}
        </span>
      </div>
    </motion.div>
  );
};
