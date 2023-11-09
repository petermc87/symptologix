"use client";
import { Category } from "@prisma/client";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button, Form } from "react-bootstrap";
import getCategories from "../../../actions/categoryRequests/getCats";
import submitForm from "../../../actions/categoryRequests/submitCat";
import getSubCategories from "../../../actions/subCategoryRequests/getSubCats";
import { Subcategory, User } from "../../../typings";
import "../global.scss";
import DottedLine from "./DottedLine/DottedLine";
import EntryForm from "./EntryForm/EntryForm";
import styles from "./InputForm.module.scss";
import SubCategoryForm from "./SubCategory/SubCategoryForm";

// Types for the user object.
type InputFormTypes = {
  user: User;
  subCategories: Subcategory[];
  setAllSubCategories: any;
};

export default function InputForm({
  user,
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

  // Chevron reveal.
  const [reveal, setReveal] = useState<boolean>(false);

  // Current reveal category.
  const [revealCategory, setRevealCategory] = useState<string>("");

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
          <Form.Control name="inputquery" className={styles.input} />
          <Button
            type="submit"
            style={{
              backgroundColor: "#9391ff",
              borderColor: "#9391ff",
              borderRadius: "15px",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
      <DottedLine />
      {categories
        ? categories?.map((category) => {
            return (
              <>
                {/* Create a ternary to reveal the subcat entries and log entries  */}
                {/* form elements/components */}
                <div key={category.id} className={styles.catContainer}>
                  <h2 className={styles.catHeading}>{category.name}</h2>
                  {reveal && revealCategory === category.name ? (
                    <>
                      {/* CHEVRON UP */}
                      <div className={styles.chevron}>
                        {/* SET THE CURRENT CATEGORY NAME. */}
                        <svg
                          onClick={() => {
                            setReveal(false);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-chevron-double-up"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* CHEVRON DOWN */}
                      <div className={styles.chevron}>
                        <svg
                          onClick={() => {
                            setReveal(true);
                            setRevealCategory(category.name);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-chevron-double-down"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </div>
                      <DottedLine />
                    </>
                  )}

                  {/* --- SUB CATEGORIES --- */}
                  {reveal && revealCategory === category.name ? (
                    <>
                      <SubCategoryForm
                        category={category}
                        subCategories={subCategories}
                        setAllSubCategories={setAllSubCategories}
                        setSeletedSubCat={setSelectedSubCat}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>

                {/* NOTE: Render the entry form here, only if the categoryID in the Subcat
               matches the category id. This means it will show the entry in the Cat field
               it falls under only i.e. no duplicated entry fields. */}
                {selectedSubCat &&
                category.id === selectedSubCat.categoryId &&
                reveal &&
                revealCategory === category.name ? (
                  //TODO: Create an Entry component.
                  <>
                    {/*---- Is this where the key props is showing a warning? ----*/}
                    {/* EntryForm will take in the Log state object and setLog setter. This will get
                    refreshed in the entry form with a get request for the log. The Subcategory State is also passed in.*/}
                    <EntryForm selectedSubCat={selectedSubCat} />
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
