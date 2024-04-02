"use client";
import React from "react";
import { ToDoList } from "./todolist/page";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">'s todolist</h1>
      <ToDoList />
    </div>
  );
}
