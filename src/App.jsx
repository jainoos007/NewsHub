import { useState, useEffect, useRef } from "react";
import { newsApi } from "./utils/newsApi";
import Navbar from "./components/Navbar";
import CategoryTabs from "./components/CategoryTabs";
import NewsGrid from "./components/NewsGrid";
import SourceFilter from "./components/SourceFilter";
import BookmarksPage from "./components/BookmarksPage";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";
import { FiLoader } from "react-icons/fi";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("general");
  const [selectedSources, setSelectedSources] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef();

  // Initialize dark mode
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Fetch news when dependencies change
  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
    if (!searchQuery) {
      fetchNews(activeCategory, selectedSources, 1);
    }
  }, [activeCategory, selectedSources]);

  // Infinite scroll observer
  useEffect(() => {
    if (loadingMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreArticles();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [
    hasMore,
    loading,
    loadingMore,
    page,
    activeCategory,
    selectedSources,
    searchQuery,
  ]);

  // Fetch news (removed country parameter)
  const fetchNews = async (category, sources, pageNum) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const data = await newsApi.getTopHeadlines(
        category,
        "us",
        pageNum,
        sources
      );

      if (pageNum === 1) {
        setArticles(data.articles);
      } else {
        setArticles((prev) => [...prev, ...data.articles]);
      }

      setHasMore(data.hasMore);
    } catch (err) {
      setError(
        "Failed to fetch news. Please check your API key or try again later."
      );
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more articles
  const loadMoreArticles = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    if (searchQuery) {
      searchNews(searchQuery, nextPage);
    } else {
      fetchNews(activeCategory, selectedSources, nextPage);
    }
  };

  // Search news
  const searchNews = async (query, pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
      setArticles([]);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const data = await newsApi.searchNews(query, pageNum);

      if (pageNum === 1) {
        setArticles(data.articles);
      } else {
        setArticles((prev) => [...prev, ...data.articles]);
      }

      setHasMore(data.hasMore);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchQuery("");
      setPage(1);
      setArticles([]);
      fetchNews(activeCategory, selectedSources, 1);
      return;
    }

    setSearchQuery(query);
    setPage(1);
    searchNews(query, 1);
  };

  // Handle dark mode toggle
  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchQuery("");
    setSelectedSources([]);
  };

  // Handle source change
  const handleSourceChange = (sources) => {
    setSelectedSources(sources);
    setSearchQuery("");
  };

  // Handle retry
  const handleRetry = () => {
    setPage(1);
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      fetchNews(activeCategory, selectedSources, 1);
    }
  };

  if (showBookmarks) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <BookmarksPage onClose={() => setShowBookmarks(false)} />
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onSearch={handleSearch}
          onShowBookmarks={() => setShowBookmarks(true)}
        />

        <div className="max-w-7xl mx-auto px-4">
          {/* Top Section */}
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category Tabs */}
              <div className="flex-1 min-w-0">
                <CategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>

              {/* Source Filter */}
              <SourceFilter
                selectedSources={selectedSources}
                onSourceChange={handleSourceChange}
              />
            </div>
          </div>

          {/* Search/Filter Info */}
          {(searchQuery || selectedSources.length > 0) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {searchQuery && (
                <p className="text-gray-600 dark:text-gray-400">
                  Search results for:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    "{searchQuery}"
                  </span>
                </p>
              )}
              {selectedSources.length > 0 && (
                <p className="text-gray-600 dark:text-gray-400">
                  Filtered by {selectedSources.length} source
                  {selectedSources.length > 1 ? "s" : ""}
                </p>
              )}
              <span className="text-gray-500 dark:text-gray-400">
                ({articles.length} articles)
              </span>
            </div>
          )}

          {/* News Grid / Loading / Error */}
          <div className="pb-12">
            {error ? (
              <ErrorMessage message={error} onRetry={handleRetry} />
            ) : (
              <>
                <NewsGrid articles={articles} loading={loading} />

                {/* Load More Indicator */}
                {!loading && hasMore && articles.length > 0 && (
                  <div ref={loadMoreRef} className="flex justify-center py-8">
                    {loadingMore && (
                      <div className="flex items-center gap-3 text-blue-500">
                        <FiLoader className="animate-spin" size={24} />
                        <span className="font-medium">
                          Loading more articles...
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* No More Articles */}
                {!hasMore && articles.length > 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>You've reached the end! 🎉</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
