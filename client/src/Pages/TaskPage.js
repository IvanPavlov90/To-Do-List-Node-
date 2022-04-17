import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import { CategoryList } from "../components/CategoriesList/CategoryList";
import { TaskEditForm } from "../components/TaskEditForm/TaskEditForm";
import { changeTask } from "../store/Tasks/Actions";
import './_taskPage.scss';
import { ErrorPage } from "./ErrorPage";
import { GetActiveCategory, GetAuthorizied, GetTask } from "../store/selectors";
import { getData, makeCategoryActive } from "../store/Categories/Actions";

export const TaskPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = GetTask(params.taskid);
  const activeCategory = GetActiveCategory();
  const auth = GetAuthorizied();

  const loadInfo = async () => {
    if (auth.isAuthentificated) {
      await dispatch(getData());
      dispatch(makeCategoryActive(params.id));
    }
  }

  useEffect(() => {
    loadInfo();
  }, []);

  const editTask = useCallback(async (event, header, description, isDone) => {
    event.preventDefault();
    if (!header.trim().length) {
      alert('You cant add task with empty header');
    } else {
      await dispatch(changeTask(params.taskid, activeCategory, header, description, isDone));
      navigate(`/categories/${activeCategory}`);
    }  
  }, [dispatch, params.taskid, activeCategory, navigate]);

  return (
    task === undefined ? 
    <Routes>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    :
     <main className="task-page">
         <p className="task-page__task-name">{task.header}</p>
        <div className="task-page__categories-container">
            <CategoryList page="taskPage"/>
        </div>
        <div className="task-page__form-container">
            <TaskEditForm activeCategory={params.id} task={task} editTask={editTask}/>
        </div>
     </main> 
  );
};
