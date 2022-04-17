import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCheckbox } from "../../hooks/customHooks";
import debounce from "../../services/Debounce";
import { logout } from "../../store/Authorizied/Actions";
import { showDone } from "../../store/Tasks/Actions";
import "./_searchBar.scss";
import {
  GetAuthorizied,
  GetErrors,
  GetModalState,
} from "../../store/selectors";
import { noError } from "../../store/Errors/Actions";
import { clearCategoryState } from "../../store/Categories/Actions";

export const SearchBar = () => {
  const auth = GetAuthorizied();
  const done = useCheckbox(false);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const error = GetErrors();
  const modalState = GetModalState();

  const search = (event) => {
    navigate(`/categories/${params.id}?task=${event.target.value}`);
  };

  const setShowDone = (value) => {
    dispatch(showDone(value));
  };

  const Logout = () => {
    localStorage.removeItem("userData");
    dispatch(noError());
    dispatch(logout());
    dispatch(clearCategoryState());
  };

  const errorInterface = () => {
    return (
      <div className="search-container">
        <p className="search-container__name">
          To-Do List. Current user - {auth.username}
        </p>
        <button className="search-container__logout-btn" onClick={Logout}>
          <Link to={`/`}>Logout</Link>
        </button>
      </div>
    );
  };

  return error.hasError ? (
    errorInterface()
  ) : (
    <div className="search-container">
      <p className="search-container__name">
        To-Do List. Current user - {auth.username}
      </p>
      <input
        type="checkbox"
        className="search-container__checkbox"
        id="searchCheckbox"
        defaultChecked={done.value}
        onChange={() => {
          done.onChange();
          setShowDone(!done.value);
        }}
        tabIndex={modalState.open ? -1 : 0}
      />
      <label
        htmlFor="searchCheckbox"
        className="search-container__checkbox-label"
      >
        Show done
      </label>
      <input
        type="search"
        className="search-container__search-input"
        placeholder="Search"
        onChange={debounce(search, 1000)}
        disabled={location.pathname === "/" ? "disabled" : null}
        tabIndex={modalState.open ? -1 : 0}
      />
      <button
        className="search-container__logout-btn"
        onClick={Logout}
        tabIndex={modalState.open ? -1 : 0}
      >
        <Link to={`/`} tabIndex={modalState.open ? -1 : 0}>
          Logout
        </Link>
      </button>
    </div>
  );
};
