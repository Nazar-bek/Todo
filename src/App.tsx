import { useState, type FormEvent } from "react";
import type { Todo } from "./types";
import TaskItem from "./components/TaskItem";
import { toast } from "sonner";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = e.currentTarget.input.value;
    if (text.trim().length === 0) return;

    const newTodo: Todo = { text, id: Date.now() };
    setTodos((prev) => [...prev, newTodo]);
    toast.success(`${text} is added successfully!`)
    e.currentTarget.reset();
  };

  const onDelete = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
    toast.error("The Todo is Deleted!")
  };
  console.log(todos);
  console.log("rerender");

  const onEdit = (id: number, newText: string) => {
    setTodos((prev) =>(
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    )
    );
    toast.success("Task updated!");
  };

  const onToggleCompleted = (id: number) => {
    setTodos((prev) => 
    prev.map(item => 
      item.id === id ? {...item, completed: !item.completed} : item
    ))
    toast.success("Task status changed!");
  }

  return (
    <div>
      <div className="container max-w-[1170px] mx-auto flex items-center justify-center">
      <div className="flex  justify-center mt-20 border w-[600px] py-5 px-7 rounded min-h-[400px]">
        <div className="flex flex-col justify-start w-full">
          <h1 className="text-center font-bold">Todo List</h1>
          <form onSubmit={onSubmit}>
            <div className="flex mt-2 gap-2">
              <input
                name="input"
                className="border px-2 py-2 rounded w-full"
                type="text"
                placeholder="Add Item"
              />
              <button
                type="submit"
                className="border rounded px-2 cursor-pointer"
              >
                Add
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-3 mt-2">
            {todos.map((item) => (
              <TaskItem
              onToggleComplete={onToggleCompleted}
                onEdit={onEdit}
                key={item.id}
                info={item}
                onDelte={onDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
