import axios from "axios";

const { VITE_SERVER_URL: serverUrl } = import.meta.env;

console.log("using server url", serverUrl);
const client = axios.create({ baseURL: serverUrl, withCredentials: true });

export class Api {
  static async getTasks() {
    const { data } = await client.get("/tasks");
    return data;
  }

  static async getTaskByName(name) {
    const { data } = await client.get(`/task/${name}`);
    return data;
  }

  static async addTask(newTask) {
    const { data } = await client.post("/tasks", newTask);
    return data;
  }

  static async updateTask(newTask, oldTaskName) {
    const { data } = await client.put(`/tasks/${oldTaskName}`, newTask);
    return data;
  }
  static async deleteTasks(selectedTasks) {
    const { data } = await client.delete(`/tasks`, { data: selectedTasks });
    return data;
  }
}
