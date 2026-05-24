import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft, Minus, Plus, Share2, Package } from 'lucide-react';
import { productosService } from '../services/productos';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const emojis: Record<string, string> = {
  Electrónicos: '🎧',
  Ropa: '👕',
  Hogar: '💡',
  Deportes: '🏋️',
  Juguetes: '🤖',
  Libros: '📚',
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productosService
      .getById(Number(id))
      .then((p) => {
        setProduct(p);
        return productosService.getAll();
      })
      .then((all) => {
        setSimilar(all.filter((p) => p.id !== Number(id) && p.categoria === product?.categoria).slice(0, 4));
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center space-y-6 pt-16">
        <Package className="w-20 h-20 text-white/10" />
        <h2 className="text-2xl font-extrabold text-white">Producto no encontrado</h2>
        <p className="text-slate">El producto que buscas no existe o ha sido eliminado.</p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold px-8 py-4 rounded-xl transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen !pt-24">
      <div className="w-full mx-auto !px-6 !py-8 !md:py-12 !space-y-12">
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 text-sm text-slate hover:text-amber transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la Tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="flex items-center justify-center">
            <div
              className="rounded-2xl overflow-hidden  flex items-center justify-center !p-10 !md:h-96"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {product.imagen_url ? (
                <img src={product.imagen_url} alt={product.nombre} className="w-50% h-50% object-cover" />
              ) : (
                <span className="text-8xl">{emojis[product.categoria ?? ''] || '📦'}</span>
              )}
            </div>

            {product.badge && (
              <span
                className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold"
                style={{ background: 'rgba(245, 158, 11, 0.9)', color: '#0F172A' }}
              >
                {product.badge}
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-sm font-medium text-amber">{product.categoria}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {product.nombre}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < (product.rating ?? 0) ? 'text-amber fill-amber' : 'text-white/20'}`}
                    />
                  ))}
                </div>
                <span className="text-slate text-sm">({product.reviews ?? 0} reseñas)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl font-extrabold text-amber">${Number(product.precio).toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-slate/50 line-through">${Number(product.originalPrice).toFixed(2)}</span>
                  <span className="text-sm font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                    Ahorras ${(Number(product.originalPrice) - Number(product.precio)).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="text-slate leading-relaxed text-base">{product.descripcion}</p>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Características</h3>
              <ul className="space-y-2">
                {[
                  `Cantidad mínima: ${product.cantidad_minima} unidad(es)`,
                  `Cantidad máxima: ${product.cantidad_maxima} unidad(es)`,
                  'Envío gratis a todo el país',
                  'Garantía de 30 días',
                  'Pago seguro con SSL',
                ].map((spec, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-light">Cantidad:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <span className="text-lg font-bold text-white w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.cantidad_maxima, quantity + 1))}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
              <span className="text-xs text-slate">Máx: {product.cantidad_maxima}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-amber hover:bg-amber-dark text-oxford font-bold !px-8 !py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-lg"
                style={{ boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)' }}
              >
                <ShoppingCart className="w-6 h-6" />
                {addedToCart ? '✓ Agregado' : 'Agregar al Carrito'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 !pt-2">
              {[
                { icon: Truck, text: 'Envío Gratis', sub: 'En todos los pedidos' },
                { icon: Shield, text: 'Pago Seguro', sub: 'SSL encriptado' },
                { icon: ShoppingCart, text: 'Devolución', sub: '30 días gratis' },
              ].map((item, i) => (
                <div key={i} className="text-center !p-3 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                  <item.icon className="w-5 h-5 text-amber mx-auto mb-1" />
                  <p className="text-xl font-semibold text-white">{item.text}</p>
                  <p className="text-xs text-slate/50">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="!pt-8 border-t !p-24" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
            <div className="!mb-10 space-y-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Productos <span className="text-amber">Similares</span>
              </h2>
              <p className="text-slate">Descubre más productos en la misma categoría</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15">
              {similar.map((p: Product) => (
                <ProductCard key={p.id} product={p} onAddToCart={() => {}} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
