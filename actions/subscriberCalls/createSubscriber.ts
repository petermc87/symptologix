"use server";

import { Novu } from "@novu/node";

export default async function CreateSubscriber(
  email: string,
  name: string,
  id: string
) {
  console.log(email, name, id);
  // Use the userID for this user as the subcriber id.
  // Get the session data for the user
  const novu = new Novu(`${process.env.NOVU_API}`);
  await novu.subscribers.identify(id, {
    email: email,
    firstName: name,
    lastName: name,
    phone: "+1234567890",
  });
}
