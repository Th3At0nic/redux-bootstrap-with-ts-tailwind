export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: "High" | "Medium" | "Low";
}

export interface IInitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}
