import mongoose from "mongoose";

const task = mongoose.Schema({
    name: String,
    destinationDate: Number,
    date: Number,
});

const taskModel = mongoose.model("Task", task);

export default taskModel;
