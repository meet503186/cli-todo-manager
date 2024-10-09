import { FILE_PATH } from "..";
import { ITask } from "../interface/task.interface";
import getTask from "./getTask";
import { writeFileSync } from "fs";

export default function deleteTask(id: number) {
  try {
    const tasks: ITask[] = getTask();

    const deletedTask = tasks[id];

    writeFileSync(
      FILE_PATH,
      JSON.stringify(tasks.filter((_: any, index: number) => index !== id))
    );

    console.log(`Task "${deletedTask.name}" deleted`);
  } catch (error) {
    console.log(error);
  }
}
