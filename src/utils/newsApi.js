import axios from "axios";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4";

// Map categories to GNews topics
const categoryMap = {
  general: "breaking-news",
  technology: "technology",
  business: "business",
  sports: "sports",
  entertainment: "entertainment",
  health: "health",
  science: "science",
};

// Transform GNews article to News API format
const transformArticle = (article) => ({
  source: {
    id: null,
    name: article.source?.name || "Unknown",
  },
  author: article.source?.name || null,
  title: article.title,
  description: article.description,
  url: article.url,
  urlToImage: article.image, // GNews uses 'image' instead of 'urlToImage'
  publishedAt: article.publishedAt,
  content: article.content,
});

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
        token: API_KEY,
        lang: "en",
        max: 12,
      };

      if (category) {
        params.topic = categoryMap[category] || "breaking-news";
      }

      if (country) {
        params.country = country;
      }

      const response = await axios.get(`${BASE_URL}/top-headlines`, { params });

      // Transform articles to match News API format
      const transformedArticles = (response.data.articles || []).map(
        transformArticle
      );

      return {
        articles: transformedArticles,
        totalResults: response.data.totalArticles || 0,
        hasMore: transformedArticles.length === 12,
      };
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  // Search news
  searchNews: async (query, page = 1) => {
    try {
      const params = {
        q: query,
        token: API_KEY,
        lang: "en",
        max: 12,
      };

      const response = await axios.get(`${BASE_URL}/search`, { params });

      // Transform articles to match News API format
      const transformedArticles = (response.data.articles || []).map(
        transformArticle
      );

      return {
        articles: transformedArticles,
        totalResults: response.data.totalArticles || 0,
        hasMore: transformedArticles.length === 12,
      };
    } catch (error) {
      console.error("Error searching news:", error);
      throw error;
    }
  },
};
