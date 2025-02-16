// import { useState } from "react";
import { cn } from "@/lib/utils";
import { ITask } from "@/types";
import { Trash2 } from "lucide-react";

interface IProps {
  task: ITask;
}

const TaskCard = ({ task }: IProps) => {
  // const [completed, setCompleted] = useState(false);

  // const handleToggle = () => {
  //   setCompleted(!completed);
  //   onToggle(!completed);
  // };

  return (
    <div className="flex items-center justify-between w-10/12  p-5 m-5 ml-auto mr-auto  shadow-md rounded-lg border border-gray-200">
      <div
        className={cn(
          "w-6 h-6 bg-blue-500 rounded-full",

          {
            "bg-green-500": task.priority === "Low",
            "bg-yellow-500": task.priority === "Medium",
            "bg-red-500": task.priority === "High",
          }
        )}
      ></div>
      {/* Middle Section - Title & Description */}
      <div className="flex-1 ml-4">
        <h3 className={`text-lg font-semibold `}>{task.title}</h3>
        <p className={`text-sm `}>{task.description}</p>
      </div>

      {/* Left Section - Checkbox */}
      <input
        type="checkbox"
        // checked={completed}
        // onChange={handleToggle}
        className="w-5 h-5 text-blue-500 border-gray-300 mr-5 rounded focus:ring-2 focus:ring-blue-400"
      />

      {/* Right Section - Delete Button */}
      <button
        // onClick={onDelete}
        className="text-red-500 hover:text-red-700 p-2 rounded-md transition"
        aria-label="Delete Task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskCard;
