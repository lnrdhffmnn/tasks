import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { FormEvent, useEffect, useRef, useState } from "react";
import { userAtom } from "../atoms/user";
import Card from "../components/card";
import { db } from "../lib/firebase";
import { Task } from "../types";
import { z } from "zod";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import userSvg from "../assets/user.svg";
import UserIcon from "../components/user-icon";

export default function Home() {
  const [taskContent, setTaskContent] = useState("");
  const [taskList, setTaskList] = useState<z.infer<typeof Task>[]>([]);
  const [removeCompletedVisible, setRemoveCompletedVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const taskContentInputRef = useRef<HTMLInputElement>(null);

  const user = useAtomValue(userAtom);

  const userDocRef = doc(db, "users", user?.uid!);

  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, doc =>
      setTaskList(Task.array().parse(doc.get("tasks") ?? []))
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      return;
    }

    setDoc(userDocRef, {
      tasks: taskList,
    });
  }, [taskList]);

  useEffect(() => {
    setRemoveCompletedVisible(taskList.some(task => task.completed));
  }, [taskList]);

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskContent) {
      taskContentInputRef.current?.focus();
      return;
    }

    const task = Task.parse({
      content: taskContent,
    });
    setTaskList(_taskList => [task, ..._taskList]);
    setTaskContent("");
  }

  function removeTask(task: z.infer<typeof Task>) {
    setTaskList(_taskList => _taskList.filter(_task => _task !== task));
  }

  function updateTaskStatus(task: z.infer<typeof Task>) {
    setTaskList(_taskList =>
      _taskList.map(_task => {
        if (_task === task) {
          _task.completed = !_task.completed;
        }

        return _task;
      })
    );
  }

  function removeCompletedTasks() {
    setTaskList(_taskList => _taskList.filter(task => !task.completed));
  }

  return (
    <>
      <Link
        to={routes.settings.href}
        className="fixed top-0 right-0 mx-6 my-10 md:m-6"
        title={user?.displayName!}
      >
        {user?.photoURL ? (
          <img
            src={user?.photoURL}
            alt={user?.displayName!}
            width={40}
            height={40}
            draggable={false}
            className="rounded-full"
          />
        ) : (
          <UserIcon size={40} />
        )}
      </Link>
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
          className="w-full md:w-fit px-8 py-2 bg-sky-500 dark:bg-sky-600 text-white font-bold rounded-md shadow-md hover:bg-sky-600 dark:hover:bg-sky-700 transition-colors"
        >
          Add
        </button>
      </form>
      <div className="w-full flex flex-col gap-4">
        <AnimatePresence>
          {taskList.map((task, index) => (
            <Card
              key={index}
              task={task}
              removeTask={removeTask}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {removeCompletedVisible && (
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
