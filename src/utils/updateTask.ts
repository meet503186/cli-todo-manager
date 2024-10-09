import { FILE_PATH } from "..";
import { ITask } from "../interface/task.interface";
import getTask from "./getTask";
import { writeFileSync } from "fs";

export default function updateTask(id: number, updatedTask: ITask) {
  try {
    const tasks: ITask[] = getTask();

    writeFileSync(
      FILE_PATH,
      JSON.stringify(
        tasks.map((task: ITask, index: number) => {
          if (index === id) {
            return {
              ...task,
              ...updatedTask,
            };
          }
          return task;
        })
      )
    );

    console.log(`Task "${id}" updated`);
  } catch (error) {
    console.log(error);
  }
}
