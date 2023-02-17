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

  return (
    <div className="min-w-full min-h-screen p-10 bg-zinc-100 flex">
      <div className="flex-grow md:max-w-[800px] mx-auto flex flex-col gap-8 relative">
        <header className="md:text-center">
          <h1 className="text-4xl font-bold">Tasks</h1>
          <p>{new Date().toDateString()}</p>
        </header>
        <form
          onSubmit={addTask}
          className="flex flex-col md:flex-row gap-4 sticky top-0 bg-zinc-100 py-4"
        >
          <input
            type="text"
            placeholder="Type something..."
            value={taskContent}
            onChange={event => setTaskContent(event.target.value)}
            className="w-full px-4 py-2 rounded-md shadow-sm border border-zinc-200 outline-none ring-sky-200 ring-opacity-50 focus:ring focus:border-sky-300"
          />
          <button
            type="submit"
            className="w-full md:w-fit px-8 py-2 bg-sky-500 text-white font-bold rounded-md shadow-sm border border-zinc-200"
          >
            Add
          </button>
        </form>
        <div className="w-full flex flex-col gap-4">
          {taskList.map(task => (
            <Card key={task.id} task={task} removeTask={removeTask} />
          ))}
        </div>
      </div>
    </div>
  );
}
