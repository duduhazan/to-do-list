import axios from "axios";

const serverUrl = "http://localhost:3500";

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
