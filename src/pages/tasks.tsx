import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { selectTasks } from "@/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";

function Tasks() {
  const tasks = useAppSelector(selectTasks);

  return (
    <div>
      <div className="flex justify-between ml-auto mr-auto mt-5 w-10/12 items-center">
        <h1>Tasks</h1>
        <AddTaskModal />
      </div>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}

export default Tasks;
