import { ShoppingCart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart, setCartOpen } = useCart();

  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setCartOpen(true);
  };

  const progress = Math.min(100, Math.round((product.cant_pedida / product.cantidad_minima) * 100));
  const isCompleted = product.cant_pedida >= product.cantidad_minima;

  const barColor = isCompleted
    ? 'linear-gradient(90deg, #22C55E, #16A34A)'
    : progress >= 75
      ? 'linear-gradient(90deg, #F59E0B, #D97706)'
      : progress >= 50
        ? 'linear-gradient(90deg, #3B82F6, #2563EB)'
        : 'linear-gradient(90deg, #6B7280, #4B5563)';

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
        {product.badge && (
          <span
            className="absolute top-3 left-3 !px-3 !py-1 rounded-full text-xs font-bold"
            style={{
              background: product.badge === 'Oferta' ? 'rgba(245, 158, 11, 0.9)' : 'rgba(34, 197, 94, 0.9)',
              color: '#0F172A',
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="!p-5 !space-y-3">
        <h3 className="text-lg font-bold text-white group-hover:text-amber transition-colors duration-300 leading-tight line-clamp-1">
          {product.nombre}
        </h3>

        <p className="text-sm text-slate/70 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {product.descripcion}
        </p>

        {/* Progress bar */}
        <div className="!space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-slate">
              <Users className="w-3 h-3" />
              {product.cant_pedida}/{product.cantidad_minima} Minimo
            </span>
            <span className="font-semibold" style={{ color: isCompleted ? '#22C55E' : progress >= 75 ? '#F59E0B' : '#94A3B8' }}>
              {isCompleted ? 'Listo para importar' : `${progress}%`}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, progress)}%`, background: barColor }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="!space-y-0.5">
            {product.originalPrice && (
              <span className="text-sm text-slate/50 line-through block">
                Bs {Number(product.originalPrice).toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-extrabold text-amber">
              Bs {Number(product.precio).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 !px-4 !py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
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
