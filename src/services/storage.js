let tasks = [
  { id: 1, name: "throw garbage", date: "3/3/2000" },
  { id: 2, name: "go to the bank", date: "3/3/2000" },
  { id: 3, name: "clean dishes", date: "3/3/2000" },
];

export function deleteTask(id) {
  return fetch(`http://localhost:3500/tasks/${id}`, { method: "delete" });
}

export function deleteAll() {
  return fetch("http://localhost:3500/tasks", { method: "delete" });
}

export function getTasks() {
  return fetch("http://localhost:3500/tasks").then((res) => res.json());
}

export function getTaskByID(id) {
  return fetch(`http://localhost:3500/${id}`).then((res) => res.json());
}

export function addTask(newTask) {
  return fetch("http://localhost:3500/tasks", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
}

export function updateTask(newtask) {
  return fetch("http://localhost:3500/tasks", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newtask),
  });
}
