import { useParams } from "react-router-dom";
import { GetErrors, GetTasks } from "../../../store/selectors";
import { AddTaskField } from "../../AddTaskField/AddTaskField";
import { TasksList } from "../../TasksList/TasksList";
import "./_tasksContainer.scss";

export const TasksContainer = () => {
  const params = useParams();
  const tasks = GetTasks();
  const error = GetErrors();

  const findspecifyID = () => {
    const specifyIDs = [];
    for (const key in tasks) {
      if (tasks[key].category_id === params.id) {
        specifyIDs.push(key);
      }
    }
    return specifyIDs;
  }

  return error.hasError ? null : (
    <div className="tasks-container">
      <AddTaskField/>
      <TasksList ids={findspecifyID()}/>
    </div>
  )
};
