import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { FiArrowLeft } from "react-icons/fi";

const BookmarksPage = ({ onClose }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  const refreshBookmarks = () => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft
              size={24}
              className="text-gray-700 dark:text-gray-300"
            />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bookmarked Articles
          </h1>
          <span className="px-3 py-1 bg-rose-500 text-white text-sm rounded-full">
            {bookmarks.length}
          </span>
        </div>

        {/* Content */}
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <span className="text-6xl mb-4">🔖</span>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No bookmarks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start bookmarking articles to read them later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                onUpdate={refreshBookmarks}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
