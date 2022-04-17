import { GetSpinnerState } from "../../store/selectors";
import "./_spinner.scss";

export const Spinner = () => {
  const spinner = GetSpinnerState();
  return (
    <div className={spinner.loading ? "spinner-container" : "spinner-container hidden"}>
      <div className="spinner-container__spinner">
        <img src="/pictures/spinner.png" alt="spinner" />
      </div>
      <p className="spinner-container__text">{spinner.text}</p>
      <div className="wrapper"></div>
    </div>
  );
};
