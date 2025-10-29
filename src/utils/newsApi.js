import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const newsApi = {
  // Get top headlines with pagination
  getTopHeadlines: async (
    category = "general",
    country = "us",
    page = 1,
    sources = []
  ) => {
    try {
      const params = {
        apiKey: API_KEY,
        page,
        pageSize: 12, // Load 12 articles per page
      };

      // Either use sources OR category+country (not both)
      if (sources.length > 0) {
        params.sources = sources.join(",");
      } else {
        params.category = category;
        params.country = country;
      }

      const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
      return {
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        hasMore: response.data.articles.length === 12,
      };
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  // Search news with pagination
  searchNews: async (query, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query,
          sortBy: "publishedAt",
          page,
          pageSize: 12,
          apiKey: API_KEY,
        },
      });
      return {
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        hasMore: response.data.articles.length === 12,
      };
    } catch (error) {
      console.error("Error searching news:", error);
      throw error;
    }
  },
};
