const config = require('./config.json');
//
/* class tasks1 {
  constructor(id,name,date) {
    this.id = id;
    this.name = name;
    this.date = date;
  }
} */
//
let tasks = [
    // { id: 1, name: "throw garbage", date: "03/03/2000"},
    { id: 1, name: "throw garbage", date: new Date("3/3/2000"), destinationDate: new Date("4/4/2000")},
    { id: 2, name: "go to the bank", date: new Date("3/25/2020"), destinationDate: new Date("4/4/2000")},
    { id: 3, name: "clean dishes", date: new Date("3/3/2000"), destinationDate: new Date("4/4/2000")}
]; 
//
exports.deleteTask = function (id) {
  let deletedCount = 0;
  tasks = tasks.filter((u) => {
    deletedCount += u.id == Number(id) ? 1 : 0;
    return u.id != Number(id);
  });
  return deletedCount;
};
//
exports.getTasks = function () {
  return [...tasks];
};

//
exports.getTaskByID = function (id) {
  return tasks.find((u) => u.id === Number(id));
};
//
exports.updateTask = function (updatedTask) {
  if (updatedTask && updatedTask.name) {
    let existingTask = tasks.find((t) => t.name == updatedTask.name);
    if (existingTask) throw Error("name allready exists");
    else {
  for (let index = 0; index < tasks.length + 1; index++) {
    if (tasks[index].id == updatedTask.id) {
      updatedTask.date = new Date();
      tasks[index] = { ...updatedTask };
      return updatedTask;
    }
  }
  return null;
  }
  } else throw Error("invalid task data");
};
//
exports.addTask = function (newTask) {
  if (newTask && newTask.name && newTask.destinationDate) {
    let existingTask = tasks.find((t) => t.name == newTask.name);
    if (existingTask) throw Error("name allready exists");
    else {
      newTask.id = getNewTaskID();
      newTask.date = new Date();
      newTask.destinationDate = new Date(newTask.destinationDate)
      tasks.push(newTask);
      console.log(tasks);
      return newTask;
    }
  } else throw Error("invalid task data");
};
//
exports.deleteAll = function () {
  return tasks = [];
} 
//
exports.authenticate = function (email, password) {
  return email == config.administrator && password == config.password;
};
//
function getNewTaskID() {
  if (!tasks || tasks.length == 0) return 1;
  else return tasks[tasks.length - 1].id + 1;
}
