import type Category from "../../../models/category";
import SubCategory from "./SubCategory";

export interface CategoryProps {
  category: Category;
}

export default function Category({ category }: CategoryProps) {
  return (
    <div>
      <div>{category.name}</div>

      {category.subCategories.map((subCategoryId) => (
        <SubCategory key={subCategoryId} subCategoryId={subCategoryId} />
      ))}
    </div>
  );
}
