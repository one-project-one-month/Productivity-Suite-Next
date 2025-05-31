import UpdateCategoryDialog from "@/features/category/components/update-category-dialog";
import { Category } from "@/database/interfaces.types";

const UserDefinedCategoryList = ({ data }: { data: Category[] }) => {
  return (
    <div className={"mt-6"}>
      <h3 className={"mb-4 text-gray-400 font-semibold"}>
        Predefined Categories
      </h3>
      <ul className={"flex flex-col gap-y-4"}>
        {data.length > 0 &&
          data.map((category) => (
            <li
              key={category.id}
              className={
                " px-4 py-5 flex items-center gap-x-4 bg-accent text-foreground-muted rounded-lg"
              }
            >
              <span
                role={"presentation"}
                className={"block aspect-square h-5 rounded-full"}
                style={{
                  backgroundColor: category.color,
                }}
              />
              <span className={"sr-only"}>color: {category.color}</span>
              <span className={"font-semibold text-lg md:xl capitalize"}>
                {category.name}
              </span>
              <UpdateCategoryDialog
                defaultValues={category}
                className={"ml-auto"}
              />
            </li>
          ))}
        {data.length === 0 && (
          <p className={"mb-4 text-gray-400 font-semibold text-center"}>
            No custom categories yet. Create your first one above!
          </p>
        )}
      </ul>
    </div>
  );
};

export default UserDefinedCategoryList;
