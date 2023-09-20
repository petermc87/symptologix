export type User = {
  id: string | unknown;
  name: string;
  username: string | unknown;
  email: string;
  password: string;
  logs?: Log[];
};

export type Log = {
  userId: string;
  content?: string;
  entries: Entry[];
};

export type Entry = {
  entry: string;
  logId: string;
  subCategoryId: string;
};

export type Category = {
  name: string;
  subCategories: SubCategory[];
};

export type Subcategory = {
  name: string;
  categoryId: string;
  entries?: Entry[];
};

//--- Alternate type for storing an array of a specific object. ---//
// [{ entry, logId, subCategoryId }]: Entry; --> This wouldn;t work because its not tied to
// the entries key within the Subcategory type.
//
//
//--- Using TS out of the box Array type. ---//
// entries: Array<{ entry: string; logId: integer; subCategoryId: integer }>;
