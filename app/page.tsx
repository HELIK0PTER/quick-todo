"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import {toast, Toaster} from "sonner"

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = (e : React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
      saveTasks(updatedTasks);
      setNewTask('');
      toast("Tâche ajoutée", {className: "bg-green-500 text-white"});
    }
  };

  const toggleTask = (id : number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
    toast("Tâche mise à jour");
  };

  const deleteTask = (id : number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
    toast("Tâche supprimée", {className: "bg-red-500 text-white"});
  };

  return (
    <div className="max-w-md mx-4 sm:mx-auto p-6 mt-14 rounded-lg shadow-lg bg-slate-500">
      <h1 className="text-2xl font-bold mb-4 text-center">{`Ma Todo List`}</h1>

      <form id={`task_form`} name={`tasks form`} onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          name={`task`}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nouvelle tâche..."
          className="flex-1 p-2 border rounded bg-slate-300 placeholder:text-gray-600"
        />
        <button name={`add`} type={"submit"} className="p-2 bg-blue-500 text-white ring-gray-300 ring-1 rounded hover:bg-blue-600">
          <Plus size={20} className={`sm:hidden`} />
          <div className="hidden sm:block">Ajouter</div>
        </button>
      </form>

      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id}
               className="flex items-center justify-between p-2 border rounded bg-slate-200 hover:bg-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleTask(task.id)}
                className={`p-1 rounded ${task.completed ? 'bg-green-300' : 'bg-slate-300'}`}
              >
                <Check size={16} className={task.completed ? 'text-green-600' : 'text-gray-400'} />
              </button>
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-1 text-red-600 hover:bg-red-300 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <Toaster position={"top-right"} />
    </div>
  );
};

export default TodoApp;