import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md">
      <div className="relative">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FiX className="text-gray-500 dark:text-gray-400" size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
