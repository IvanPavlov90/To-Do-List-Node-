import { ErrorModal } from "../components/Modals/ErrorModal";
import { error } from "../store/Errors/Actions";
import { showModal } from "../store/Modals/Actions";
import { hideSpinner } from "../store/Spinner/Actions";

export const errorProcessing = async (dispatch, response) => {
  if (response.status === 400) {
    const responseJSON = await response.json();
    dispatch(hideSpinner());
    dispatch(showModal(<ErrorModal errorText={responseJSON.errors[0].msg} />));
  } else if (response.status === 401) {
    dispatch(hideSpinner());
    dispatch(error("Not authorizied. Please try to relogin."));
  } else if (response.status === 404) {
    dispatch(hideSpinner());
    dispatch(
      showModal(
        <ErrorModal errorText="This resourse is unavailable" errorType="404"/>
      )
    );
  } else if (response.status === 500) {
    dispatch(hideSpinner());
    dispatch(
      showModal(
        <ErrorModal
          errorText={"Sorry, we have some troubles, please try again later."}
        />
      )
    );
  }
};
