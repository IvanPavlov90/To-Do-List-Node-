import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCheckbox } from "../../hooks/customHooks";
import { makeCategoryActive } from "../../store/Categories/Actions";
import {
  GetModalState,
  GetShowDoneFilterState,
  GetTask,
} from "../../store/selectors";
import { markTask } from "../../store/Tasks/Actions";
import "./_taskItem.scss";

export const TasksItem = (props) => {
  const task = GetTask(props.id);
  const done = GetShowDoneFilterState();
  const location = useLocation();
  const params = useParams();
  const searchParams = new URLSearchParams(location.search).get("task");
  const isDone = useCheckbox(!task.isDone);
  const dispatch = useDispatch();
  const modalState = GetModalState();

  function searchFunction(searchValue) {
    if (searchValue === null) {
      return true;
    }
    if (task.header.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
      return true;
    } else return false;
  }

  const makeActive = (id) => {
    dispatch(makeCategoryActive(id));
  };

  const itemMarkup = () => {
    return (
      <li id={props.id} className="task-item">
        <input
          className="task-item__checkbox"
          type="checkbox"
          defaultChecked={task.isDone}
          onChange={() => {
            isDone.onChange();
            markTaskItem(isDone.value, props.id);
          }}
          tabIndex={modalState.open ? -1 : 0}
        />
        <span className="task-item__text">{task.header}</span>
        <button
          className="task-item__edit-btn"
          onClick={() => makeActive(params.id)}
          tabIndex={modalState.open ? -1 : 0}
        >
          <Link
            to={`/categories/${params.id}/task/${props.id}`}
            tabIndex={modalState.open ? -1 : 0}
          >
            <img src="/pictures/edit.png" alt="Edit Category" />
          </Link>
        </button>
      </li>
    );
  };

  const markTaskItem = useCallback(
    async (value, taskID) => {
      await dispatch(markTask(value, taskID));
    },
    [dispatch]
  );

  return searchFunction(searchParams)
    ? done
      ? task.isDone
        ? itemMarkup()
        : null
      : itemMarkup()
    : null;
};
