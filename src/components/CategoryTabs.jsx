import { motion } from "framer-motion";
import {
  HiOutlineNewspaper,
  HiOutlineDesktopComputer,
  HiOutlineBriefcase,
  HiOutlineFilm,
  HiOutlineHeart,
  HiOutlineBeaker,
} from "react-icons/hi";
import { IoFootball } from "react-icons/io5";

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "general", label: "General", Icon: HiOutlineNewspaper },
    { id: "technology", label: "Technology", Icon: HiOutlineDesktopComputer },
    { id: "business", label: "Business", Icon: HiOutlineBriefcase },
    { id: "sports", label: "Sports", Icon: IoFootball },
    { id: "entertainment", label: "Entertainment", Icon: HiOutlineFilm },
    { id: "health", label: "Health", Icon: HiOutlineHeart },
    { id: "science", label: "Science", Icon: HiOutlineBeaker },
  ];

  return (
    <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`relative px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
              isActive
                ? "text-white shadow-lg shadow-rose-500/30"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeCategory"
                className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <category.Icon
                size={18}
                className={isActive ? "text-white" : ""}
              />
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
