"use server";
import { Novu } from "@novu/node";

export default async function UpdateSubscriber(
  name: string,
  email: string,
  id: string
) {
  const novu = new Novu(`${process.env.NOVU_API}`);

  await novu.subscribers.update(id, {
    email: email,
    firstName: name,
    lastName: name,
    phone: "+1234567890",
  });
}
