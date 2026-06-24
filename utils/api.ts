import axios from "axios";

export interface FetchProductsParams {
  cursorId?: string;
  cursorUpdatedAt?: string;
  category?: string;
}

export const fetchProducts = async (data: FetchProductsParams) => {
  try {
    const searchParams = new URLSearchParams();
    if (data.cursorId) {
      searchParams.append("cursorId", data.cursorId);
    }
    if (data.cursorUpdatedAt) {
      searchParams.append("cursorUpdatedAt", data.cursorUpdatedAt);
    }
    if (data.category) {
      searchParams.append("category", data.category);
    }
    const response = await axios({
      method: "GET",
      url: `http://localhost:8000/api/products?${searchParams.toString()}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error fetching products:",
        error.response?.data || error.message,
      );
      throw error.response?.data || error;
    }
    console.error("Unexpected error fetching products:", error);
    throw error;
  }
};
