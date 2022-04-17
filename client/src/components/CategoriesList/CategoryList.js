import { GetCategories, GetCategoriesID } from "../../store/selectors";
import { CategoryItem } from "../CategoryItem/CategoryItem";
import "./_categoriesList.scss";

export const CategoryList = (props) => {
  const categoriesID = GetCategoriesID();
  const categories = GetCategories();

  const categoryList = () => {
    return (
      <ul className="category-list">
        {categoriesID.map((id) =>
          categories[id].parentID === null ? (
            <CategoryItem
              key={id}
              id={id}
              page={props.page}
            />
          ) : null
        )}
      </ul>
    );
  };

  return categoryList();
};
