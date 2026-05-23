import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isWished, setIsWished] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleWishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWished(!isWished);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.imagen_url}
          alt={product.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-oxford/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleWishClick}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          style={{
            background: isWished ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Heart className={`w-4 h-4 ${isWished ? 'text-amber fill-amber' : 'text-white'}`} />
        </button>

        {product.badge && (
          <span
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: product.badge === 'Oferta' ? 'rgba(245, 158, 11, 0.9)' : 'rgba(34, 197, 94, 0.9)',
              color: '#0F172A',
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < (product.rating ?? 0) ? 'text-amber fill-amber' : 'text-white/20'}`}
            />
          ))}
          <span className="text-xs text-slate ml-1">({product.reviews ?? 0})</span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-amber transition-colors duration-300 leading-tight line-clamp-1">
          {product.nombre}
        </h3>

        <p className="text-sm text-slate/70 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {product.descripcion}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            {product.originalPrice && (
              <span className="text-sm text-slate/50 line-through block">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-extrabold text-amber">
              ${Number(product.precio).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: '#0F172A',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)',
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
