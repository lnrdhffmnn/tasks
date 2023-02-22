import { motion } from "framer-motion";

export default function BackToTop() {
  return (
    <motion.button
      onClick={() => scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      className="fixed bottom-0 right-0 z-10 bg-zinc-200 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 rounded-full p-3 md:p-2 m-6 shadow-sm"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </motion.button>
  );
}
