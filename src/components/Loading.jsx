import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full"
      />

      {/* Text */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-gray-600 dark:text-gray-400 font-medium"
      >
        Loading news...
      </motion.p>
    </div>
  );
};

export default Loading;
