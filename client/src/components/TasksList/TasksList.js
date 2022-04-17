import { TasksItem } from "../TaskItem/TaskItem";
import "./_tasksList.scss";

export const TasksList = (props) => {
  return (
    <ul className="tasks-list">
      {props.ids.map((id) => (
        <TasksItem key={id} id={id} />
      ))}
    </ul>
  )
};
