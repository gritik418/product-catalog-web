"use client";

import { Navbar } from "@/components/Navbar";
import { ProductItem } from "@/components/ProductItem";
import {
  GetCategoriesResponseDto,
  GetProductsResponseDto,
  Product,
} from "@/types";
import { fetchCategories, fetchProducts } from "@/utils/api";
import {
  Apple,
  BookOpen,
  Cpu,
  Layers,
  LayoutGrid,
  List,
  Shirt,
  SlidersHorizontal,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Compute product count per category dynamically from the base product list
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSortBy("featured");
    setHideOutOfStock(false);
  };

  useEffect(() => {
    fetchProducts({
      cursorId: "6a3b698cc6d7f969082ed2ae",
      cursorUpdatedAt: "2026-06-06T10:39:59.045Z",
      category: activeCategory === "All" ? undefined : activeCategory,
    }).then((data: GetProductsResponseDto) => {
      if (data.success && data.products) {
        setProducts(data.products);
      }
    });
  }, [activeCategory]);

  useEffect(() => {
    fetchCategories().then((data: GetCategoriesResponseDto) => {
      if (data.success && data.categories) {
        setCategories(data.categories);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content Catalog */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Catalog Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200/50 dark:border-zinc-900 mb-8"></div>

        {/* Category Filter Section */}
        <div className="mb-8 flex justify-between gap-6">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
            {["All", ...categories].map((category) => {
              const isActive = activeCategory === category;

              const IconComponent = {
                All: Layers,
                Electronics: Cpu,
                Fashion: Shirt,
                Books: BookOpen,
                Sports: Trophy,
                Grocery: Apple,
              }[category];

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                      : "bg-white dark:bg-zinc-900 border-zinc-150 dark:border-zinc-800/85 text-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-850 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {IconComponent && (
                    <IconComponent
                      className={`h-3.5 w-3.5 ${
                        isActive
                          ? "text-white dark:text-zinc-900"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    />
                  )}
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Layout Grid vs List buttons */}
            <div className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Catalog Products Display */}
        {products.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-in"
                : "flex flex-col gap-5 max-w-4xl mx-auto animate-fade-in"
            }
          >
            {products.map((product: Product) => (
              <ProductItem
                key={product._id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/85 rounded-3xl max-w-md mx-auto shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center mb-5 text-zinc-450 border border-zinc-100 dark:border-zinc-850">
              <SlidersHorizontal className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              No matching products found
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed mb-6">
              We couldn&apos;t find anything matching your search. Try resetting
              filters or choosing a different category.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold shadow-sm transition-colors"
            >
              Reset Filters & Search
            </button>
          </div>
        )}
      </main>

      {/* Modern minimal footer */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-900/50 py-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold tracking-wider text-zinc-500 dark:text-zinc-400">
            AETHER CATALOG
          </span>
          <span>
            &copy; {new Date().getFullYear()} Aether Inc. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
