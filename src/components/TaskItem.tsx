import { useState } from "react";
import type { Todo } from "../types";
import { Check, CheckSquare, Edit, XCircle } from "lucide-react";

interface IProps {
  info: Todo;
  onDelte: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onToggleComplete: (id: number) => void
}
const TaskItem = ({ info, onDelte, onEdit, onToggleComplete }: IProps) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(info.text);
  const handleSave = () => {
    if (value.trim().length === 0) return;
    onEdit(info.id, value);
    setEdit(false);
  };
  console.log("Render");
  

  return (
    <div className={`border py-2 p-3 w-full flex items-center justify-between cursor-pointer rounded ${info.completed && "bg-green-600"}`}>
      {edit ? (
        <input
          type="text"
          className="border max-[80px] py-2 px-1 rounded w-full mr-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <span >{info.text}</span>
      )}
      <div className="flex gap-1">
        {edit ? (
          <Check onClick={handleSave} className="cursor-pointer" />
        ) : (
          <Edit onClick={() => setEdit(true)} />
        )}
        <CheckSquare onClick={() => onToggleComplete(info.id)}/>
        <XCircle onClick={() => onDelte(info.id)} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default TaskItem;
