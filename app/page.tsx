"use client";
import React, { useState, useEffect } from "react";
import { ToDoList } from "./todolist/page";

export default function Home() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);
  return (
    <div className="container mx-auto">
      <h1 className="text-white text-4xl font-bold text-center my-8">
        {nickname}'s todolist
      </h1>
      <ToDoList />
    </div>
  );
}
