"use client";
import { Category } from "@prisma/client";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Form } from "react-bootstrap";
import getCategories from "../../../actions/categoryRequests/getCats";
import submitForm from "../../../actions/categoryRequests/submitCat";
import getSubCategories from "../../../actions/subCategoryRequests/getSubCats";
import { Subcategory } from "../../../typings";
import Button from "./Button";
import SubCategoryForm from "./SubCategory/SubCategoryForm";
//TODO: Create a state that will manage shich input is being created (i.e. category, subcategory, or entry.)

export default function InputForm() {
  // Enable transition hook for transitioning phase.
  const [isPending, startTransition] = useTransition();

  // Categories taken from the database and stored in state.
  // TODO: Create a serverside handler for getting cateogories list.
  const [categories, setCategories] = useState<Category[] | null>([]);

  // Create state for storing all subCategories that were previously created
  // for that category.
  const [subCategories, setAllSubCategories] = useState<
    Subcategory | null | any
  >([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // 'use server'
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
  // console.log(categories);

  // Consider making one call to the database at the page level.
  // This will mean that it will only be called once
  // and refreshed once another subcategory is created.
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
      {/* --- ADD CATEGORIES AND MAP--- */}
      <Form onSubmit={(e) => startTransition(() => handleSubmit(e))}>
        {isPending ? <div>Submitting...</div> : ""}
        <Form.Group className="mb-3">
          <Form.Label>Create Category</Form.Label>
          <Form.Control name="inputquery" placeholder="Enter any text" />
        </Form.Group>
        <Button type="submit" className="mb-3">
          Submit
        </Button>
      </Form>
      {categories
        ? categories?.map((category) => {
            return (
              <div key={category.id}>
                <h2>{category.name}</h2>

                {/* --- SUB CATEGORIES --- */}
                <SubCategoryForm
                  category={category}
                  subCategories={subCategories}
                  setAllSubCategories={setAllSubCategories}
                />
              </div>
            );
          })
        : ""}
    </>
  );
}
