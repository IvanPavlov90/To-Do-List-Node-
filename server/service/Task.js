const { Task } = require("../models/Task");
const mongoose = require("mongoose");

module.exports = {
  createTask: (header, category_id) => {
    const taskId = mongoose.Types.ObjectId();
    const task = new Task({
        _id: taskId,
        header: header,
        category_id: category_id,
        isDone: false,
        description: "",
        data: new Date(),
      });

    return task;
  },
  deleteTasks: async (id) => {
    return await Task.deleteMany({ category_id: id });
  },
  findTask: async (id) => {
    return await Task.findById({ _id: id });
  },
  findTasks: async (id) => {
    return await Task.find({ category_id: id });
  },
  getAllTasks: async () => {
    return await Task.find().sort({
      data: -1,
    });
  },
  markTask: async (id, isDone) => {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { isDone },
      { new: true }
    );

    if (task) {
      return true;
    }

    return false;
  },
  updateTask: async (id, header, category_id, isDone, description) => {
    const task = await Task.findOneAndUpdate(
        { _id: id },
        { header, category_id, isDone, description },
        { new: true }
      );
  
      if (task) {
        return true;
      }
  
      return false;
  }
};
