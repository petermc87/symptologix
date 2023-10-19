"use server";
import db from "@/app/modules/db";
import { Log, Subcategory } from "../../typings";
import getLog from "../logRequests/getLog";

type SubmitEntryProps = {
  selectedSubCat: Subcategory | any;
  inputQuery: string;
  currentLog: Log | null | undefined | any;
};
export default async function submitEntry({
  selectedSubCat,
  inputQuery,
  currentLog,
}: SubmitEntryProps) {
  // Check the props that are being passed in are correct.
  let updatedLog;
  // Send entry to the db.
  if (inputQuery && currentLog) {
    await db.entry.create({
      data: {
        logId: currentLog.id,
        subCategoryId: selectedSubCat.id,
        entry: inputQuery,
      },
    });

    // Fetch the log again by id
    updatedLog = await getLog(currentLog.id);
  }

  // include was added to make sure the entries objects were stored.
  return updatedLog;
}

// setCurrentLoginProgress, selectedSubCat, inputQuery
