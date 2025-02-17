import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectTasks, updateFilter } from "@/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

function Tasks() {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  const handleFilterTab = (value: "all" | "high" | "medium" | "low") => {
    dispatch(updateFilter(value));
  };

  return (
    <div>
      <div className="flex justify-between ml-auto mr-auto mt-5 w-10/12 gap-5 items-center">
        <h1>Tasks</h1>
        <Tabs defaultValue="all" className="ml-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger onClick={() => handleFilterTab("all")} value="all">
              All
            </TabsTrigger>
            <TabsTrigger onClick={() => handleFilterTab("high")} value="high">
              High
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleFilterTab("medium")}
              value="medium"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger onClick={() => handleFilterTab("low")} value="low">
              Low
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <AddTaskModal />
      </div>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}

export default Tasks;
