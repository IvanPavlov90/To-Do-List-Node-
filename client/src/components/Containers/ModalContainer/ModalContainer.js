import React from "react";
import ReactDOM from "react-dom";
import { GetModalState } from "../../../store/selectors";
import "./_modalContainer.scss";

export const ModalContainer = () => {
  const modal = GetModalState();

  const modalRenderer = (element) => {
    return (
      <React.Fragment>
        <div className="wrapper"></div>
        {element}
      </React.Fragment>
    );
  };

  return modal.open
    ? ReactDOM.createPortal(modalRenderer(modal.element), document.body)
    : null;
};
