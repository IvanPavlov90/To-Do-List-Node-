const initialState = {
  ids: [],
  taskInfo: {},
  showDone: "",
};

export const tasks = (state = initialState, action) => {
  switch (action.type) {
    case "get_tasks":
      let taskInfo = { ...state.taskInfo };
      taskInfo = action.payload.taskInfo;
      return { ...state, ids: [...action.payload.ids], taskInfo: taskInfo };
    case "edit_task":
      const editTaskState = { ...state.taskInfo };
      editTaskState[action.payload.id].category_id = action.payload.category_id;
      editTaskState[action.payload.id].header = action.payload.header;
      editTaskState[action.payload.id].description = action.payload.description;
      editTaskState[action.payload.id].isDone = action.payload.isDone;
      return { ...state, taskInfo: editTaskState };
    case "add_task":
      const addTaskState = { ...state.taskInfo };
      addTaskState[action.payload.id] = {
        id: action.payload.id,
        category_id: action.payload.category_id,
        header: action.payload.header,
        description: "",
        isDone: false,
      };
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        taskInfo: addTaskState,
      };
    case "mark_task":
      const markTaskState = { ...state.taskInfo };
      markTaskState[action.payload.taskID].isDone = action.payload.value;
      return { ...state, taskInfo: markTaskState };
    case "show_done":
      let showDoneState = state.showDone;
      showDoneState = action.payload;
      return { ...state, showDone: showDoneState };
    case "clear":
      return { ...state, ids: [], taskInfo: {}, showDone: "" };
    case "delete_task":
      const deleteTaskStateIDs = [ ...state.ids ];
      const deleteTaskStateInfo = { ...state.taskInfo };
      action.payload.deleteTasks.forEach((task_id) => {
        const index = deleteTaskStateIDs.indexOf(task_id);
        deleteTaskStateIDs.splice(index, 1);
        delete deleteTaskStateInfo[task_id];
      });
      return {
        ...state,
        ids: deleteTaskStateIDs,
        taskInfo: deleteTaskStateInfo,
      };
    default:
      return { ...state };
  }
};
