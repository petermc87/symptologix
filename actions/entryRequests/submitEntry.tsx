"use server";
import db from "@/app/modules/db";
import { Log, Subcategory } from "../../typings";
import getLog from "../logRequests/getLog";

type SubmitEntryProps = {
  selectedSubCat: Subcategory;
  inputQuery: string;
  currentLogInProgress: Log | null;
};
export default async function submitEntry({
  selectedSubCat,
  inputQuery,
  currentLogInProgress,
}: SubmitEntryProps) {
  // Check the props that are being passed in are correct.
  let updatedLog;
  // Send entry to the db.
  if (inputQuery && currentLogInProgress) {
    await db.entry.create({
      data: {
        logId: currentLogInProgress.id,
        subCategoryId: selectedSubCat.id,
        entry: inputQuery,
      },
    });

    // Fetch the log again by id
    updatedLog = await getLog(currentLogInProgress.id);
  }

  // include was added to make sure the entries objects were stored.
  return updatedLog;
}

// setCurrentLoginProgress, selectedSubCat, inputQuery
