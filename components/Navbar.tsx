import { Sparkles } from "lucide-react";

export const Navbar = () => {
  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer group">
            <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider bg-linear-to-r from-zinc-900 via-zinc-850 to-zinc-700 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                Products
              </span>
              <span className="text-xs font-bold uppercase text-gray-800 dark:text-gray-400 tracking-wider">
                Catalog
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
