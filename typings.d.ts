export type User = {
  name: string;
  username: string;
  email: string;
  password: string;
  logs?: Log[];
};

export type Log = {
  userId: integer;
  entries: Entry[];
  userId: integer;
};

export type Entry = {
  entry: string;
  logId: integer;
  subCategoryId: integer;
};

export type Category = {
  name: string;
  subCategories: SubCategory[];
};

export type Subcategory = {
  name: string;
  categoryId: integer;
  entries?: Entry[];
};

//--- Alternate type for storing an array of a specific object. ---//
// [{ entry, logId, subCategoryId }]: Entry; --> This wouldn;t work because its not tied to
// the entries key within the Subcategory type.
//
//
//--- Using TS out of the box Array type. ---//
// entries: Array<{ entry: string; logId: integer; subCategoryId: integer }>;
