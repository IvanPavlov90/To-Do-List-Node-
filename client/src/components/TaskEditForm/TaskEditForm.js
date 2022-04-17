import { Link } from "react-router-dom";
import { useCheckbox, useInput } from "../../hooks/customHooks";
import "./_taskEditForm.scss";

export const TaskEditForm = (props) => {
  const taskHeader = useInput(props.task.header);
  const taskDescription = useInput(props.task.description);
  const isDone = useCheckbox(props.task.isDone);

  return (
    <form
      className="form"
      onSubmit={(event) =>
        props.editTask(event, taskHeader.value, taskDescription.value, isDone.value)
      }
    >
      <div className="form__btn-container">
        <button type="submit" className="form__submit-btn">
          Save Changes
        </button>
        <Link to={`/categories/${props.activeCategory}`} className="form__close-btn">Cancel</Link>
      </div>
      <input
        type="text"
        className="form__input"
        defaultValue={props.task.header}
        onChange={taskHeader.onChange}
      />
      <label forhtml="edit-checkbox">
        <input
          id="edit-checkbox"
          type="checkbox"
          className="form__checkbox"
          defaultChecked={props.task.isDone}
          onChange={isDone.onChange}
        />{" "}
        Done
      </label>
      <textarea
        className="form__textarea"
        defaultValue={props.task.description}
        onChange={taskDescription.onChange}
      ></textarea>
    </form>
  );
};
