import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/Tasks/Actions";
import { useLocation, useParams } from "react-router-dom";
import "./_addTaskField.scss";
import { useInput } from "../../hooks/customHooks";
import { ErrorModal } from "../Modals/ErrorModal";
import { showModal } from "../../store/Modals/Actions";
import { GetModalState } from "../../store/selectors";

export const AddTaskField = () => {
  const dispatch = useDispatch();
  const taskName = useInput("");
  const params = useParams();
  const location = useLocation();
  const modalState = GetModalState();

  const addNewTask = useCallback(
    (header) => {
      if (!header.trim().length) {
        dispatch(
          showModal(
            <ErrorModal errorText={"You cant add task with empty name"} />
          )
        );
      } else {
        dispatch(addTask(header, params.id));
      }
    },
    [dispatch, params.id]
  );

  return (
    <div className="add-task-container">
      <input
        type="text"
        className="text-input text-input-right-position small-input"
        placeholder="Add New Task"
        onChange={taskName.onChange}
        tabIndex={modalState.open ? -1 : 0}
      />
      <input
        type="button"
        value="Add"
        className="add-btn add-btn-right-position"
        onClick={() => addNewTask(taskName.value)}
        disabled={location.pathname === "/" ? "disabled" : null}
        tabIndex={modalState.open ? -1 : 0}
      />
    </div>
  );
};
