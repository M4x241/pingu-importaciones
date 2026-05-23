import { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Sparkles, Zap, Package, Star } from 'lucide-react';
import PenguinHero from '../components/PenguinHero';
import SearchFilters from '../components/SearchFilters';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import { productosService } from '../services/productos';
import type { Product, CartItem } from '../types';
import '../styles/penguinPage.css';

export default function StorePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setLoading(true);
    productosService
      .getAll()
      .then(setAllProducts)
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [{ ...product, quantity: 1 }, ...prev];
    });
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.categoria).filter(Boolean) as string[]);
    return ['Todas', ...cats];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategory !== 'Todas') {
      result = result.filter((p) => p.categoria === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          (p.categoria && p.categoria.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'price-desc':
        result.sort((a, b) => b.precio - a.precio);
        break;
      case 'name':
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  const featuredProducts = allProducts.filter((p) => p.featured);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <PenguinHero />

      <SearchFilters
        categories={categories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #F59E0B, #D97706)',
          color: '#0F172A',
          boxShadow: '0 8px 30px rgba(245, 158, 11, 0.35)',
        }}
      >
        <ShoppingCart className="w-5 h-5" />
        Carrito
        {cartCount > 0 && (
          <span
            className="ml-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: '#0F172A', color: '#F59E0B' }}
          >
            {cartCount}
          </span>
        )}
      </button>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <section id="ofertas" className="py-16 md:py-20 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(245, 158, 11, 0.03)' }}
        />
        <div className="w-full mx-auto relative z-10">
          <div className="text-center mb-12 space-y-4">
            <span
              className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#FCD34D' }}
            >
              <Sparkles className="w-4 h-4" />
              Productos Destacados
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Lo Más <span className="text-amber">Popular</span>
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Los productos más vendidos y mejor calificados de nuestra tienda.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-2 border-amber border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="productos" className="py-16 md:py-20 px-6" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <span
                className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#FCD34D' }}
              >
                <Package className="w-4 h-4" />
                Catálogo Completo
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Todos los <span className="text-amber">Productos</span>
              </h2>
            </div>
            <p className="text-slate text-sm hidden sm:block">
              {filteredProducts.length} productos encontrados
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-amber border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Package className="w-16 h-16 text-white/10 mx-auto" />
              <p className="text-white/50 text-xl font-medium">No se encontraron productos</p>
              <p className="text-slate/30 text-sm">Intenta con otros filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Envío Rápido', desc: 'Entrega en 24-48h' },
              { icon: Star, title: 'Calidad Premium', desc: 'Productos verificados' },
              { icon: ShoppingCart, title: 'Devolución Fácil', desc: '30 días de garantía' },
              { icon: Package, title: 'Pago Seguro', desc: 'SSL encriptado' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 text-center group cursor-pointer"
                style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '1rem' }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{ background: 'rgba(245, 158, 11, 0.1)' }}
                >
                  <item.icon className="w-7 h-7 text-amber" />
                </div>
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-slate/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
