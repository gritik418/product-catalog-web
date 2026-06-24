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
  AlertCircle,
  Apple,
  BookOpen,
  Cpu,
  Layers,
  LayoutGrid,
  List,
  Loader2,
  Shirt,
  SlidersHorizontal,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [nextCursor, setNextCursor] = useState<
    { cursorId: string; cursorUpdatedAt: string } | null | undefined
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMore, setErrorMore] = useState<string | null>(null);

  const handleResetFilters = () => {
    setActiveCategory("All");
  };

  const loadInitialProducts = (category: string) => {
    setIsLoading(true);
    setError(null);
    setErrorMore(null);
    fetchProducts({
      category: category === "All" ? undefined : category,
    })
      .then((data: GetProductsResponseDto) => {
        if (data?.success && data?.products) {
          setProducts(data.products);
          setNextCursor(data.nextCursor);
        } else {
          setError(data?.message || "Failed to load products.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError(
          err?.message ||
            "Failed to load products. Please check your connection and try again.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadInitialProducts(activeCategory);
  }, [activeCategory]);

  const handleLoadMore = () => {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    setErrorMore(null);
    fetchProducts({
      cursorId: nextCursor?.cursorId,
      cursorUpdatedAt: nextCursor?.cursorUpdatedAt,
      category: activeCategory === "All" ? undefined : activeCategory,
    })
      .then((data: GetProductsResponseDto) => {
        if (data.success && data.products) {
          setProducts((prev) => [...prev, ...(data.products || [])]);
          setNextCursor(data.nextCursor);
        } else {
          setErrorMore(data.message || "Failed to load more products.");
        }
      })
      .catch((err) => {
        console.error("Failed to load more products:", err);
        setErrorMore(
          err?.message ||
            "Failed to load more products. Please check your connection and try again.",
        );
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchCategories().then((data: GetCategoriesResponseDto) => {
      if (data?.success && data?.categories) {
        setCategories(data.categories);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar />

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
        {isLoading ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8"
                : "flex flex-col gap-5 max-w-4xl mx-auto"
            }
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={
                  viewMode === "grid"
                    ? "bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col h-full animate-pulse"
                    : "bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl p-5 flex flex-col sm:flex-row gap-6 items-start sm:items-center animate-pulse"
                }
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="aspect-square w-full bg-zinc-200 dark:bg-zinc-800/50" />
                    <div className="p-4 flex flex-col grow">
                      <div className="h-3 w-16 bg-zinc-250 dark:bg-zinc-800/80 rounded mb-3" />
                      <div className="h-4 w-3/4 bg-zinc-250 dark:bg-zinc-800/80 rounded mb-2.5" />
                      <div className="h-3 w-full bg-zinc-250 dark:bg-zinc-800/80 rounded mb-2" />
                      <div className="h-3 w-5/6 bg-zinc-250 dark:bg-zinc-800/80 rounded mb-4" />
                      <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
                        <div className="h-5 w-14 bg-zinc-250 dark:bg-zinc-800/80 rounded" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full sm:w-44 h-44 rounded-xl bg-zinc-200 dark:bg-zinc-800/50 shrink-0" />
                    <div className="flex-1 w-full flex flex-col justify-between self-stretch">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-3 w-16 bg-zinc-250 dark:bg-zinc-800/80 rounded" />
                          <div className="h-3.5 w-8 bg-zinc-250 dark:bg-zinc-800/80 rounded-full" />
                        </div>
                        <div className="h-5 w-1/2 bg-zinc-250 dark:bg-zinc-800/80 rounded mb-3" />
                        <div className="h-3 w-full bg-zinc-250 dark:bg-zinc-800/80 rounded mb-2" />
                        <div className="h-3 w-5/6 bg-zinc-250 dark:bg-zinc-800/80 rounded mb-4" />
                      </div>
                      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
                        <div className="h-6 w-16 bg-zinc-250 dark:bg-zinc-800/80 rounded" />
                        <div className="h-5.5 w-18 bg-zinc-250 dark:bg-zinc-800/80 rounded-full" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-zinc-900 border border-red-100 dark:border-red-950/20 rounded-3xl max-w-md mx-auto shadow-sm animate-fade-in">
            <div className="h-14 w-14 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center mb-5 border border-red-100/50 dark:border-red-900/20">
              <AlertCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              Failed to load products
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed mb-6">
              {error}
            </p>
            <button
              onClick={() => loadInitialProducts(activeCategory)}
              className="px-5 py-2.5 rounded-xl bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-650 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : products.length > 0 ? (
          <>
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

            {/* Load More Section */}
            {(nextCursor || errorMore) && (
              <div className="flex flex-col items-center justify-center mt-12 mb-6 gap-4">
                {errorMore && (
                  <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 animate-fade-in bg-red-50/50 dark:bg-red-950/10 px-4 py-2.5 rounded-xl border border-red-100 dark:border-red-950/20">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                    <span>{errorMore}</span>
                    <button
                      onClick={handleLoadMore}
                      className="underline hover:text-red-700 dark:hover:text-red-300 font-bold cursor-pointer ml-1"
                    >
                      Retry
                    </button>
                  </div>
                )}
                {nextCursor && (
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="flex items-center gap-2.5 px-6 py-3 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850/50 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500 dark:text-zinc-400" />
                        <span>Loading more...</span>
                      </>
                    ) : (
                      <span>Load More Products</span>
                    )}
                  </button>
                )}
              </div>
            )}
          </>
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
            PRODUCTS CATALOG
          </span>
        </div>
      </footer>
    </div>
  );
}
