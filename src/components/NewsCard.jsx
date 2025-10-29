import { useState, useEffect } from "react";
import {
  FiBookmark,
  FiShare2,
  FiExternalLink,
  FiClock,
  FiEye,
} from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NewsCard = ({ article, onUpdate }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const exists = bookmarks.some((item) => item.url === article.url);
    setIsBookmarked(exists);
  }, [article.url]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (isBookmarked) {
      const filtered = bookmarks.filter((item) => item.url !== article.url);
      localStorage.setItem("bookmarks", JSON.stringify(filtered));
    } else {
      bookmarks.push(article);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    setIsBookmarked(!isBookmarked);
    if (onUpdate) onUpdate();
  };

  // Calculate reading time
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const text = (
      article.title +
      " " +
      article.description +
      " " +
      article.content
    ).trim();
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  // Check if article is recent (trending)
  const isRecent = () => {
    const articleDate = new Date(article.publishedAt);
    const now = new Date();
    const hoursDiff = (now - articleDate) / (1000 * 60 * 60);
    return hoursDiff < 6;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-800">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.urlToImage || "https://placehold.co/600x400"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400";
            }}
          />

          {/* Trending Badge */}
          {isRecent() && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 left-3"
            >
              <span className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                🔥 TRENDING
              </span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleBookmark}
              className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:scale-110 transition-transform backdrop-blur-sm"
            >
              {isBookmarked ? (
                <FaBookmark className="text-rose-500" size={18} />
              ) : (
                <FiBookmark
                  className="text-gray-700 dark:text-gray-300"
                  size={18}
                />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Source & Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-rose-500 font-semibold">
              {article.source.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(article.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-rose-500 transition-colors cursor-pointer">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {article.description || "No description available."}
          </p>

          {/* Reading Time */}
          <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
            <FiClock size={14} />
            <span>{calculateReadingTime()} min read</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium text-sm transition-colors"
            >
              <FiEye size={16} />
              Preview
            </button>

            <div className="flex items-center gap-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium text-sm transition-colors"
              >
                Read More
                <FiExternalLink size={16} />
              </a>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      url: article.url,
                    });
                  }
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <FiShare2
                  className="text-gray-600 dark:text-gray-400"
                  size={18}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Preview Modal */}
      <AnimatePresence>
        {showModal && (
          <ArticleModal article={article} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Article Preview Modal Component
const ArticleModal = ({ article, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
      >
        {/* Header Image */}
        {article.urlToImage && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:scale-110 transition-transform backdrop-blur-sm"
            >
              <FiExternalLink
                className="text-gray-700 dark:text-gray-300"
                size={20}
              />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Source */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-sm font-semibold rounded-full">
              {article.source.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h2>

          {/* Author */}
          {article.author && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              By {article.author}
            </p>
          )}

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {article.description}
          </p>

          {/* Content */}
          {article.content && (
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {article.content}
            </p>
          )}

          {/* Read Full Article Button */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30"
          >
            Read Full Article
            <FiExternalLink size={18} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsCard;
