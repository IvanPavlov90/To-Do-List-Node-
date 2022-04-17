import { hideSpinner, showSpinner } from "../Spinner/Actions";
import { DataService } from "../../services/DataService";
import { categoryType } from "./ActionTypes";
import { deleteTaskAction, getTasksAction } from "../Tasks/Actions";
import { error } from "../Errors/Actions";
import { hideModal, showModal } from "../Modals/Actions";
import { ErrorModal } from "../../components/Modals/ErrorModal";
import { errorProcessing } from "../../services/ErrorProcessing";

export const getData = () => {
  return async (dispatch) => {
    try {
      dispatch(showSpinner("Loading Categories..."));
      const responseCategories = await DataService.getCategories();
      if (responseCategories.status === 200) {
        const categories = await responseCategories.json();
        dispatch(getCategoriesAction(categories.categoriesDB));
      } else if (responseCategories.status === 401) {
        dispatch(hideSpinner());
        dispatch(error("Not authorizied. Please try to relogin."));
      } else if (responseCategories.status === 500) {
        dispatch(hideSpinner());
        dispatch(
          showModal(
            <ErrorModal errorText={"Sorry, we have some troubles, please try again later."} />
          )
        );
      }
      dispatch(showSpinner("Loading Tasks..."));
      const responseTasks = await DataService.getTasks();
      if (responseTasks.status === 200) {
        const tasks = await responseTasks.json();
        dispatch(getTasksAction(tasks.tasksDB));
        dispatch(hideSpinner());
      } else if (responseCategories.status === 401) {
        dispatch(hideSpinner());
        dispatch(error("Not authorizied. Please try to relogin."));
      } else if (responseCategories.status === 500) {
        dispatch(hideSpinner());
        dispatch(
          showModal(
            <ErrorModal errorText={"Sorry, we have some troubles, please try again later."} />
          )
        );
      }
    } catch (e) {
      dispatch(hideSpinner());
      console.log(e.message);
      dispatch(error("Sorry, we have some troubles, please try again later."));
    }
  };
};

const getCategoriesAction = (value) => {
  const ids = [];
  const categoryInfo = {};
  value.forEach((element) => {
    ids.push(element._id);
    categoryInfo[element._id] = {
      id: element._id,
      text: element.text,
      subcategory: element.subcategory,
      parentID: element.parentID,
    };
  });

  return {
    type: categoryType.getCategories,
    payload: {
      ids: ids,
      categoryInfo: categoryInfo,
    },
  };
};

export const makeCategoryActive = (id) => {
  return {
    type: categoryType.makeActive,
    payload: id,
  };
};

export const addNewCategory = (text) => {
  return async (dispatch) => {
    try {
      dispatch(showSpinner("Please wait for adding new category..."));
      const response = await DataService.addNewCategory(text);
      if (response.status === 201) {
        const responseJSON = await response.json();
        dispatch(addNewCategoryAction(responseJSON.category_id, text));
        dispatch(hideSpinner());
        return responseJSON.category_id;
      } else {
        errorProcessing(dispatch, response);
      }
    } catch (e) {
      dispatch(hideSpinner());
      console.log(e.message);
      dispatch(error("Sorry, we have some troubles, please try again later."));
    }
  };
};

export const addNewCategoryAction = (category_id, text) => {
  return {
    type: categoryType.addNewCategory,
    payload: {
      id: category_id,
      text: text,
    },
  };
};

export const addSubCategory = (parent_id, text) => {
  return async (dispatch) => {
    try {
      dispatch(hideModal());
      dispatch(showSpinner("Please wait for adding new subcategory..."));
      const response = await DataService.addSubCategory(parent_id, text);
      if (response.status === 201) {
        const responseJSON = await response.json();
        dispatch(
          addSubCategoryAction(responseJSON.category_id, parent_id, text)
        );
        dispatch(hideSpinner());
        return responseJSON.category_id;
      } else {
        errorProcessing(dispatch, response);
      }
    } catch (e) {
      dispatch(hideSpinner());
      console.log(e.message);
      dispatch(error("Sorry, we have some troubles, please try again later."));
    }
  };
};

export const addSubCategoryAction = (id, parent_id, text) => {
  return {
    type: categoryType.addSubCategory,
    payload: {
      id: id,
      parentID: parent_id,
      text: text,
    },
  };
};

export const editCategory = (id, text) => {
  return async (dispatch) => {
    try {
      dispatch(hideModal());
      dispatch(showSpinner("Please wait for editing category..."));
      const response = await DataService.editCategory(id, text);
      if (response.status === 200) {
        dispatch(editCategoryAction(id, text));
        dispatch(hideSpinner());
        return true;
      } else {
        errorProcessing(dispatch, response);
      }
    } catch (e) {
      dispatch(hideSpinner());
      console.log(e.message);
      dispatch(error("Sorry, we have some troubles, please try again later."));
    }
  };
};

export const editCategoryAction = (id, text) => {
  return {
    type: categoryType.editCategory,
    payload: {
      id: id,
      text: text,
    },
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      dispatch(showSpinner("Please wait for deleting category..."));
      const response = await DataService.deleteCategory(id);
      if (response.status === 200) {
        const responseJSON = await response.json();
        dispatch(deleteCategoryAction(id, responseJSON.subcategoryids))
        dispatch(deleteTaskAction(responseJSON.tasksIds))
        dispatch(hideSpinner());
        return true;
      } else {
        errorProcessing(dispatch, response);
      }
    } catch (e) {
      dispatch(hideSpinner());
      console.log(e.message);
      dispatch(error("Sorry, we have some troubles, please try again later."));
    }
  };
};

export const deleteCategoryAction = (category_id, subcategory_ids) => {
  const deleteCategories = [category_id, ...subcategory_ids];
  return {
    type: categoryType.deleteCategory,
    payload: {
      deleteCategories: deleteCategories,
    },
  }
}

export const clearCategoryState = () => {
  return {
    type: categoryType.clearState,
  }
}
