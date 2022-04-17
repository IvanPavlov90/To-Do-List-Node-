import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addSubCategory, editCategory } from "../../store/Categories/Actions";
import { hideModal } from "../../store/Modals/Actions";
import "./_Modals.scss";
import { ModalBtn } from "../Buttons/ModalBtn/ModalBtn";
import { useInput } from "../../hooks/customHooks";
import { useNavigate } from "react-router-dom";

export const AddEditModal = (props) => {
  const dispatch = useDispatch();
  const categoryName = useInput('');
  let navigate = useNavigate();

  const changeCategory = useCallback(async (id, text) => {
    if (props.type === "Add") {
      const newcategoryId = await dispatch(addSubCategory(id, text));
      if (newcategoryId) {
        navigate(`/categories/${newcategoryId}`);
      } 
    } else if (props.type === "Edit") {
      await dispatch(editCategory(id, text));
      navigate(`/categories/${id}`);
    }
  }, [dispatch, props.type, navigate]);

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <p className="modal__text">
          {props.type === "Add"
            ? `Your category will be a subcategory for ${props.parentCategoryText}`
            : `Would you like to change category name from ${props.parentCategoryText}?`}
        </p>
        <input
          className="modal__input"
          type="text"
          placeholder="Type your text here"
          onChange={categoryName.onChange}
          defaultValue={props.type === "Edit" ? props.parentCategoryText : ''}
        />
        <div className="modal__btn-container">
          <ModalBtn type="submit" active = {() => changeCategory(props.id, categoryName.value)}/>
          <ModalBtn type="close" active={closeModal} />
        </div>
      </div>
    </div>
  );
};
