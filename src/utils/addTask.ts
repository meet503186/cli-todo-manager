import { readFileSync, stat, writeFileSync } from "fs";
import { ITask } from "../interface/task.interface";
import getTask from "./getTask";
import { FILE_PATH } from "..";
const path = require("path");

export default async function addTask({
  name,
  priority,
  status = "pending",
  timestamp = new Date(),
}: ITask) {
  try {
    const tasks = getTask();

    tasks.push({
      name,
      priority,
      timestamp,
      status,
    });

    writeFileSync(FILE_PATH, JSON.stringify(tasks));

    console.log(
      `Task "${name}" with priority "${priority}" and status "${status}" added.`
    );
  } catch (error) {
    console.log(error);
  }
}
