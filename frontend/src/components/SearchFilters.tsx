import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  categories: string[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const sortOptions = [
  { value: "default", label: "Por Defecto" },
  { value: "price-asc", label: "Menor Precio" },
  { value: "price-desc", label: "Mayor Precio" },
  { value: "name", label: "A-Z" },
];

const SearchFilters = ({
  categories,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section
      className="!px-6 sm:!px-8 lg:!px-10  flex flex-col items-center"
      style={{
        background: "#0B0F19",
      }}
    >
      s
      <div className="mx-auto w-full max-w-7xl !space-y-6">
        <div className="grid !gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="!space-y-3">
            <div className="flex items-center justify-between !gap-3">
              <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Buscar productos
              </span>
            </div>

            <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Buscar producto o grupo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-[#070b12] !py-3 !pl-5 !pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#ffab00]/60 focus:ring-2 focus:ring-[#ffab00]/20"
              />
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-500 transition-colors hover:text-white"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-end justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <span className="!mb-2 block text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Ordenar resultados
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-full border border-white/10 bg-[#070b12] !px-5 !py-3 !pr-12 text-sm font-semibold tracking-wide text-white outline-none transition-all duration-300 focus:border-[#ffab00]/60 focus:ring-2 focus:ring-[#ffab00]/20"
              >
                {sortOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-[#0b111e] text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-[calc(50%+12px)] h-4 w-4 -translate-y-1/2 text-[#ffab00]" />
            </div>
          </div>
        </div>

        {/* Botón de control de filtros para pantallas móviles */}
        <div className="flex items-center justify-between !gap-2 lg:hidden">
          <span className="text-sm text-gray-400">Categorías</span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center !gap-2 rounded-full border border-white/10 bg-white/5 !px-4 !py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-[#ffab00]/40 hover:bg-white/10"
            aria-expanded={showFilters}
            aria-label="Mostrar u ocultar categorías"
          >
            <SlidersHorizontal
              className={`h-4 w-4 ${showFilters ? "text-[#ffab00]" : "text-gray-400"}`}
            />
            Filtros
          </button>
        </div>

        {/* Contenedor de Categorías: Píldoras centradas y más visibles */}
        <div
          className={`flex-wrap items-center justify-center !gap-2.5 ${showFilters ? "flex" : "hidden lg:flex"}`}
        >
          {categories.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full !px-6 !py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300"
                style={{
                  background: isSelected
                    ? "#ffab00"
                    : "rgba(255, 255, 255, 0.05)",
                  color: isSelected ? "#000000" : "#ffffff",
                  border: `1px solid ${isSelected ? "#ffab00" : "rgba(255, 255, 255, 0.1)"}`,
                  boxShadow: isSelected
                    ? "0 0 15px rgba(255, 171, 0, 0.2)"
                    : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
