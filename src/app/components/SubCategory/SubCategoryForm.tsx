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
  setSeletedSubCat: Dispatch<any>;
};

export default function SubCategoryForm({
  category,
  subCategories,
  setAllSubCategories,
  setSeletedSubCat,
}: SubCategoryProps) {
  let categoryId: string;

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
    <>
      {/* Creating a condition that will check it the cat is General Notes or not. */}
      {/* We dont want to render a subcat dropdown for General Notes. */}

      {/* --- SUBCAT DROPDOWN --- */}
      {category.name !== "General Notes" ? (
        <div>
          {subCategories ? (
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle id="dropdown-custom-1">Sub</Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                {subCategories
                  ? subCategories.map((subCategory: any, i: any) => {
                      // Add an if statement here to filter only by the sub categories that match the categories.
                      if (category.id === subCategory.categoryId) {
                        return (
                          //NOTE: When menu item is clicked, a record field is created.
                          <Dropdown.Item
                            eventKey={i}
                            key={i}
                            onClick={() => {
                              console.log("click");
                              setSeletedSubCat(subCategory);
                            }}
                          >
                            {subCategory.name}
                          </Dropdown.Item>
                        );
                      }
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
              <Form.Control
                name="inputquery"
                placeholder="Create a new category"
              />
              <Button type="submit" className="mb-3">
                Create
              </Button>
            </Form.Group>
          </Form>
        </div>
      ) : (
        <>
          {/* NOTE: Placeholder for General Notes Entry field. Add this to the 'log' component later.*/}
          <Form>
            <Form.Control
              as="textarea"
              placeholder="Enter your record here.."
            />
            <Button>Add</Button>
          </Form>
        </>
      )}
    </>
  );
}
