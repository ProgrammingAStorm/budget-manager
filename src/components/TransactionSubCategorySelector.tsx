import { useWatch, AutocompleteElement } from "react-hook-form-mui";
import Category from "../models/category";
import { useAppSelector } from "../redux/hooks";
import SubCategory from "../models/subCategory";

interface FormState {
  category: Category;
}

export default function TransactionSubCategorySelector() {
  const { category } = useWatch<FormState>();
  const subCategoriesByCategory = getSubCategoriesByCategory(
    useAppSelector((s) => s.subCategories),
    (category as Category) ?? { id: "" }
  );

  return (
    <>
      <AutocompleteElement
        label="Sub-Category"
        name="subCategory"
        options={subCategoriesByCategory.map((s) => {
          return { id: s.id, label: s.name };
        })}
        required
        textFieldProps={{ helperText: "Field requires category" }}
      />
    </>
  );

  function getSubCategoriesByCategory(
    subCategories: SubCategory[],
    { id }: Category
  ) {
    return subCategories.filter((s) => s.parentCategory === id);
  }
}
