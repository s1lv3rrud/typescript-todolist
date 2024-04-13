import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ToDo {
  task_id: number;
  task_content: string;
  task_date: string;
  completed?: boolean;
  editing?: boolean;
}

export const ToDoList = () => {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [text, setText] = useState("");

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

  useEffect(() => {
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

  const deleteToDo = async (id: number) => {
    try {
      const response = await fetch(`/api/delTask?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Deleting task failed:", error);
    }
    setToDos(toDos.filter((todo) => todo.task_id !== id).map((todo) => todo));
  };

  const modifyToDo = async (id: number, newContent: string) => {
    try {
      const response = await fetch(`/api/modTask?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_content: newContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to modify task.");
      }
    } catch (error) {
      console.error("Modifying task failed:", error);
    }
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
            className="py-2 flex justify-between items-center"
          >
            {todo.editing ? (
              <input
                type="text"
                value={todo.task_content}
                onChange={(e) => {
                  const updatedToDos = toDos.map((item) =>
                    item.task_id === todo.task_id
                      ? { ...item, task_content: e.target.value }
                      : item
                  );
                  setToDos(updatedToDos);
                }}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.task_content}
              </span>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => deleteToDo(todo.task_id)}
                className="text-red-500"
              >
                삭제
              </button>
              <button
                onClick={() => {
                  if (todo.editing) {
                    modifyToDo(todo.task_id, todo.task_content);
                  }
                  const updatedToDos = toDos.map((item) =>
                    item.task_id === todo.task_id
                      ? { ...item, editing: !item.editing }
                      : item
                  );
                  setToDos(updatedToDos);
                }}
                className="text-green-500"
              >
                {todo.editing ? "저장" : "수정"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center items-center space-x-4">
        <Link href="/login" legacyBehavior>
          <a className="inline-block text-blue-700 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2">
            Login
          </a>
        </Link>
        <Link href="/join" legacyBehavior>
          <a className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2">
            Join
          </a>
        </Link>
      </div>
    </div>
  );
};
