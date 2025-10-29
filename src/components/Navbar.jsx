import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BsBookmark, BsMoon, BsSun } from "react-icons/bs";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ darkMode, onToggleDarkMode, onSearch, onShowBookmarks }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Rose Theme */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 dark:from-rose-500 dark:to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <HiOutlineNewspaper className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent hidden sm:block">
              NewsHub
            </h1>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:block flex-1 max-w-xl">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Bookmarks Button */}
            <motion.button
              onClick={onShowBookmarks}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group"
              title="View Bookmarks"
            >
              <BsBookmark
                className="text-gray-700 dark:text-gray-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors"
                size={20}
              />
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={onToggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative overflow-hidden"
              title="Toggle Dark Mode"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BsSun className="text-amber-500" size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BsMoon className="text-gray-700" size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX
                      className="text-gray-700 dark:text-gray-400"
                      size={22}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu
                      className="text-gray-700 dark:text-gray-400"
                      size={22}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <SearchBar onSearch={onSearch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
