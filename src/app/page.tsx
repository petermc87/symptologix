"use client";

import { FormEvent, useState, useTransition } from "react";
import { Form } from "react-bootstrap";
import submitForm from "../../actions/submitForm";
import { Post } from "../../typings";
import Button from "./components/Button";
import LogForm from "./components/LogForm";
import styles from "./page.module.css";

export default function Home() {
  // Enable transition hook for transitioning phase.
  const [isPending, startTransition] = useTransition();

  // Store the posts in state
  const [allPosts, setAllPosts] = useState<Post[] | null | void>(null);

  // Creating a post based on an input from the user.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // 'use server'
    e.preventDefault();

    // Creating a new FormData instance from react and createing the event as
    // a html type
    const formData = new FormData(e.target as HTMLFormElement);
    const inputQuery = formData.get("inputquery")?.toString();

    if (inputQuery) {
      try {
        const posts = await submitForm(inputQuery);
        setAllPosts(posts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className={styles.main}>
      <LogForm />
      <Form onSubmit={(e) => startTransition(() => handleSubmit(e))}>
        <Form.Group className="mb-3">
          <Form.Label>Create Input</Form.Label>
          <Form.Control name="inputquery" placeholder="Enter any text" />
        </Form.Group>
        <Button type="submit" className="mb-3">
          Submit
        </Button>
      </Form>
      {isPending ? <div>Submitting...</div> : ""}
      {allPosts
        ? allPosts.map((post) => {
            return <div key={post.id}>{post.content}</div>;
          })
        : ""}
    </main>
  );
}
