import { Category } from "@prisma/client";
import { Dispatch } from "react";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import getSubCategories from "../../../../actions/subCategoryRequests/getSubCats";
import submitSubCat from "../../../../actions/subCategoryRequests/submitSubCat";
import { Subcategory } from "../../../../typings";

// Desctructure props passed down.
//TODO: Update Restructure for state subCategories and setter SetAllSubcategories
type SubCategoryProps = {
  category: Category;
  subCategories: Subcategory[];
  setAllSubCategories: Dispatch<any>;
};

export default function SubCategoryForm({
  category,
  subCategories,
  setAllSubCategories,
}: SubCategoryProps) {
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
        const subCategories = await getSubCategories();
        setAllSubCategories(subCategories);
      } catch (error) {
        console.error(error);
      }
    }
  };

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
