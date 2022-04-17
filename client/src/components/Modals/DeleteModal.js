import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../store/Categories/Actions";
import { hideModal } from "../../store/Modals/Actions";
import { useNavigate } from "react-router-dom";
import "./_Modals.scss";
import { ModalBtn } from "../Buttons/ModalBtn/ModalBtn";

export const DeleteModal = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const deleteCategoryItem = useCallback(
    (id) => {
      dispatch(deleteCategory(id));
      dispatch(hideModal());
      navigate('/');
    },
    [dispatch, navigate]
  );

  return (
    <div className="modal">
      <div className="modal__container">
        <p className="modal__text">
          Do you <b>really</b> want to delete {props.parentCategoryText}?
        </p>
        <div className="modal__btn-container">
          <ModalBtn type="submit" active={() => deleteCategoryItem(props.id)}/>
          <ModalBtn type="close" active={closeModal}/>
        </div>
      </div>
    </div>
  );
};
