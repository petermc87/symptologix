"use server";
import db from "@/app/modules/db";

export default async function GetEntries() {
  const entries = await db.entry.findMany();
  return entries;
}
