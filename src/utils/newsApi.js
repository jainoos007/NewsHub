import axios from "axios";

// Use different base URL for development vs production
const BASE_URL = import.meta.env.DEV ? "http://localhost:5173/api" : "/api";

export const newsApi = {
  // Get top headlines
  getTopHeadlines: async (
    category = "general",
    country = "us",
    page = 1,
    sources = []
  ) => {
    try {
      const params = {
        page,
      };

      if (sources.length > 0) {
        params.sources = sources.join(",");
      } else {
        params.category = category;
        params.country = country;
      }

      const response = await axios.get(`${BASE_URL}/news`, { params });

      return {
        articles: response.data.articles || [],
        totalResults: response.data.totalResults || 0,
        hasMore: (response.data.articles || []).length === 12,
      };
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  // Search news
  searchNews: async (query, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          q: query,
          page,
        },
      });

      return {
        articles: response.data.articles || [],
        totalResults: response.data.totalResults || 0,
        hasMore: (response.data.articles || []).length === 12,
      };
    } catch (error) {
      console.error("Error searching news:", error);
      throw error;
    }
  },
};
