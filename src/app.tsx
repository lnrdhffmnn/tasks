import Card from "./components/card";
import { Task } from "./types";

export default function App() {
  const today = new Date().toDateString();

  const taskList: Task[] = [
    { id: 0, content: "Hello World", done: false },
    { id: 1, content: "Hello World", done: true },
    { id: 2, content: "Hello World", done: false },
  ];

  return (
    <div className="min-w-full min-h-screen p-10 flex flex-col gap-8 bg-zinc-100">
      <header className="md:text-center">
        <h1 className="text-4xl font-bold">Tasks</h1>
        <p>{today}</p>
      </header>
      <div className="w-full md:max-w-[800px] mx-auto flex flex-col gap-4">
        {taskList.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
