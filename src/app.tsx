import { useAtom } from "jotai";
import { FormEvent, useState } from "react";
import { taskAtom } from "./atoms/task";
import Card from "./components/card";
import { Task } from "./types";

export default function App() {
  const [taskContent, setTaskContent] = useState("");

  const [taskList, setTaskList] = useAtom(taskAtom);

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskContent) return;

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

  return (
    <div className="min-w-full min-h-screen px-6 py-10 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white flex">
      <div className="flex-grow md:max-w-[800px] mx-auto flex flex-col gap-8 relativ bg-inherit">
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
          />
          <button
            type="submit"
            className="w-full md:w-fit px-8 py-2 bg-sky-500 dark:bg-sky-600 text-white font-bold rounded-md shadow-sm"
          >
            Add
          </button>
        </form>
        <div className="w-full flex flex-col gap-4">
          {taskList.map(task => (
            <Card
              key={task.id}
              task={task}
              removeTask={removeTask}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
