
import { DataService } from "../../services/DataService";
import { errorProcessing } from "../../services/ErrorProcessing";
import { error } from "../Errors/Actions";
import { hideSpinner, showSpinner } from "../Spinner/Actions";
import { taskType } from "./ActionTypes";

export const getTasksAction = (value) => {
  const ids = [];
  const taskInfo = {};
  value.forEach((element) => {
    ids.push(element._id);
    taskInfo[element._id] = {
      id: element._id,
      header: element.header,
      category_id: element.category_id,
      isDone: element.isDone,
      description: element.description,
    };
  });
  return {
    type: taskType.getTasks,
    payload: {
      ids: ids,
      taskInfo: taskInfo,
    },
  };
};

export const openTasks = (id) => {
  return {
    type: taskType.showTasks,
    payload: id,
  };
};

export const changeTask = (
  task_id,
  category_id,
  header,
  description,
  isDone
) => {
  return async (dispatch) => {
    try {
      dispatch(showSpinner("Please wait for editing task..."));
      const response = await DataService.editTask(
        task_id,
        category_id,
        header,
        description,
        isDone
      );
      if (response.status === 200) {
        dispatch(
          changeTaskAction(task_id, category_id, header, description, isDone)
        );
        dispatch(hideSpinner());
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

export const changeTaskAction = (
  task_id,
  category_id,
  header,
  description,
  isDone
) => {
  return {
    type: taskType.changeTask,
    payload: {
      id: task_id,
      category_id: category_id,
      header: header,
      description: description,
      isDone: isDone,
    },
  };
};

export const addTask = (header, category_id) => {
  return async (dispatch) => {
    try {
      dispatch(showSpinner("Adding new task..."));
      const response = await DataService.addTask(category_id, header);
      if (response.status === 201) {
        const responseJSON = await response.json();
        dispatch(addTaskAction(responseJSON.task_id, header, category_id));
        dispatch(hideSpinner());
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

export const addTaskAction = (task_id, header, category_id) => {
  return {
    type: taskType.addTask,
    payload: {
      id: task_id,
      category_id: category_id,
      header: header,
    },
  };
};

export const markTask = (value, task_id) => {
  return async (dispatch) => {
    try {
      const response = await DataService.markTask(value, task_id);
      if (response.status === 200) {
        dispatch(markTaskAction(value, task_id));
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

export const markTaskAction = (value, taskID) => {
  return {
    type: taskType.markTaks,
    payload: {
      value: value,
      taskID: taskID,
    },
  };
};

export const showDone = (value) => {
  return {
    type: taskType.showDone,
    payload: value,
  };
};

export const deleteTaskAction = (tasks_ids) => {
  return {
    type: taskType.deleteTask,
    payload: {
      deleteTasks: tasks_ids,
    },
  };
};
