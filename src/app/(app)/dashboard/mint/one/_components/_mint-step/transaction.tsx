"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMintOneContext } from "../../_context";

interface Task {
  id: number;
  title: string;
  status: "todo" | "in-progress" | "completed";
}

const initialTasks: Task[] = [
  { id: 1, title: "Validate Data", status: "todo" },
  { id: 2, title: "Create Transaction", status: "todo" },
  { id: 3, title: "Watting User Sign Transaction", status: "todo" },
  { id: 4, title: "Summit Transaction", status: "todo" },
];

export default function TransactionStep() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { stepper } = useMintOneContext();

  useEffect(() => {
    const updateTaskStatus = (taskId: number) => {
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === taskId) {
            if (task.status === "todo") {
              return { ...task, status: "in-progress" };
            }
            if (task.status === "in-progress") {
              return { ...task, status: "completed" };
            }
          }
          return task;
        });
      });
    };

    const updateTasksSequentially = () => {
      for (let i = 0; i < tasks.length; i++) {
        setTimeout(() => {
          updateTaskStatus(tasks[i].id);
        }, 2000 * i);
      }
    };

    updateTasksSequentially();
  }, [tasks]);

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <ul className="space-y-4">
          {tasks.map((task) => {
            // if (task.status === "todo") return null;

            return (
              <li
                key={task.id}
                className="flex items-center space-x-3 p-3 rounded-md"
                style={{ animation: "fadeIn 0.5s ease-out" }}
              >
                {task.status != "completed" ? (
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span className="flex-1">{task.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="secondary"
          onClick={stepper.prev}
          disabled={stepper.isFirst}
        >
          Back
        </Button>
        <Button onClick={() => stepper.next()}>Next</Button>
      </div>
    </div>
  );
}
