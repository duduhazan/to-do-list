import mongoose from "mongoose";

const task = mongoose.Schema({
  name: String,
  destinationDate: Number,
  date: Number,
  userId: String,
});

const taskModel = mongoose.model("Task", task);

export default taskModel;
