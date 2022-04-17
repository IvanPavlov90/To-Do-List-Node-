const { Category } = require("../models/Category");
const mongoose = require("mongoose");

module.exports = {
  createCategory: (text) => {
    const categoryId = mongoose.Types.ObjectId();
    const category = new Category({
      _id: categoryId,
      text: text,
      subcategory: [],
      parentID: null,
      data: new Date(),
    });

    return category;
  },
  createSubcategory: (text, parent_id) => {
    const categoryId = mongoose.Types.ObjectId();
    const subcategory = new Category({
      _id: categoryId,
      text: text,
      subcategory: [],
      parentID: parent_id,
      data: new Date(),
    });

    return subcategory;
  },
  deleteCategory: async (id) => {
    return await Category.deleteOne({ _id: id });
  },
  findCategory: async (id) => {
    return await Category.findById(id);
  },
  getAllCategories: async () => {
    return await Category.find().sort({
      data: -1,
    });
  },
  updateCategory: async (id, text) => {
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { text: text },
      { new: true }
    );

    if (category) {
      return true;
    }

    return false;
  },
  updateParentCategory: async (id, subcategory, type, category_id = "") => {
    let category;
    switch (type) {
      case "add_subcategory":
        category = await Category.findOneAndUpdate(
          { _id: id },
          { subcategory: subcategory },
          { new: true }
        );
        break;
      case "delete_subcategory":
        category = await Category.findOneAndUpdate(
          { _id: id },
          { $pull: { subcategory: category_id } },
          { new: true }
        );
        break;
      default:
        break;
    }


    if (category) {
      return true;
    }

    return false;
  },
};
