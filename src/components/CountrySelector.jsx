import { useState } from "react";
import { FiGlobe, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const CountrySelector = ({ selectedCountry, onCountryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const countries = [
    { code: "us", name: "United States", flag: "🇺🇸" },
    { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
    { code: "in", name: "India", flag: "🇮🇳" },
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "ae", name: "UAE", flag: "🇦🇪" },
  ];

  const selected =
    countries.find((c) => c.code === selectedCountry) || countries[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <FiGlobe className="text-gray-600 dark:text-gray-300" size={18} />
        <span className="text-2xl">{selected.flag}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
          {selected.name}
        </span>
        <FiChevronDown
          className={`text-gray-600 dark:text-gray-300 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          size={16}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  onCountryChange(country.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedCountry === country.code
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }`}
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {country.name}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-40" />
      )}
    </div>
  );
};

export default CountrySelector;
