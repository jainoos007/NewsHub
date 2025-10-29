import NewsCard from "./NewsCard";
import { motion } from "framer-motion";

const NewsGrid = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <span className="text-6xl mb-4">📰</span>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try a different search or category
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <NewsCard article={article} />
        </motion.div>
      ))}
    </div>
  );
};

export default NewsGrid;
