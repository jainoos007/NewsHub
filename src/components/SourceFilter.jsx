import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";

const SourceFilter = ({ selectedSources, onSourceChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sources = [
    {
      id: "bbc-news",
      name: "BBC News",
      logo: "https://logo.clearbit.com/bbc.com",
    },
    { id: "cnn", name: "CNN", logo: "https://logo.clearbit.com/cnn.com" },
    {
      id: "reuters",
      name: "Reuters",
      logo: "https://logo.clearbit.com/reuters.com",
    },
    {
      id: "techcrunch",
      name: "TechCrunch",
      logo: "https://logo.clearbit.com/techcrunch.com",
    },
    {
      id: "the-verge",
      name: "The Verge",
      logo: "https://logo.clearbit.com/theverge.com",
    },
    {
      id: "bloomberg",
      name: "Bloomberg",
      logo: "https://logo.clearbit.com/bloomberg.com",
    },
    { id: "espn", name: "ESPN", logo: "https://logo.clearbit.com/espn.com" },
    { id: "wired", name: "Wired", logo: "https://logo.clearbit.com/wired.com" },
    {
      id: "ars-technica",
      name: "Ars Technica",
      logo: "https://logo.clearbit.com/arstechnica.com",
    },
    {
      id: "the-wall-street-journal",
      name: "Wall Street Journal",
      logo: "https://logo.clearbit.com/wsj.com",
    },
  ];

  const toggleSource = (sourceId) => {
    if (selectedSources.includes(sourceId)) {
      onSourceChange(selectedSources.filter((id) => id !== sourceId));
    } else {
      onSourceChange([...selectedSources, sourceId]);
    }
  };

  const clearAll = () => {
    onSourceChange([]);
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <FiFilter className="text-gray-600 dark:text-gray-300" size={18} />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sources
        </span>
        {selectedSources.length > 0 && (
          <span className="px-2 py-0.5 bg-rose-500 text-white text-xs rounded-full">
            {selectedSources.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Filter by Source
              </h3>
              {selectedSources.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-rose-500 hover:text-rose-600 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Sources List */}
            <div className="max-h-96 overflow-y-auto p-2">
              {sources.map((source) => {
                const isSelected = selectedSources.includes(source.id);
                return (
                  <button
                    key={source.id}
                    onClick={() => toggleSource(source.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      isSelected ? "bg-rose-50 dark:bg-rose-900/20" : ""
                    }`}
                  >
                    {/* Logo Image */}
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                      <img
                        src={source.logo}
                        alt={source.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `<span class="text-sm font-bold text-gray-700">${source.name[0]}</span>`;
                        }}
                      />
                    </div>

                    <span className="flex-1 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      {source.name}
                    </span>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />
        </>
      )}
    </div>
  );
};

export default SourceFilter;
