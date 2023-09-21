import db from "@/app/modules/db";

export default async function getSubCat(id: string) {
  const subCat = db.subCategory.findUnique({
    where: {
      id: id,
    },
  });

  return subCat;
}
