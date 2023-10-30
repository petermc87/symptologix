import { Category } from "@prisma/client";
import { Dispatch } from "react";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import getSubCategories from "../../../../actions/subCategoryRequests/getSubCats";
import submitSubCat from "../../../../actions/subCategoryRequests/submitSubCat";
import { Subcategory } from "../../../../typings";
import DottedLine from "../DottedLine/DottedLine";
import styles from "./SubCategory.module.scss";
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
    <div className={styles.subcatWrapper}>
      {/* Creating a condition that will check it the cat is General Notes or not. */}
      {/* We dont want to render a subcat dropdown for General Notes. */}

      {category.name !== "General Notes" ? (
        <div>
          {/* --- ADD SUB CAT --- */}

          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className={styles.form}
          >
            <div className={styles.spacer}></div>
            <Form.Label style={{ margin: "0" }} className={styles.label}>
              Create Subcategory
            </Form.Label>
            <Form.Group id={styles.inputControls}>
              <Form.Control name="inputquery" id={styles.input} />
              <Button
                type="submit"
                style={{
                  backgroundColor: "#9391ff",
                  borderColor: "#9391ff",
                  borderRadius: "8px",
                }}
              >
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
            <Button
              style={{
                backgroundColor: "#9391ff",
                borderColor: "#9391ff",
                borderRadius: "15px",
              }}
            >
              Add
            </Button>
          </Form>
        </>
      )}

      {/* --- SUBCAT DROPDOWN --- */}
      {subCategories ? (
        // A wrapper for all the text, input fields, buttons and dropdowns.
        <div className={styles.textWrapper}>
          <span>AND/OR</span>
          {/* Create a wrapper for the select from previous and the button */}
          <div className={styles.selectPreviousWrapper}>
            <div className={styles.label} id={styles.dropLabel}>
              <div className={styles.spacer}></div>
              <div className={styles.previous}>
                Select From Previous for Entry (Below)
              </div>
            </div>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                id="dropdown-custom-1"
                style={{
                  backgroundColor: "#9391ff",
                  borderColor: "#9391ff",
                  zIndex: "1",
                  padding: "0 5px 0 5px",
                }}
              >
                Sub
              </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                {subCategories
                  ? subCategories.map((subCategory: Subcategory, i: number) => {
                      // Add an if statement here to filter only by the sub categories that match the categories.
                      if (category.id === subCategory.categoryId) {
                        return (
                          //NOTE: When menu item is clicked, a record field is created.
                          <Dropdown.Item
                            eventKey={i}
                            key={i}
                            onClick={() => {
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
          </div>
        </div>
      ) : (
        ""
      )}

      {/* TASK: Make sure the line in the last subcat. does not appear. This will allow
      for a solid line separation between this and the current log. 
      NOTE: Make sure to conside General Notes.
      */}
      <div className={styles.lineWrapper}>
        <DottedLine />
      </div>
    </div>
  );
}
