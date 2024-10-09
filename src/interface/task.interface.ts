export interface ITask {
  name: string;
  priority: string;
  timestamp?: Date;
  status?: "pending" | "progress" | "completed";
}
