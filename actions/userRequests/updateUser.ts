"use server";

// The field currently being added here doesnt require types.
import db from "@/app/modules/db";
import { User } from "../../typings";

export default async function UpdateUser(
  item: string,
  type: string,
  id: string
) {
  let user: User;
  //ISSUE: The backend is printing the user out to the screen
  //even though I dont have a console.log here. Its printing
  // out the individual items in the object even though I deleted
  // it from the code. Very strange!!
  //
  //
  // Trying a regular if statement. Will check if ternary works next.
  if (type === "name") {
    // TEST: See if the item getting passed into prisma
    // console.log(item);
    user = await db.user.update({
      where: {
        id: id,
      },
      data: {
        name: item,
      },
    });

    console.log(user);
  }
}

// --> ORIGINAL TPYINGS FOR ALL THE ITEMS IN USER <--//
// type typesForUser = {
//   id?: string
//   name?: string;
//   username?: string;
//   email?: string;
// };

// export default async function UpdateUser({
//   id,
//   name,
//   username,
//   email,
// }: typesForUser) {
//   console.log(id, name, username, email);
//   await db.user.update({
//     where: {
//       id: id,
//     },

//     data: {
//       name: name,
//       username: username,
//       email: email,
//     },
//   });
// }
