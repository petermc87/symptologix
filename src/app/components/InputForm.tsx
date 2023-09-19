"use client";
import { FormEvent, useTransition } from "react";
import { Form } from "react-bootstrap";
import submitForm from "../../../actions/submitForm";
import Button from "./Button";
//TODO: Create a state that will manage shich input is being created (i.e. category, subcategory, or entry.)

export default function InputForm() {
  // Enable transition hook for transitioning phase.
  const [isPending, startTransition] = useTransition();

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
        submitForm(inputQuery);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    // <Form onSubmit={handleSubmit}>
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
  );
}
