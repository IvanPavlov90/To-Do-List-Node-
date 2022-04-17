import { BrowserRouter } from "react-router-dom";
import "./style/App.scss";
import { RouteComponent } from "./components/RouteComponent/RouteComponent";
import Error from "./components/ErrorComponent/Error";

export function App() {
  return (
    <BrowserRouter>
      <Error>
        <RouteComponent />
      </Error>
    </BrowserRouter>
  );
}
