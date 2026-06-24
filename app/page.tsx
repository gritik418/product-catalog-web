"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductItem } from "@/components/ProductItem";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  Layers,
  Cpu,
  Shirt,
  BookOpen,
  Trophy,
  Apple,
} from "lucide-react";
import { GetProductsResponseDto, Product } from "@/types";
import { fetchProducts } from "@/utils/api";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc";

const categories = ["Electronics", "Fashion", "Books", "Sports", "Grocery"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content Catalog */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Catalog Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200/50 dark:border-zinc-900 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Product Catalog
            </h1>
            <p className="text-xs text-zinc-450 dark:text-zinc-500 font-bold mt-1 uppercase tracking-wider">
              {products.length} {products.length === 1 ? "Product" : "Products"}{" "}
              Found
            </p>
          </div>

          {/* Quick Controls Layout */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Out of Stock filter toggle switch */}
            <label className="flex items-center gap-2.5 cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors">
              <input
                type="checkbox"
                checked={hideOutOfStock}
                onChange={(e) => setHideOutOfStock(e.target.checked)}
                className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 bg-transparent"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Selector Dropdown */}
            <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-xl px-3 py-1 text-zinc-700 dark:text-zinc-350">
              <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-xs font-semibold border-none focus:outline-none focus:ring-0 py-1.5 pr-2.5 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

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

        {/* Category Filter Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
            {["All", ...categories].map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category] || 0;

              // Get the matching icon components
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
                      : "bg-white dark:bg-zinc-900 border-zinc-150 dark:border-zinc-800/85 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850 hover:text-zinc-900 dark:hover:text-zinc-200"
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
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                      isActive
                        ? "bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-450 dark:text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
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
