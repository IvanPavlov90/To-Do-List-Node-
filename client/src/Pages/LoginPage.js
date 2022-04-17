import { useEffect, useRef, useState } from "react";
import { DataService } from "../services/DataService";
import { useDispatch } from "react-redux";
import "./_loginPage.scss";
import { login } from "../store/Authorizied/Actions";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMSg] = useState(null);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const sendAuthData = async function (e) {
    try {
      e.preventDefault();
      const response = await DataService.authUser(email, password);
      if (response.status === 200) {
        const responseJSON = await response.json();
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: responseJSON.token,
            username: responseJSON.username,
          })
        );
        dispatch(login(responseJSON.username));
      } else if (response.status === 400) {
        const responseJSON = await response.json();
        setErrorMSg(responseJSON.errors[0].msg);
      } else if (response.status === 401) {
        setErrorMSg("There is no such user with this credentials.");
      } else {
        setErrorMSg("Something goes wrong, please try again later");
      }
    } catch (e) {
      console.log(e.message);
      setErrorMSg("Something goes wrong, please try again later");
    }
  };

  const renderErrorMessage = (responseMessage = "") => {
    return <p className="form__error">{responseMessage}</p>;
  };

  return (
    <>
      <div className="wrapper"></div>
      <form className="form__container" onSubmit={sendAuthData}>
        <p className="form__header">Please Log In</p>
        <label className="form__label">Email: </label>
        <input
          type="text"
          name="email"
          className="form__input"
          ref={ref}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form__label">Password: </label>
        <input
          type="password"
          name="password"
          className="form__input"
          onChange={(e) => setPassword(e.target.value)}
        />
        {renderErrorMessage(errorMsg)}
        <input type="submit" value="Sign In" className="form__submit" />
      </form>
    </>
  );
}
