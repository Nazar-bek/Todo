import React, { useState, type FormEvent } from "react";
import type { Todo } from "./types";
import TaskItem from "./components/TaskItem";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = e.currentTarget.input.value;
    if (text.trim().length === 0) return;

    const newTodo: Todo = { text, id: Date.now() };
    setTodos((prev) => [...prev, newTodo]);

    e.currentTarget.reset();
  };

  const onDelete = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  console.log(todos);
  console.log("rerender");
  
  return (
    <div className="container max-w-[1170px] mx-auto">
      <div className="flex items-center justify-center mt-20">
        <div>
          <h1 className="text-center font-bold">Todo List</h1>
          <form onSubmit={onSubmit}>
            <div className="flex mt-2 gap-2">
              <input
                name="input"
                className="border px-2 py-2 rounded"
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
              <TaskItem key={item.id} info={item} onDelte={onDelete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
