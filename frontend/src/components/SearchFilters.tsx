import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

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
  { value: 'default', label: 'Por Defecto' },
  { value: 'price-asc', label: 'Menor Precio' },
  { value: 'price-desc', label: 'Mayor Precio' },
  { value: 'name', label: 'A-Z' },
];

const SearchFilters = ({ categories, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy }: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="py-8 px-6" style={{ backgroundColor: '#0F172A' }}>
      <div className="w-full mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3.5 rounded-xl text-sm text-white outline-none cursor-pointer appearance-none"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-oxford text-white">
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3.5 rounded-xl transition-all duration-300 md:hidden"
              style={{
                background: showFilters ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${showFilters ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
              }}
            >
              <SlidersHorizontal className={`w-5 h-5 ${showFilters ? 'text-amber' : 'text-slate'}`} />
            </button>
          </div>
        </div>

        <div className={`flex flex-wrap gap-2 ${showFilters ? '' : 'hidden md:flex'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: selectedCategory === cat ? '#F59E0B' : 'rgba(255, 255, 255, 0.06)',
                color: selectedCategory === cat ? '#0F172A' : 'rgba(203, 213, 225, 0.8)',
                border: `1px solid ${selectedCategory === cat ? 'transparent' : 'rgba(255, 255, 255, 0.1)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
