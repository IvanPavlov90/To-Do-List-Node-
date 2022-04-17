import './_content.scss';
import { CategoriesContainer } from "../CategoriesContainer/CategoriesContainer";
import { TasksContainer } from '../TasksContainer/TasksContainer';

export const Content = () => {
  return (
    <div className="content-container">
      <CategoriesContainer />
      <TasksContainer />
    </div>
  )
};
