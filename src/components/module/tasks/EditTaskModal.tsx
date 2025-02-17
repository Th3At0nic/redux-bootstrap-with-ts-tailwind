/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { CalendarIcon, Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateTask } from "@/features/task/taskSlice";
import { ITask } from "@/types";
import { selectUser } from "@/features/user/userSlice";

export function EditTaskModal({ task }: { task: ITask }) {
  const form = useForm();

  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUser);

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    dispatch(
      updateTask({
        id: task.id, // Keep the same task ID
        isCompleted: task.isCompleted,
        title: data.title || task.title, // Keep existing title if empty
        description: data.description || task.description, // Keep existing description
        dueDate: data.dueDate || task.dueDate, // Keep existing date
        priority: data.priority || task.priority, // Keep existing priority
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="p-2 mr-5 text-green-500">
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <DialogDescription>Fill up this form to edit task</DialogDescription>
        <FormProvider {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? task.title} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? task.description}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>

                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? task.assignedTo}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={task.assignedTo ?? "Select User"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem value={user.id} key={user.id}>{user.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : task.dueDate ? (
                            format(new Date(task.dueDate), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        } // Ensure it's a Date
                        onSelect={(date) => field.onChange(date?.toISOString())} // Store as ISO string
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>

                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? task.priority}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={task.priority} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
