import { Category, SubCategory } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import getSubCategories from "../../../../actions/subCategoryRequests/getSubCats";
import submitSubCat from "../../../../actions/subCategoryRequests/submitSubCat";

// Desctructure props passed down.
type SubCategoryProps = {
  category: Category;
};

export default function SubCategoryForm({ category }: SubCategoryProps) {
  // Create state for storing all categories that were previously created
  // for that category.
  const [subCategories, setAllSubCategories] = useState<
    SubCategory | null | any
  >([]);

  let categoryId: number;
  // Handle submit function to take in the subcat form element.
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Creating a new FormData instance from react and createing the event as
    // a html type
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("inputquery")?.toString();
    categoryId = category.id;

    if (name) {
      try {
        const returnedSubCategories = await submitSubCat({ name, categoryId });
        setAllSubCategories(returnedSubCategories);
        const subCategories = await getSubCategories(categoryId);
        setAllSubCategories(subCategories);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const getSubcategories = async () => {
      try {
        const subCategories = await getSubCategories(categoryId);
        setAllSubCategories(subCategories);
      } catch (error) {
        console.error(error);
      }
    };
    getSubcategories();
  }, []);

  console.log(subCategories);
  return (
    <div>
      {/* --- SUB CAT DROPDOWN FORM --- */}
      <DropdownButton title="Subcategory">
        {subCategories
          ? subCategories?.map((subcategory: any, i: any) => {
              <Dropdown.Item href={i}>{subcategory.name}</Dropdown.Item>;
            })
          : ""}
      </DropdownButton>
      {/* --- ADD SUB CAT --- */}
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group>
          <Form.Control name="inputquery" placeholder="Create a new category" />
          <Button type="submit" className="mb-3">
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
