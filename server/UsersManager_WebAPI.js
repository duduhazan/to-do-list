const express = require("express");
const { StatusCode } = require("status-code-enum");
const cors = require("cors");
const storage = require("./UsersManager_Storage");
const config = require('./config.json');
const app = express();
const port = config.httpPort;
//
app.use(cors());
app.use(express.json());
//
app.get("/", (req, res) => {
  let users = storage.getTasks();
  if (users) res.send(storage.getTasks());
  else res.status(StatusCode.ClientErrorNotFound).send();
});
// 
app.get("/:id", (req, res) => {
  let user = storage.getTaskByID(req.params.id);
  if (user) res.send(user);
  else res.status(StatusCode.ClientErrorNotFound).send();
});
//
app.delete("/:id", (req, res) => {
  if (storage.deleteTask(req.params.id) > 0)
    res.status(StatusCode.SuccessNoContent).send();
  else res.status(StatusCode.ClientErrorNotFound).send();
});
//
app.delete("/delete/all", (req, res) => {
  if (storage.deleteAll())
    res.status(StatusCode.SuccessNoContent).send();
  else res.status(StatusCode.ClientErrorNotFound).send();
});
//
app.post("/", (req, res) => {
  try {
    if (storage.addTask(req.body) != null)
      res.status(StatusCode.SuccessCreated).json(req.body);
    else throw Error("Error adding user :" + JSON.stringify(req.body));
  } catch (error) {
    console.error(error.message);
    res.status(StatusCode.ServerErrorInternal).json({ message: error.message });
  }
});
//
app.post("/authenticate", (req, res) => {
  try {
    let { email, password } = req.body;
    if (storage.authenticate(email, password))
      res.setHeader("Authorization", "bearer 1234abcd").send();
    else res.status(StatusCode.ClientErrorUnauthorized).send();
  } catch (error) {
    console.error(error.message);
    res.status(StatusCode.ServerErrorInternal).json({ message: error.message });
  }
});
app.put("/", (req, res) => {
  try {
    if (storage.updateTask(req.body) != null)
      res.status(StatusCode.SuccessNoContent).json(req.body);
    else
      res.status(StatusCode.ClientErrorNotFound).json({
        message:
          "Error updating user, user not found:" + JSON.stringify(req.body),
      });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCode.ServerErrorInternal).json({ message: error.message });
  }
});
//
app.listen(port, () => {
  console.log(`UsersManager_WebAPI is listening on port ${port}`);
});