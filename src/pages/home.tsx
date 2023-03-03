import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { FormEvent, useEffect, useRef, useState } from "react";
import { taskAtom } from "../atoms/task";
import Card from "../components/card";
import { Task } from "../types";

export default function Home() {
  const [taskContent, setTaskContent] = useState("");

  const [taskList, setTaskList] = useAtom(taskAtom);
  const [removeCompletedTasksVisible, setRemoveCompletedTasksVisible] =
    useState(false);

  const taskContentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRemoveCompletedTasksVisible(taskList.some(task => task.done));
  });

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskContent) {
      taskContentInputRef.current?.focus();
      return;
    }

    const task: Task = {
      id: Date.now(),
      content: taskContent,
      done: false,
    };
    setTaskList(_taskList => [task, ..._taskList]);
    setTaskContent("");
  }

  function removeTask(task: Task) {
    setTaskList(_taskList => _taskList.filter(_task => _task !== task));
  }

  function updateTaskStatus(task: Task) {
    setTaskList(_taskList =>
      _taskList.map(_task => {
        if (_task === task) {
          _task.done = !_task.done;
        }

        return _task;
      })
    );
  }

  function removeCompletedTasks() {
    setTaskList(_taskList => _taskList.filter(task => !task.done));
  }

  return (
    <>
      <header className="md:text-center">
        <h1 className="text-4xl font-bold">Tasks</h1>
        <p>{new Date().toDateString()}</p>
      </header>
      <form
        onSubmit={addTask}
        className="flex flex-col md:flex-row gap-2 sticky top-0 bg-inherit py-4"
      >
        <input
          type="text"
          placeholder="Type something..."
          value={taskContent}
          onChange={event => setTaskContent(event.target.value)}
          className="w-full px-4 py-2 rounded-md shadow-sm border border-zinc-200 dark:border-zinc-700 outline-none ring-sky-200 dark:ring-sky-400 ring-opacity-50 dark:ring-opacity-25 focus:ring focus:border-sky-300 dark:focus:border-sky-600 bg-white dark:bg-black"
          ref={taskContentInputRef}
        />
        <button
          type="submit"
          className="w-full md:w-fit px-8 py-2 bg-sky-500 dark:bg-sky-600 text-white font-bold rounded-md shadow-sm"
        >
          Add
        </button>
      </form>
      <div className="w-full flex flex-col gap-4">
        <AnimatePresence>
          {taskList.map(task => (
            <Card
              key={task.id}
              task={task}
              removeTask={removeTask}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {removeCompletedTasksVisible && (
          <motion.button
            onClick={removeCompletedTasks}
            className="w-full md:w-fit px-8 py-2 bg-red-500 dark:bg-red-600 text-white font-bold rounded-md shadow-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
          >
            Remove
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
