const { Category } = require("../models/Category");

module.exports = {
  findsubCategoriesToDelete: async function (arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i]);
      const subcategoryToDelete = await Category.findById(arr[i]);
      if (subcategoryToDelete.subcategory.length > 0) {
        const subcategories = await findsubCategoriesToDelete(
          subcategoryToDelete.subcategory
        );
        for (let i = 0; i < subcategories.length; i++) {
          result.push(subcategories[i]);
        }
      }
    }
    return result;
  },
}
