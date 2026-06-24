"use client";

import React from "react";
import { Star, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";

const IMAGES = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop", // Groceries/Store
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop", // Fresh Veggies
  "https://images.unsplash.com/photo-1610832958506-ee5633613df2?q=80&w=600&auto=format&fit=crop", // Fruits
  "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=600&auto=format&fit=crop", // Healthy food / Breakfast
  "https://images.unsplash.com/photo-1488459718432-36c85e9e593d?q=80&w=600&auto=format&fit=crop", // Organic vegetables
  "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=600&auto=format&fit=crop", // Shopping cart grocery
  "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop", // Supermarket shelf
  "https://images.unsplash.com/photo-1543083503-43f0bf76f79d?q=80&w=600&auto=format&fit=crop", // Clothes/Apparel
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop", // Headphones/Audio
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop", // White product watch
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop", // Mechanical keyboard
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop", // Lightbar
];

const getProductImage = (productId: string) => {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = productId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % IMAGES.length;
  return IMAGES[index];
};

interface ProductItemProps {
  product: Product;
  viewMode: "grid" | "list";
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  viewMode,
}) => {
  if (viewMode === "list") {
    return (
      <div className="group bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl p-5 hover:shadow-xl hover:shadow-zinc-200/40 dark:hover:shadow-zinc-950/40 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative">
        {/* Product Image */}
        <div className="relative w-full sm:w-44 h-44 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex-shrink-0 flex items-center justify-center border border-zinc-100 dark:border-zinc-850">
          <img
            src={getProductImage(product._id)}
            alt={product.name}
            className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content Info */}
        <div className="flex-1 w-full flex flex-col justify-between self-stretch">
          <div>
            {/* Category & Ratings row */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                {product.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300"></span>
              </div>
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              dolores repudiandae asperiores tempore id eos quibusdam aut sed
              perspiciatis voluptates, dicta tenetur praesentium harum ex eum
              dolorem nisi aliquid itaque.
            </p>
          </div>

          {/* Pricing and Stock Status */}
          <div className="sm:mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-zinc-950 dark:text-zinc-50">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border
                    "text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30"
                `}
              >
                In Stock
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-zinc-200/40 dark:hover:shadow-zinc-950/40 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col h-full relative">
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden flex items-center justify-center border-b border-zinc-100 dark:border-zinc-900">
        <img
          src={getProductImage(product._id)}
          alt={product.name}
          className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content details */}
      <div className="p-4 flex flex-col grow">
        {/* Category & Rating Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-950 px-2 py-0.5 rounded-full border border-zinc-100 dark:border-zinc-900">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 mb-1.5">
          {product.name}
        </h3>

        {/* Excerpt Description */}
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
          ut tenetur quam natus optio blanditiis deserunt commodi ipsam impedit
          nemo?
        </p>

        {/* Pricing Row */}
        <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-zinc-950 dark:text-zinc-50">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-0.5">
            View{" "}
            <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
