import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Truck, Shield, ArrowLeft, Minus, Plus, Share2, Package, Users } from 'lucide-react';
import { productosService } from '../services/productos';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const emojis: Record<string, string> = {
  Tecnología: '💻',
  Ropa: '👕',
  Hogar: '💡',
  Deportes: '🏋️',
  Accesorios: '⌚',
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, setCartOpen } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setSimilar([]);
    let categoria: string | null = null;
    productosService
      .getById(Number(id))
      .then((p) => {
        setProduct(p);
        categoria = p.categoria;
        return productosService.getAll();
      })
      .then((all) => {
        if (!all || !categoria) return;
        setSimilar(all.filter((prod) => prod.id !== Number(id) && prod.categoria && prod.categoria.toLowerCase().trim() === categoria!.toLowerCase().trim()).slice(0, 4));
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setCartOpen(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const progress = product ? Math.min(100, Math.round((product.cant_pedida / product.cantidad_minima) * 100)) : 0;
  const isCompleted = product ? product.cant_pedida >= product.cantidad_minima : false;

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
              className="rounded-2xl overflow-hidden flex items-center justify-center !p-10 !md:h-96"
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

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-slate">
                    <Users className="w-4 h-4" />
                    Progreso de importación
                  </span>
                  <span className="font-semibold" style={{ color: isCompleted ? '#22C55E' : progress >= 75 ? '#F59E0B' : '#94A3B8' }}>
                    {isCompleted ? '¡Completado!' : `${progress}%`}
                  </span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.08)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, progress)}%`,
                      background: isCompleted
                        ? 'linear-gradient(90deg, #22C55E, #16A34A)'
                        : progress >= 75
                          ? 'linear-gradient(90deg, #F59E0B, #D97706)'
                          : 'linear-gradient(90deg, #3B82F6, #2563EB)',
                    }}
                  />
                </div>
                <p className="text-xs text-slate">
                  {product.cant_pedida} de {product.cantidad_minima} unidades pedidas (mínimo para importar)
                </p>
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
                  `Cantidad mínima para importar: ${product.cantidad_minima}`,
                  `Cantidad máxima: ${product.cantidad_maxima}`,
                  `Pedido actual: ${product.cant_pedida} unidades`,
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
                  onClick={() => setQuantity(Math.min(product.cantidad_maxima - product.cant_pedida, quantity + 1))}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
              <span className="text-xs text-slate">Disponible: {product.cantidad_maxima - product.cant_pedida}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-amber hover:bg-amber-dark text-oxford font-bold !px-8 !py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-lg"
                style={{ boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)' }}
              >
                <ShoppingCart className="w-6 h-6" />
                {addedToCart ? '✓ Agregado al carrito' : 'Agregar al Carrito'}
              </button>
              <button
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 text-white"
                style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <Share2 className="w-5 h-5" />
                Compartir
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
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
