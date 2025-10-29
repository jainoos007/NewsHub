import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <FiAlertCircle className="text-red-500" size={32} />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Oops! Something went wrong
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {message ||
          "Failed to fetch news. Please check your API key or try again later."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full transition-colors shadow-lg shadow-rose-500/30"
        >
          <FiRefreshCw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
