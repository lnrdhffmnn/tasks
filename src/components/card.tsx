import { Task } from "../types";
import { motion } from "framer-motion";
import { z } from "zod";

interface Props {
  task: z.infer<typeof Task>;
  removeTask: (task: z.infer<typeof Task>) => void;
  updateTaskStatus: (task: z.infer<typeof Task>) => void;
}

export default function Card({ task, removeTask, updateTaskStatus }: Props) {
  return (
    <motion.div
      className="w-full flex justify-between bg-white dark:bg-black p-4 rounded-md shadow-sm border border-zinc-200 dark:border-zinc-700"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.15,
      }}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => updateTaskStatus(task)}
        />
        <span
          className={`transition-opacity ${
            task.completed ? "line-through opacity-50" : ""
          }`}
        >
          {task.content}
        </span>
      </div>
      <button onClick={() => removeTask(task)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </motion.div>
  );
}
