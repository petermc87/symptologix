"use server";

import db from "@/app/modules/db";

// Refactor for revalidation.
export default async function getCategories() {
  const categories = db.category.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      subCategories: true,
    },
  });

  return categories;
}
