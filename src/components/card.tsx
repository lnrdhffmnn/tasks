import { Task } from "../types";

interface Props {
  task: Task;
}

export default function Card({ task }: Props) {
  return (
    <div className="w-full flex gap-2 bg-white p-4 rounded-md shadow-sm border border-zinc-200">
      <input type="checkbox" checked={task.done} onChange={() => {}} />
      <span className={task.done ? "line-through opacity-50" : ""}>
        {task.content}
      </span>
    </div>
  );
}
