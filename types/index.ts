export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface NextCursor {
  cursorId: string;
  cursorUpdatedAt: string;
}

export interface GetProductsResponseDto {
  success: boolean;
  message: string;
  nextCursor?: NextCursor | null;
  products?: Product[];
  count?: number;
}

export interface GetCategoriesResponseDto {
  success: boolean;
  message: string;
  categories?: string[];
}
