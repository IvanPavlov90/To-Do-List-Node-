const { Router } = require("express");
const router = Router();
const auth = require("../middleware/middleware.auth");
const logging = require("../middleware/middleware.log");
const validation = require("../middleware/middleware.validation");
const { Task } = require("../models/Task");
const { check } = require("express-validator");
const { getAllTasks, createTask, findTask, updateTask, markTask } = require("../service/task");
const { findCategory } = require("../service/Category");

router.get("/tasks", logging.log, auth, async (request, response) => {
  try {
    const tasksDB = await getAllTasks();
    response.json({ tasksDB: tasksDB });
  } catch (e) {
    logging.errorLog("Unexpected error", e.message);
    response
      .status(500)
      .json({ message: "Something goes wrong! Please try again later." });
  }
});

router.post(
  "/add/task",
  logging.log,
  auth,
  [
    check(
      "header",
      "Task header cant be empty"
    ).isLength({ min: 1 }),
  ],
  validation.validate,
  async (request, response) => {
    try {
      const category = await findCategory(request.body.category_id);
      if (!category) {
        logging.errorLog(
          "Database error",
          "Can't find such category, maybe it's wrong id."
        );
        response.status(404).json({ message: "Can't find such category" });
        return;
      }

      const task = createTask(request.body.header, request.body.category_id);
      const result = await task.save();
      if (result) {
        response.status(201).json({ task_id: task._id });
      }
    } catch (e) {
      logging.errorLog("Unexpected error", e.message);
      response
        .status(500)
        .json({ message: "Something goes wrong! Please try again later." });
    }
  }
);

router.post(
  "/edit/task/:categoryid/:taskid",
  logging.log,
  auth,
  [
    check(
      "header",
      "Task header cant be empty"
    ).isLength({ min: 1 }),
  ],
  validation.validate,
  async (request, response) => {
    try {
      const category = await findCategory(request.params.categoryid);
      if (!category) {
        logging.errorLog(
          "Database error",
          "Can't find such category, maybe it's wrong id."
        );
        response.status(404).json({ message: "Can't find such category" });
        return;
      }

      const task = await findTask(request.params.taskid);
      if (task) {
        const updatedTask = await updateTask(
          request.params.taskid,
          request.body.header,
          request.params.categoryid,
          request.body.isDone,
          request.body.description
        );
        if (updatedTask) {
          response.status(200).json({ message: "Succesfully updated." });
        } else {
          logging.errorLog("Database error", "Can't update category");
          response.status(404).json({ message: "Not vaild data" });
        }
      } else {
        logging.errorLog("Database error", "Can't find task by id");
        response.status(404).json({ message: "Not vaild data" });
      }
    } catch (e) {
      logging.errorLog("Unexpected error", e.message);
      response
        .status(500)
        .json({ message: "Something goes wrong! Please try again later." });
    }
  }
);

router.post(
  "/edit/mark_task_done/:id",
  logging.log,
  auth,
  async (request, response) => {
    try {
      const task = await findTask(request.params.id);

      if (task) {
        const category = await findCategory(task.category_id);
        if (!category) {
          logging.errorLog(
            "Database error",
            "Can't find such category, maybe it's wrong id."
          );
          response.status(404).json({ message: "Can't find such category" });
          return;
        }

        const markedTask = await markTask(request.params.id, request.body.isDone);
        if (markedTask) {
          response.status(200).json({ message: "Succesfully updated!" });
        } else {
          logging.errorLog("Database error", "Can't update task");
          response.status(404).json({ message: "Not vaild data" });
        }
      } else {
        logging.errorLog("Database error", "Can't find task by id");
        response.status(404).json({ message: "Not vaild data" });
      }
    } catch (e) {
      logging.errorLog("Unexpected error", e.message);
      response
        .status(500)
        .json({ message: "Something goes wrong! Please try again later." });
    }
  }
);

module.exports = router;
