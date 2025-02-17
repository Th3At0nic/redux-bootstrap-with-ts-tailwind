// import { useState } from "react";
import { deleteTask, toggleCompleteState } from "@/features/task/taskSlice";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ITask } from "@/types";
import { Trash2 } from "lucide-react";
import { EditTaskModal } from "./EditTaskModal";
import { selectUser } from "@/features/user/userSlice";

interface IProps {
  task: ITask;
}

const TaskCard = ({ task }: IProps) => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUser);

  const assignedUser = users.find((user) => user.id === task.assignedTo);

  return (
    <div className="flex items-center justify-between w-10/12  p-5 m-5 ml-auto mr-auto  shadow-md rounded-lg border border-gray-200">
      {/* Round ball shape icon */}
      <div
        className={cn(
          "w-6 h-6 bg-blue-500 rounded-full",

          {
            "bg-green-500": task.priority === "low",
            "bg-yellow-500": task.priority === "medium",
            "bg-red-500": task.priority === "high",
          }
        )}
      ></div>
      {/* Middle Section - Title & Description */}
      <div className="flex-1 ml-4">
        <h3
          className={cn(`text-lg font-semibold`, {
            "line-through": task.isCompleted,
          })}
        >
          {task.title}
        </h3>
        <p>Assigned To - {assignedUser ? assignedUser.name : "None"}</p>
        <p className={`text-sm `}>{task.description}</p>
      </div>

      {/* Edit Button */}

      <EditTaskModal task={task} />

      {/* Left Section - Checkbox */}
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => dispatch(toggleCompleteState(task.id))}
        className="w-5 h-5 text-blue-500 border-gray-300 mr-5 rounded focus:ring-2 focus:ring-blue-400"
      />

      {/* Right Section - Delete Button */}
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className="text-red-500 hover:text-red-700 p-2 rounded-md transition"
        aria-label="Delete Task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskCard;
