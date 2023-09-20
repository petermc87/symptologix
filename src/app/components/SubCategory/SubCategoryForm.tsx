import { Category, SubCategory } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
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

  // Consider making one call to the database at the page level. This will mean that it will only be called once
  // and refreshed once another subcategory is created.
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

  console.log(subCategories[1].name);
  return (
    <div>
      {subCategories ? (
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle id="dropdown-custom-1">Sub</Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            {subCategories
              ? subCategories.map((category: any, i: any) => {
                  return (
                    <Dropdown.Item eventKey={i}>{category.name}</Dropdown.Item>
                  );
                })
              : ""}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        ""
      )}
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
