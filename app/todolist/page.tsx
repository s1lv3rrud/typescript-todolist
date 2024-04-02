import React, { useState } from "react";
import Link from "next/link";

interface ToDo {
  task_id: number;
  task_content: string;
  task_date: string;
  completed?: boolean;
}

export const ToDoList = () => {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [text, setText] = useState("");

  const addToDo = () => {
    const newToDo: ToDo = {
      task_id: Date.now(),
      task_content: text,
      task_date: "",
      completed: false,
    };
    setToDos([...toDos, newToDo]);
    setText("");
  };

  const toggleToDo = (id: number) => {
    setToDos(
      toDos.map((todo) =>
        todo.task_id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="bg-blue-100 mt-4 max-w-xl mx-auto shadow-lg p-4 rounded-lg">
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 focus:border-blue-500 px-4 py-2 mr-4"
        />
        <button
          onClick={addToDo}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2"
        >
          Add
        </button>
      </div>{" "}
      <ul className="text-blue-900 divide-y divide-blue-200">
        {toDos.map((todo) => (
          <li
            key={todo.task_id}
            onClick={() => toggleToDo(todo.task_id)}
            className="py-2"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.task_content}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center items-center">
        <Link href="/join" legacyBehavior>
          <a className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2">
            Join
          </a>
        </Link>
      </div>
    </div>
  );
};
