import { readFileSync, existsSync } from "fs";
const path = require("path");

export default function getTask() {
  try {
    const filePath = path.join(process.cwd(), "tasks.json");

    if (!existsSync(filePath)) {
      return [];
    }

    return (
      JSON.parse(
        readFileSync(filePath, {
          encoding: "utf-8",
        })
      ) || []
    );
  } catch (error) {
    console.log(error);
  }
}
