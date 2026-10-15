import React, { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { loadCatalog, CATEGORY_LABELS } from '../data/catalog';
import ProductCard from './ProductCard';

const PAGE_SIZE = 12;
const SORTS = {
  featured: { label: 'Featured', fn: null },
  'price-asc': { label: 'Price: Low to High', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: High to Low', fn: (a, b) => b.price - a.price },
};

// Filterable, paginated grid of real catalogue products for one collection.
export const CatalogGrid = ({ gender, onNavigate, id, compact = false }) => {
  const [catalog, setCatalog] = useState(null);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;
    loadCatalog().then((items) => alive && setCatalog(items));
    return () => {
      alive = false;
    };
  }, []);

  const inCollection = useMemo(
    () => (catalog || []).filter((p) => !gender || p.gender === gender),
    [catalog, gender],
  );
  const categories = useMemo(
    () => Object.keys(CATEGORY_LABELS).filter((c) => inCollection.some((p) => p.category === c)),
    [inCollection],
  );
  const shown = useMemo(() => {
    const list = inCollection.filter((p) => category === 'all' || p.category === category);
    return SORTS[sort].fn ? [...list].sort(SORTS[sort].fn) : list;
  }, [inCollection, category, sort]);

  const pageCount = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const pageItems = shown.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (n) => {
    setPage(n);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const pill = (active) =>
    `px-4 sm:px-5 py-2 rounded-full text-xs font-['Outfit'] font-bold whitespace-nowrap transition cursor-pointer ${
      active ? 'bg-[#1E3F20] text-white' : 'bg-[#F4F6F2] text-[#4A5D4E] hover:bg-[#E8EDDF] hover:text-[#1E3F20]'
    }`;

  return (
    <section id={id} className={`max-w-[1360px] mx-auto ${compact ? 'py-4' : 'px-4 sm:px-6 py-6 border-t border-[#E8EDDF]'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button onClick={() => { setCategory('all'); setPage(1); }} className={pill(category === 'all')}>All</button>
          {categories.map((c) => (
            <button key={c} onClick={() => { setCategory(c); setPage(1); }} className={pill(category === c)}>
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor={`${id}-sort`} className="text-xs text-gray-500 flex items-center gap-1.5">
            <SlidersHorizontal size={14} /> Sort
          </label>
          <select
            id={`${id}-sort`}
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="bg-[#F4F6F2] border border-gray-200 text-xs font-['Outfit'] font-bold text-[#1E3F20] px-4 py-2 rounded-full focus:outline-none focus:border-[#84BD3A] cursor-pointer"
          >
            {Object.entries(SORTS).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <span className="text-xs font-['Geist_Mono'] text-gray-400 tabular-nums">{catalog ? `${shown.length} styles` : ''}</span>
        </div>
      </div>

      {!catalog ? (
        <div className={`grid grid-cols-2 ${compact ? '' : 'md:grid-cols-3 lg:grid-cols-4'} gap-4 sm:gap-6 pb-12`} aria-busy="true">
          {Array.from({ length: compact ? 4 : 8 }, (_, i) => (
            <div key={i} className="rounded-2xl bg-[#F4F6F2] aspect-[3/4] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className={`grid grid-cols-2 ${compact ? '' : 'md:grid-cols-3 lg:grid-cols-4'} gap-3 sm:gap-6 pb-12`}>
          {pageItems.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} compact={compact} />
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-6 border-t border-[#E8EDDF]" aria-label="Pages">
          <button
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
            aria-label="Previous page"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1E3F20] hover:text-[#1E3F20] disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goToPage(n)}
              aria-current={n === page ? 'page' : undefined}
              className={`w-9 h-9 rounded-full font-['Geist_Mono'] text-xs font-bold cursor-pointer ${
                n === page ? 'bg-[#1E3F20] text-white' : 'text-[#1E3F20] hover:bg-gray-100'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            disabled={page === pageCount}
            onClick={() => goToPage(page + 1)}
            aria-label="Next page"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1E3F20] hover:text-[#1E3F20] disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </section>
  );
};

export default CatalogGrid;
