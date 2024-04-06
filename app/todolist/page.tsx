import React, { useEffect, useState } from "react";
import Link from "next/link";
import { todo } from "node:test";

interface ToDo {
  task_id: number;
  task_content: string;
  task_date: string;
  completed?: boolean;
}

export const ToDoList = () => {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const response = await fetch("/api/taskList");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }
        const data = await response.json();
        setToDos(data);
      } catch (error) {
        console.error("Fetching tasks failed:", error);
      }
    };

    fetchToDos();
  }, []); // 빈 의존성 배열: 컴포넌트 마운트 시에만 호출

  const addToDo = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_content: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task.");
      }

      const newTask = await response.json();

      setToDos((prevToDos) => [...prevToDos, newTask]);
      setText("");
    } catch (error) {
      console.error("Adding task failed:", error);
    }
  };

  const toggleToDo = async (id: number) => {
    const curTodo = toDos.find((curTodo) => curTodo.task_id === id);

    if (curTodo && !curTodo.completed) {
      try {
        const response = await fetch(`api/delTask?id=${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete task.");
        }
      } catch (error) {
        console.error("Deleting task failed:", error);
      }
    } else {
      try {
        const response = await fetch("/api/addTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_content: curTodo?.task_content,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create task.");
        }
      } catch (error) {
        console.error("Adding task failed:", error);
      }
    }
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
