import { GetErrors } from "../../../store/selectors";
import { AddCategoryField } from "../../AddCategoryField/AddCategoryField";
import { CategoryList } from "../../CategoriesList/CategoryList";
import "./_categoriesContainer.scss";

export const CategoriesContainer = () => {
  const error = GetErrors();
  return error.hasError ? (<div className="error-message">{error.ErrorInfo}</div>) : (
    <div className="categories-container">
      <AddCategoryField />
      <CategoryList page="mainPage" />
    </div>
  );
};
