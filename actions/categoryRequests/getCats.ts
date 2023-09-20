"use server";

import db from "@/app/modules/db";

export default async function getCategories() {
  const categories = db.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return categories;
}
