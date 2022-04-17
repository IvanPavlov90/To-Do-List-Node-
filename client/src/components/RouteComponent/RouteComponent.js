import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorPage } from "../../Pages/ErrorPage";
import { LoginPage } from "../../Pages/LoginPage";
import { MainPage } from "../../Pages/MainPage";
import { TaskPage } from "../../Pages/TaskPage";
import { login } from "../../store/Authorizied/Actions";
import { GetAuthorizied } from "../../store/selectors";

export function RouteComponent() {
  const auth = GetAuthorizied();
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token) {
      dispatch(login(data.username));
    } 
  }, [dispatch])

  return auth.isAuthentificated ? (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/categories/:id" element={<MainPage />} />
      <Route path="/categories/:id?task=:value" element={<MainPage />} />
      <Route path="/categories/:id/task/:taskid" element={<TaskPage />} />
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  ) : 
  (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
