const { Router } = require("express");
const { check } = require("express-validator");
const { findsubCategoriesToDelete } = require("../utils/Helpers");
const {
  createCategory,
  createSubcategory,
  updateCategory,
  updateParentCategory,
  findCategory,
  deleteCategory,
  getAllCategories,
} = require("../service/Category");
const { findTasks, deleteTasks } = require("../service/Task");
const router = Router();
const auth = require("../middleware/middleware.auth");
const logging = require("../middleware/middleware.log");
const validation = require("../middleware/middleware.validation");

router.get("/categories", logging.log, auth, async (request, response) => {
  try {
    const categoriesDB = await getAllCategories();
    response.json({ categoriesDB: categoriesDB });
  } catch (e) {
    logging.errorLog("Unexpected error", e.message);
    response
      .status(500)
      .json({ message: "Something goes wrong! Please try again later." });
  }
});

router.post(
  "/add/category",
  logging.log,
  auth,
  [
    check(
      "categoryText",
      "Text cant be empty"
    ).isLength({ min: 1 }),
  ],
  validation.validate,
  async (request, response) => {
    try {
      const category = createCategory(request.body.categoryText);
      const result = await category.save();
      if (result) {
        response.status(201).json({ category_id: category._id });
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
  "/edit/category/:id",
  logging.log,
  auth,
  [
    check(
      "categoryText",
      "Text cant be empty"
    ).isLength({ min: 1 }),
  ],
  validation.validate,
  async (request, response) => {
    try {
      const updatedCategory = await updateCategory(
        request.params.id,
        request.body.categoryText
      );
      if (updatedCategory) {
        response.status(200).json({ message: "Succesfully updated." });
      } else {
        logging.errorLog("Database error", "Can't update category");
        response.status(404).json({ message: "Can't find such category" });
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
  "/add/subcategory/:parentid",
  logging.log,
  auth,
  [
    check("text", "Text cant be empty").isLength({
      min: 1,
    }),
  ],
  validation.validate,
  async (request, response) => {
    try {
      const subcategory = createSubcategory(
        request.body.text,
        request.params.parentid
      );
      const parent = await findCategory(request.params.parentid);
      if (parent) {
        const parentSubcategoryArray = parent.subcategory;
        parentSubcategoryArray.unshift(subcategory._id);
        const parentCategory = await updateParentCategory(
          request.params.parentid,
          parentSubcategoryArray,
          "add_subcategory"
        );
        if (parentCategory) {
          const result = await subcategory.save();
          if (result) {
            response.status(201).json({ category_id: subcategory._id });
          }
        } else {
          logging.errorLog("Database error", "Can't update category");
          response.status(404).json({ message: "Not vaild data" });
        }
      } else {
        logging.errorLog("Database error", "Can't find parent");
        response.status(404).json({ message: "Can't find such category" });
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
  "/delete/category/:id",
  logging.log,
  auth,
  async (request, response) => {
    try {
      let subcategories = [];
      const tasks = [];

      const categoryToDelete = await findCategory(request.params.id);
      if (!categoryToDelete) {
        logging.errorLog(
          "Database error",
          "Can't find such category, maybe it's wrong id."
        );
        response.status(404).json({ message: "Can't find such category" });
        return;
      }

      if (categoryToDelete.parentID !== null) {
        const parent = await findCategory(categoryToDelete.parentID);
        if (parent) {
          const updatedParent = await updateParentCategory(
            parent._id,
            parent.subcategory,
            "delete_subcategory",
            request.params.id
          );
          if (!updatedParent) {
            logging.errorLog("Database error", "Can't update category");
            response.status(404).json({ message: "Not vaild data" });
            return;
          }
        } else {
          logging.errorLog("Database error", "Can't find parent");
          response.status(404).json({ message: "Not vaild data" });
          return;
        }
      }

      const taskToDelete = await findTasks(request.params.id);
      if (taskToDelete.length > 0) {
        for (let i = 0; i < taskToDelete; i++) {
          tasks.push(taskToDelete[i]);
        }
        await deleteTasks(request.params.id);
      }

      if (categoryToDelete.subcategory.length !== 0) {
        subcategories = await findsubCategoriesToDelete(
          categoryToDelete.subcategory
        );
        for (let i = 0; i < subcategories.length; i++) {
          const taskToDelete = await findTasks(subcategories[i]);
          if (taskToDelete.length > 0) {
            for (let i = 0; i < taskToDelete.length; i++) {
              tasks.push(taskToDelete[i]);
            }
            await deleteTasks(subcategories[i]);
          }
          await deleteCategory(subcategories[i]);
        }
      }
      await deleteCategory(request.params.id);
      response
        .status(200)
        .json({ subcategoryids: subcategories, tasksIds: tasks });
    } catch (e) {
      logging.errorLog("Unexpected error", e.message);
      response
        .status(500)
        .json({ message: "Something goes wrong! Please try again later." });
    }
  }
);

module.exports = router;
