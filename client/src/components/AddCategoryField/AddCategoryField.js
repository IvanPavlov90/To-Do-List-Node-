import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks/customHooks";
import { addNewCategory } from "../../store/Categories/Actions";
import { showModal } from "../../store/Modals/Actions";
import { GetModalState } from "../../store/selectors";
import { ErrorModal } from "../Modals/ErrorModal";
import "./_addCategoryField.scss";

export const AddCategoryField = () => {
  const dispatch = useDispatch();
  const categoryName = useInput("");
  let navigate = useNavigate();
  const modalState = GetModalState();

  const addCategory = useCallback(
    async (text) => {
      if (!text.trim().length) {
        dispatch(showModal(<ErrorModal errorText={"Text cant be empty"} />));
      } else {
        const id = await dispatch(addNewCategory(text.trim()));
        if (id) {
          navigate(`/categories/${id}`);
        }
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className="add-category-container">
      <input
        type="text"
        className="text-input"
        placeholder="Enter Category Title"
        onChange={categoryName.onChange}
        tabIndex={modalState.open ? -1 : 0}
      />
      <button
        className="add-btn"
        onClick={() => addCategory(categoryName.value)}
        tabIndex={modalState.open ? -1 : 0}
      >
        Add
      </button>
    </div>
  );
};
