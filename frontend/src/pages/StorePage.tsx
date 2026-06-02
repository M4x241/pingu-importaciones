import { useState, useEffect, useMemo } from "react";
import { ShoppingCart, Sparkles, Package } from "lucide-react";
import PenguinHero from "../components/PenguinHero";
import SearchFilters from "../components/SearchFilters";
import ProductCard from "../components/ProductCard";
import { productosService } from "../services/productos";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import "../styles/penguinPage.css";

export default function StorePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cartCount, setCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setLoading(true);
    productosService
      .getAll()
      .then(setAllProducts)
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.categoria).filter(Boolean) as string[]);
    return ["Todas", ...cats];
  }, [allProducts]);

  const availableProducts = useMemo(
    () => allProducts.filter((p) => p.cant_pedida < p.cantidad_maxima),
    [allProducts],
  );

  const filteredProducts = useMemo(() => {
    let result = [...availableProducts];

    if (selectedCategory !== "Todas") {
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
      case "price-asc":
        result.sort((a, b) => a.precio - b.precio);
        break;
      case "price-desc":
        result.sort((a, b) => b.precio - a.precio);
        break;
      case "name":
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }

    return result;
  }, [availableProducts, selectedCategory, searchQuery, sortBy]);

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
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 !px-3.5 !py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #F59E0B, #D97706)",
          color: "#0F172A",
          boxShadow: "0 8px 30px rgba(245, 158, 11, 0.35)",
        }}
      >
        <ShoppingCart className="w-5 h-5" />
        Carrito
        {cartCount > 0 && (
          <span
            className="!ml-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "#0F172A", color: "#F59E0B" }}
          >
            {cartCount}
          </span>
        )}
      </button>

      <section
        id="productos"
        className="!py-16 md:py-20 !px-4 sm:!px-8 md:!px-16 lg:!px-32 xl:!px-60"
        style={{
          background: "linear-gradient(0deg, #0F172A 0%, #0B0F19 100%)",
        }}
      >
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <span
                className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-1.5 rounded-full"
                style={{ background: "rgba(245, 158, 11, 0.1)", color: "#FCD34D" }}
              >
                <Sparkles className="w-4 h-4" />
                Compra en Colonia
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Todos los <span className="text-amber">Productos</span>
              </h2>
            </div>
            <p className="text-slate text-sm hidden sm:block">
              {filteredProducts.length} productos disponibles
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-amber border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Package className="w-16 h-16 text-white/10 mx-auto" />
              <p className="text-white/50 text-xl font-medium">
                No se encontraron productos disponibles
              </p>
              <p className="text-slate/30 text-sm">
                Todos los productos han alcanzado su cantidad máxima o no hay coincidencias
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 !py-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
