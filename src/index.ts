#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import getTask from "./utils/getTask";
import addTask from "./utils/addTask";
import { ITask } from "./interface/task.interface";
import updateTask from "./utils/updateTask";
import deleteTask from "./utils/deleteTask";
const path = require("path");

export const FILE_PATH = path.join(process.cwd(), "tasks.json");

(function () {
  try {
    const program = new Command();

    program.name("task").description("CLI to manage tasks").version("1.0.0");

    program
      .command("add")
      .description("Add a new task")
      .action(async () => {
        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "taskName",
            message: "What is the name of the task?",
          },
          {
            type: "list",
            name: "priority",
            message: "Select the priority of the task:",
            choices: ["Low", "Medium", "High"],
          },
        ]);

        addTask({ name: answers.taskName, priority: answers.priority });
      });

    program
      .command("list")
      .description("Get all tasks")
      .action(() => {
        const tasks = getTask();

        tasks.length && console.table(tasks);
      });

    program
      .command("delete <id>")
      .description("Delete a task by id (index)")
      .action(async (id) => {
        const answers = await inquirer.prompt([
          {
            type: "confirm",
            name: "yesDelete",
            message: "Do you really want to delete this task?",
          },
        ]);

        if (answers.yesDelete) {
          deleteTask(+id);
        }
      });

    program
      .command("update <id>")
      .description("Update a task by id (index)")
      .action(async (id) => {
        const task: ITask = getTask().find(
          (_: any, index: number) => +id === index
        );

        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Name of the task:",
            default: task.name,
          },
          {
            type: "list",
            name: "priority",
            message: "Priority of the task:",
            default: task.priority,
            choices: ["Low", "Medium", "High"],
          },
          {
            type: "list",
            name: "status",
            message: "Status of the task:",
            default: task.status,
            choices: ["pending", "progress", "completed"],
          },
        ]);

        updateTask(+id, answers);
      });

    program.parse(process.argv);

    process.on("uncaughtException", () => {
      process.exit(1);
    });
  } catch (error) {
    console.log(error);
  }
})();
