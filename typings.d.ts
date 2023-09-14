export type User = {
  name: sstring | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  logs: Log[];
};

export type Log = {
  userId: integer;
  entries: Entry[];
  userId: integer;
};

export type Entry = {
  entry: string | undefined;
  logId: integer;
  subCategoryId: integer;
};

export type Category = {
  name: string;
  [key: string, key: integer]: Subcategory;
};

export type Subcategory = {
  name: string | undefined;
  categoryId: integer;
  entries: Entry[];
};
