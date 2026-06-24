# Products Catalog Client

A modern, responsive, and visually polished Product Catalog web client built with **Next.js 16**, **Tailwind CSS 4**, and **TypeScript**.

## Features

- 🛍️ **Dynamic Category Filtering**: Seamlessly filter products by categories (Grocery, Fashion, Electronics, Books, Sports) using a modern carousel filter bar.
- 🗂️ **Grid & List Views**: Toggle layouts on the fly with responsive layouts optimized for all device sizes.
- 🔄 **Cursor-based Pagination**: Built-in "Load More" pagination powered by backend cursors, appending products without layout shifts.
- ⚡ **Skeleton Loaders**: Custom layout-matched shimmer skeletons for smooth content transitions.
- 🛡️ **Robust UI Error Handling**:
  - Global error card for initial load failures with a **Try Again** reload action.
  - Non-intrusive inline error warning for paginated load failures with a **Retry** trigger.

---

## Getting Started

### Setup Instructions

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` (or `.env.local`) file in the root directory and set the API base URL:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to view the client.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://github.com/axios/axios)
