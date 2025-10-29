import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <FiHeart className="text-rose-500" size={16} />
            <span>by Mohammed Jainoos</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/jainoos007"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <FiGithub
                className="text-gray-700 dark:text-gray-300 group-hover:text-rose-500 transition-colors"
                size={20}
              />
            </a>
            <a
              href="https://linkedin.com/in/jainoos7979"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <FiLinkedin
                className="text-gray-700 dark:text-gray-300 group-hover:text-rose-500 transition-colors"
                size={20}
              />
            </a>
            <a
              href="mailto:ammjainoos@gmail.com"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <FiMail
                className="text-gray-700 dark:text-gray-300 group-hover:text-rose-500 transition-colors"
                size={20}
              />
            </a>
          </div>

          {/* Right */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Powered by{" "}
            <span className="font-semibold text-rose-500">NewsAPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
