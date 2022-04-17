import { useDispatch } from "react-redux";
import { hideModal } from "../../store/Modals/Actions";
import { ModalBtn } from "../Buttons/ModalBtn/ModalBtn";

export const ErrorModal = (props) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    if (props.errorType === "404") {
      dispatch(hideModal());
      window.location.reload();
    } else {
      dispatch(hideModal());
    }
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <p className="modal__text">{props.errorText}</p>
        <div className="modal__btn-container">
          <ModalBtn type="close" active={closeModal} />
        </div>
      </div>
    </div>
  );
};
