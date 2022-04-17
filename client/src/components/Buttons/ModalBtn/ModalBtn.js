import "./_modalBtn.scss";

export const ModalBtn = (props) => {
  return (
    <button className={props.type === "close" ? "close-modal-btn" : "submit-modal-btn"} onClick={props.active}>
      {props.type === "close" ? 'Close' : 'OK'}
    </button>
  );
};
