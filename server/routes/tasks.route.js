import { Router } from "express";
import taskModel from "../schemas/tasks.schema";
import validateTask from "../validators/task.validator";
import StatusCode from "status-code-enum";

export const tasksRouter = () => {
  const router = Router();

  router.get("/tasks", async (req, res) => {
    try {
      const userId = req.user.id;
      const tasks = await taskModel.find({ userId });

      if (!tasks?.length) {
        return res.status(404).send("tasks not found in database");
      }

      res.json([...tasks]);
    } catch (error) {
      return res.status(500).send("internal error");
    }
  });

  router.get("/task/:name", async (req, res) => {
    try {
      const task = await taskModel.findOne({ name: req.params.name });

      if (!task) {
        return res.status(404).send("task not found in database");
      }

      res.json(task);
    } catch (error) {
      return res.status(500).send("internal error");
    }
  });

  router.post("/tasks", async (req, res) => {
    try {
      const newTask = {
        ...req.body,
        date: Math.floor(Date.now() / 1000),
        userId: req.user.id,
      };

      const result = validateTask(newTask);

      if (result.error) {
        return res.status(400).send(result.error.message);
      }
      const task = await new taskModel(newTask).save();

      res.status(200).json(task);
    } catch (error) {
      return res.status(500).send("internal error");
    }
  });

  router.put("/tasks/:name", async (req, res) => {
    try {
      const result = validateTask(req.body);

      if (result.error) {
        return res.status(201).send(result.error.message);
      }

      const filter = { name: req.params.name };
      const update = {
        ...req.body,
        date: Math.floor(Date.now() / 1000),
      };
      const opts = { new: true };

      const task = await taskModel.findOneAndUpdate(filter, update, opts);

      res.json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).send("internal error");
    }
  });

  router.delete("/tasks", async (req, res) => {
    try {
      const unDeletedTasks = [];
      const tasksToDelete = req.body;
      tasksToDelete.map(async (taskToDel) => {
        const task = await taskModel.deleteOne({
          name: taskToDel,
        });
        if (!task) {
          unDeletedTasks.push(taskToDel);
        }
      });
      if (unDeletedTasks.length == 0) {
        return res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("internal error");
    }
  });

  return router;
};
