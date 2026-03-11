import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProductById, clearSelectedProduct } from '../store/productSlice';
import { motion } from 'motion/react';
import { ChevronLeft, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

interface DetailScreenProps {
  productId: number;
  onBack: () => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ productId, onBack }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [productId, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="w-10 h-10 border-4 border-neutral-200 border-t-black rounded-full animate-spin"></div>
        <p className="text-neutral-400 text-sm font-medium">Carregando detalhes...</p>
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-medium">{error || 'Produto não encontrado'}</p>
        <button onClick={onBack} className="mt-4 text-black font-bold underline">Voltar</button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col h-full bg-white relative"
    >
      {/* Top Actions */}
      <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-10">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-neutral-900"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-3">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-neutral-900">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-neutral-900">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="h-[45%] bg-neutral-100">
        <img 
          src={selectedProduct.thumbnail} 
          alt={selectedProduct.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details Content */}
      <div className="flex-1 bg-white -mt-8 rounded-t-[2.5rem] px-8 pt-10 pb-24 overflow-y-auto scrollbar-hide shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-1">{selectedProduct.brand}</p>
            <h1 className="text-2xl font-bold text-neutral-900 leading-tight">{selectedProduct.title}</h1>
          </div>
          <div className="flex items-center gap-1 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-100">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold">{selectedProduct.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl font-bold text-black">${selectedProduct.price}</span>
          {selectedProduct.discountPercentage > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-lg text-neutral-300 line-through">
                ${Math.round(selectedProduct.price * (1 + selectedProduct.discountPercentage / 100))}
              </span>
              <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-1 rounded-lg">
                {Math.round(selectedProduct.discountPercentage)}% OFF
              </span>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">Descrição</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            {selectedProduct.description}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">Especificações</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">Stock</p>
              <p className="text-sm font-bold">{selectedProduct.stock} unidades</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">Categoria</p>
              <p className="text-sm font-bold capitalize">{selectedProduct.category.replace('-', ' ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-neutral-100 px-8 py-6">
        <button className="w-full bg-black text-white font-bold py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
          <ShoppingCart className="w-5 h-5" />
          Adicionar ao Carrinho
        </button>
      </div>
    </motion.div>
  );
};
