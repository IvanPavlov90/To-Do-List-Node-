import React, { useEffect } from "react";
import "./_mainPage.scss";
import { ProgressBar } from "../components/ProgressBar/ProgressBar";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Content } from "../components/Containers/ContentContainer/Content";
import { ModalContainer } from "../components/Containers/ModalContainer/ModalContainer";
import { useDispatch } from "react-redux";
import { Spinner } from "../components/Spinner/Spinner";
import { getData } from "../store/Categories/Actions";
import { GetAuthorizied } from "../store/selectors";

export const MainPage = () => {
  const auth = GetAuthorizied();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthentificated) {
      dispatch(getData());
    }
  }, [dispatch, auth.isAuthentificated]);

  return (
    <main>
      <Spinner />
      <SearchBar />
      <ProgressBar />
      <Content />
      <ModalContainer />
    </main>
  );
};
