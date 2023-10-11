"use client";
import { Category } from "@prisma/client";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import getCategories from "../../../actions/categoryRequests/getCats";
import submitForm from "../../../actions/categoryRequests/submitCat";
import getSubCategories from "../../../actions/subCategoryRequests/getSubCats";
import { Log, Subcategory, User } from "../../../typings";
import "../global.scss";
import DottedLine from "./DottedLine/DottedLine";
import EntryForm from "./EntryForm/EntryForm";
import styles from "./InputForm.module.scss";
import SubCategoryForm from "./SubCategory/SubCategoryForm";
//TODO: Create a state that will manage which input is being created (i.e. category, subcategory, or entry.)

// Types for the user object.
type InputFormTypes = {
  user: User;
  currentLogInProgress: Log | null;
  setCurrentLogInProgress: any;
  subCategories: Subcategory[];
  setAllSubCategories: any;
};

export default function InputForm({
  user,
  currentLogInProgress,
  setCurrentLogInProgress,
  subCategories,
  setAllSubCategories,
}: InputFormTypes) {
  // Enable transition hook for transitioning phase.
  const [isPending, startTransition] = useTransition();

  // Add another state variable to
  // Categories taken from the database and stored in state.
  // Create a serverside handler for getting cateogories list.
  const [categories, setCategories] = useState<Category[] | null>([]);

  // Selected Subcat for Entry to a log.
  const [selectedSubCat, setSelectedSubCat] = useState<
    Subcategory | null | any
  >();

  // NOTE: For a log thats in progress that hasnt been submitted after a user logs out,
  // create another element in the schema to check if the log has been submitted or not

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Creating a new FormData instance from react and createing the event as
    // a html type
    const formData = new FormData(e.target as HTMLFormElement);
    const inputQuery = formData.get("inputquery")?.toString();

    //Converting the content to types for postgres.
    if (inputQuery) {
      try {
        const returnedCategoies = await submitForm(inputQuery);
        setCategories(returnedCategoies);
        //TODO: Add the backend call for all categories here.
        const results = await getCategories();
        setCategories(results);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Testing revalidation
  // Call retrieve the categories everytime this page is visited.
  useEffect(() => {
    // let isCancelled = false;
    const allCategories = async () => {
      try {
        const results = await getCategories();
        setCategories(results);
      } catch (error) {
        console.error(error);
      }
    };
    allCategories();
  }, []);
  // Consider making one call to the database at the page level.
  useEffect(() => {
    const getSubcategories = async () => {
      try {
        const subCategories = await getSubCategories();

        setAllSubCategories(subCategories);
      } catch (error) {
        console.error(error);
      }
    };
    getSubcategories();
  }, []);

  return (
    <>
      {/* --- CREATE NEW LOG --- */}

      {/* NOTE: We will create a new log that will got to the database. The log will be retrieved and  */}
      {/* stored in state here. */}

      {/* --- ADD CATEGORIES AND MAP--- */}
      <Form
        onSubmit={(e) => startTransition(() => handleSubmit(e))}
        key={321}
        id={styles.createCat}
      >
        {isPending ? <div>Submitting...</div> : ""}

        <Form.Label style={{ margin: "0" }} className={styles.label}>
          Create Category
        </Form.Label>
        <Form.Group className={styles.inputControls}>
          <Form.Control
            name="inputquery"
            placeholder="Create a category"
            className={styles.input}
          />
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
      <div className={styles.textWrapper}>
        <span>OR</span>
        <div className={styles.selectPrevCat}>
          <p>Select From Previous</p>
          <div className={styles.dropdownWrapper}>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle>Categrory</Dropdown.Toggle>
            </Dropdown>
          </div>
        </div>
      </div>
      <DottedLine />
      {categories
        ? categories?.map((category) => {
            return (
              <>
                <div key={category.id} className={styles.catContainer}>
                  <h2 key={category.id + 1} className={styles.catHeading}>
                    {category.name}
                  </h2>
                  {/* --- SUB CATEGORIES --- */}
                  <SubCategoryForm
                    category={category}
                    subCategories={subCategories}
                    setAllSubCategories={setAllSubCategories}
                    setSeletedSubCat={setSelectedSubCat}
                  />
                </div>

                {/* NOTE: Render the entry form here, only if the categoryID in the Subcat
               matches the category id. This means it will show the entry in the Cat field
               it falls under only i.e. no duplicated entry fields. */}
                {selectedSubCat && category.id === selectedSubCat.categoryId ? (
                  //TODO: Create an Entry component.
                  <>
                    {/*---- Is this where the key props is showing a warning? ----*/}
                    {/* EntryForm will take in the Log state object and setLog setter. This will get
                    refreshed in the entry form with a get request for the log. The Subcategory State is also passed in.*/}
                    <EntryForm
                      currentLogInProgress={currentLogInProgress}
                      setCurrentLoginProgress={setCurrentLogInProgress}
                      selectedSubCat={selectedSubCat}
                    />
                  </>
                ) : (
                  ""
                )}
              </>
            );
          })
        : ""}
    </>
  );
}
