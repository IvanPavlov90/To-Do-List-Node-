const initialState = {
  ids: [],
  categoryInfo: {},
  isActive: null,
};

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case "get_categories":
      let categoryInfo = { ...state.categoryInfo };
      categoryInfo = action.payload.categoryInfo;
      return {
        ...state,
        ids: [...action.payload.ids],
        categoryInfo: categoryInfo,
      };
    case "make_active":
      let makeActiveState = { ...state.isActive };
      makeActiveState = action.payload;
      return { ...state, isActive: makeActiveState };
    case "add_category":
      const addCategoryState = { ...state.categoryInfo };
      addCategoryState[action.payload.id] = {
        id: action.payload.id,
        text: action.payload.text,
        subcategory: [],
        parentID: null,
      };
      return {
        ...state,
        ids: [action.payload.id, ...state.ids],
        categoryInfo: addCategoryState,
      };
    case "add_subcategory":
      const addSubCategoryState = { ...state.categoryInfo };
      addSubCategoryState[action.payload.id] = {
        id: action.payload.id,
        text: action.payload.text,
        subcategory: [],
        parentID: action.payload.parentID,
      };
      addSubCategoryState[action.payload.parentID].subcategory.unshift(
        action.payload.id
      );
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        categoryInfo: addSubCategoryState,
      };
    case "edit_category":
      const editCategoryState = { ...state.categoryInfo };
      editCategoryState[action.payload.id].text = action.payload.text;
      return { ...state, categoryInfo: editCategoryState };
    case "clear":
      return { ...state, ids: [], categoryInfo: {}, isActive: null };
    case "delete_category":
      const deleteCategoryIds = [...state.ids];
      const deleteCategoryStateInfo = { ...state.categoryInfo };
      const parentID = deleteCategoryStateInfo[action.payload.deleteCategories[0]].parentID;
      if (parentID !== null) {
        const index = deleteCategoryStateInfo[parentID].subcategory.indexOf(
          action.payload.deleteCategories[0]
        );
        deleteCategoryStateInfo[parentID].subcategory.splice(index, 1);
      }
      action.payload.deleteCategories.forEach((category_id) => {
        const index = deleteCategoryIds.indexOf(category_id);
        deleteCategoryIds.splice(index, 1);
        delete deleteCategoryStateInfo[category_id];
      });
      return {
        ...state,
        ids: deleteCategoryIds,
        categoryInfo: deleteCategoryStateInfo,
      };
    default:
      return { ...state };
  }
};
